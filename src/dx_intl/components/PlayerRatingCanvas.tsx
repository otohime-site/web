import Konva from "konva"
import {
  type ComponentProps,
  createContext,
  memo,
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import {
  Group,
  Image as KonvaImage,
  Layer,
  Rect,
  Stage,
  Text,
} from "react-konva"
import { encode } from "uqr"
import logoUrl from "../../logo/favicon.svg"
import apFlagUrl from "../images/flags/ap.svg"
import appFlagUrl from "../images/flags/app.svg"
import blankFlagUrl from "../images/flags/blank.svg"
import fcFlagUrl from "../images/flags/fc.svg"
import fcpFlagUrl from "../images/flags/fcp.svg"
import fsFlagUrl from "../images/flags/fs.svg"
import fsdFlagUrl from "../images/flags/fsd.svg"
import fsdpFlagUrl from "../images/flags/fsdp.svg"
import fspFlagUrl from "../images/flags/fsp.svg"
import sFlagUrl from "../images/flags/s.svg"
import dxVariantUrl from "../images/variants/dx.svg"
import stdVariantUrl from "../images/variants/std.svg"
import { getCoverUrl, type ScoreTableEntry } from "../models/aggregation"
import { RATING_NEW_COUNT, RATING_OLD_COUNT } from "../models/constants"
import { classRankImages, courseRankImages } from "./Ranks"
import { getRatingImage } from "./Rating"

export type Trophy = "normal" | "bronze" | "silver" | "gold" | "rainbow"

export interface RatingImageInfo {
  cardName: string
  title: string
  trophy: Trophy
  // The record's own rating, as the game reports it; the listed entries may
  // not sum to it during data updates.
  rating: number
  isPrivate: boolean
  courseRank?: number | null
  classRank?: number | null
  updatedDate?: string
  versionName?: string
}

interface PlayerRatingCanvasProps {
  scoreTable: ScoreTableEntry[]
  info: RatingImageInfo
  scoreUrl?: string
  showTitle: boolean
  showRanks: boolean
  showUrl: boolean
  onRender: (blob: Blob) => void
}

// The stage is already at export resolution. Applying the device pixel ratio
// would need a 6300x11250 canvas on a 3x iPhone, beyond iOS Safari's budget.
Konva.pixelRatio = 1

// -----------------------------------------------------------------------------
// Geometry
// -----------------------------------------------------------------------------

const WIDTH = 2100
const HEIGHT = 3750
const HEADER_HEIGHT = 500
const FOOTER_HEIGHT = 260
const PADDING = 64
const COLUMNS = 5
const TILE_GAP = 20
const SECTION_TITLE_HEIGHT = 72
const SECTION_GAP = 32
// Fixed --otohime-0, so exports stay light even in dark mode.
const BG_COLOR = "oklch(98.2% 0.012 340)"

// Blocks fill a 5-column grid and are just tall enough for both sections to fit
// between header and footer, so they are slightly landscape.
const BLOCK_W = Math.floor(
  (WIDTH - PADDING * 2 - TILE_GAP * (COLUMNS - 1)) / COLUMNS,
)
const TOTAL_ROWS =
  Math.ceil(RATING_NEW_COUNT / COLUMNS) + Math.ceil(RATING_OLD_COUNT / COLUMNS)
const BLOCK_H = Math.floor(
  (HEIGHT -
    HEADER_HEIGHT -
    FOOTER_HEIGHT -
    2 * SECTION_TITLE_HEIGHT -
    SECTION_GAP -
    (TOTAL_ROWS - 2) * TILE_GAP) /
    TOTAL_ROWS,
)
const BLOCK_RADIUS = 20

// The header mirrors the browser record (14px root em) at 3x; the dialog
// previews at 25%, so it appears at 75% of the browser size.
const HEADER_EM = 14 * 3
const FOOTER_EM = 14 * 4

// -----------------------------------------------------------------------------
// Image loading
// -----------------------------------------------------------------------------

// Shared by every useImage in the scene, so the root can export once all images
// have settled. The cache lets remounts (e.g. toggling ranks) reuse decoded
// images; null marks a failed load. It is owned by the stage so the ~30MB of
// covers is released when the dialog closes.
class ImageLoadTracker {
  readonly cache = new Map<string, HTMLImageElement | null>()
  pending = 0
  private readonly onChange: () => void
  constructor(onChange: () => void) {
    this.onChange = onChange
  }
  add() {
    this.pending++
  }
  // image is undefined for a request abandoned mid-flight: it releases its
  // slot without caching.
  settle(url: string, image: HTMLImageElement | null | undefined) {
    if (image !== undefined) this.cache.set(url, image)
    this.pending--
    this.onChange()
  }
}
const ImageLoadContext = createContext<ImageLoadTracker | null>(null)

const useImage = (url?: string): HTMLImageElement | undefined => {
  const tracker = use(ImageLoadContext)
  useEffect(() => {
    if (tracker == null || url == null || tracker.cache.has(url)) return
    const img = new window.Image()
    tracker.add()
    // Failures must settle too, or the export would wait forever.
    let settled = false
    const settle = (image: HTMLImageElement | null | undefined) => {
      if (settled) return
      settled = true
      tracker.settle(url, image)
    }
    const onLoad = () => settle(img)
    const onError = () => settle(null)
    img.addEventListener("load", onLoad)
    img.addEventListener("error", onError)
    // Request CORS so the canvas stays exportable. WebKit needs crossOrigin
    // set before src, or it may issue a non-CORS request.
    img.crossOrigin = "anonymous"
    img.src = url
    return () => {
      img.removeEventListener("load", onLoad)
      img.removeEventListener("error", onError)
      settle(undefined)
    }
  }, [url, tracker])
  // Read during render so settled images draw without an effect round-trip.
  return url == null ? undefined : (tracker?.cache.get(url) ?? undefined)
}

const CanvasImage = ({
  src,
  ...props
}: { src?: string } & Omit<ComponentProps<typeof KonvaImage>, "image">) => {
  const image = useImage(src)
  return image ? <KonvaImage image={image} {...props} /> : null
}

// Draws at a fixed height, keeping the image's aspect ratio.
const RankImage = ({
  src,
  x,
  y,
  height,
}: {
  src?: string
  x: number
  y: number
  height: number
}) => {
  const image = useImage(src)
  if (!image) return null
  const width = (image.naturalWidth / image.naturalHeight) * height
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />
}

// The score table already loaded covers as plain <img>; a distinct URL keeps
// Safari from reusing that non-CORS response.
const getCanvasCoverUrl = (songId: string) => `${getCoverUrl(songId)}?cors=1`

// -----------------------------------------------------------------------------
// Header
// -----------------------------------------------------------------------------

// Sizes follow Rating.module.css, Record.module.css and the browser layout.
const PLATE_WIDTH = 7.56 * HEADER_EM
const PLATE_HEIGHT = 2.2 * HEADER_EM
const CARD_PLATE_FONT_SIZE = HEADER_EM * 1.2
const CARD_PLATE_WIDTH = Math.round(CARD_PLATE_FONT_SIZE * 9)
const CARD_PLATE_BORDER = CARD_PLATE_FONT_SIZE * 0.1
const CARD_PLATE_PADDING = HEADER_EM * 0.25
const CARD_PLATE_HEIGHT = Math.round(
  CARD_PLATE_FONT_SIZE * 1.5 + CARD_PLATE_BORDER * 2,
)
const RECORD_WIDTH = HEADER_EM * 25
const TITLE_BAR_MAX_WIDTH = HEADER_EM * 20
// 1.5 line height plus 0.1em borders.
const TITLE_BAR_HEIGHT = Math.round(HEADER_EM * 1.5 + HEADER_EM * 0.2)
const RANK_BADGE_HEIGHT = HEADER_EM * 2
const RANK_GAP = HEADER_EM * 0.5
const RANK_GROUP_GAP = HEADER_EM * 0.25
const CLASS_RANK_WIDTH = RANK_BADGE_HEIGHT * (126 / 70)
const COURSE_RANK_WIDTH = RANK_BADGE_HEIGHT * (175 / 70)
const HEADER_LINE_GAP = HEADER_EM * 0.25
const QR_SIZE = 240
const QR_LOGO_SIZE = 60
const QR_LOGO_PAD = 4
const CORNER_URL_HEIGHT = 56

const RatingPlate = ({
  rating,
  x,
  y,
}: {
  rating: number
  x: number
  y: number
}) => (
  <Group x={x} y={y}>
    <CanvasImage
      src={getRatingImage(rating, false)}
      width={PLATE_WIDTH}
      height={PLATE_HEIGHT}
    />
    <Text
      y={0.5 * HEADER_EM}
      width={PLATE_WIDTH - 0.4 * HEADER_EM}
      align="right"
      text={`${rating}`}
      fontSize={HEADER_EM}
      fontStyle="900"
      fontFamily="M PLUS 2"
      letterSpacing={0.125 * HEADER_EM}
      fill="#e5c100"
      stroke="#393939"
      strokeWidth={0.03 * HEADER_EM}
      fillAfterStrokeEnabled={true}
    />
  </Group>
)

// Two-stop vertical gradients from Record.module.css; rainbow approximates its
// layered CSS gradient with a horizontal spectrum.
const splitStops = (top: string, bottom: string) => [
  0,
  top,
  0.6,
  top,
  0.6,
  bottom,
  1,
  bottom,
]
const trophyStyles: Record<
  Trophy,
  { stops: (number | string)[]; border: string; shadow: string }
> = {
  normal: {
    stops: splitStops("#f9f9f9", "#dadada"),
    border: "#b8b8b8",
    shadow: "#666666",
  },
  bronze: {
    stops: splitStops("#fb9966", "#dd7733"),
    border: "#b8b8b8",
    shadow: "#803300",
  },
  silver: {
    stops: splitStops("#e3e3f0", "#96b6e3"),
    border: "#b6d3f3",
    shadow: "#3333aa",
  },
  gold: {
    stops: splitStops("#ffdf4b", "#fabf00"),
    border: "#ffe366",
    shadow: "#bb3e00",
  },
  rainbow: {
    stops: [
      0,
      "#fdc9aa",
      0.16,
      "#fdfd9c",
      0.44,
      "#ddfda7",
      0.52,
      "#ddfdfd",
      0.74,
      "#fdfdfd",
      0.8,
      "#fde4fd",
      1,
      "#dff6fd",
    ],
    border: "#ffffff",
    shadow: "#888888",
  },
}

const TitlePlate = ({
  title,
  trophy,
  x,
  y,
  width,
}: {
  title: string
  trophy: Trophy
  x: number
  y: number
  width: number
}) => {
  const style = trophyStyles[trophy]
  const height = TITLE_BAR_HEIGHT
  const radius = HEADER_EM * 0.4
  return (
    <Group x={x} y={y}>
      <Rect
        y={HEADER_EM * 0.2}
        width={width}
        height={height}
        cornerRadius={radius}
        fill={style.shadow}
        opacity={0.72}
      />
      <Rect
        width={width}
        height={height}
        cornerRadius={radius}
        stroke={style.border}
        strokeWidth={HEADER_EM * 0.1}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={
          trophy === "rainbow" ? { x: width, y: 0 } : { x: 0, y: height }
        }
        fillLinearGradientColorStops={style.stops}
      />
      <Text
        width={width}
        height={height}
        align="center"
        verticalAlign="middle"
        text={title}
        fontSize={HEADER_EM}
        fontStyle="700"
        fontFamily="M PLUS Rounded 1c"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={HEADER_EM * 0.1}
        fillAfterStrokeEnabled={true}
        shadowColor="#666666"
        shadowOffset={{ x: HEADER_EM * 0.06, y: HEADER_EM * 0.06 }}
        wrap="none"
        ellipsis={true}
      />
    </Group>
  )
}

// High error correction keeps the code scannable under the center logo.
const QrCode = ({ url, x, y }: { url: string; x: number; y: number }) => {
  const matrix = useMemo(() => encode(url, { border: 2, ecc: "H" }).data, [url])
  const module = QR_SIZE / matrix.length
  const badge = QR_LOGO_SIZE + QR_LOGO_PAD * 2
  const badgeXY = (QR_SIZE - badge) / 2
  return (
    <Group x={x} y={y}>
      <Rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" cornerRadius={8} />
      {/* eslint-disable @eslint-react/no-array-index-key */}
      {matrix.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <Rect
              key={`${r}-${c}`}
              x={c * module}
              y={r * module}
              width={module}
              height={module}
              fill="#000000"
            />
          ) : null,
        ),
      )}
      {/* eslint-enable @eslint-react/no-array-index-key */}
      <Rect
        x={badgeXY}
        y={badgeXY}
        width={badge}
        height={badge}
        fill="#ffffff"
        cornerRadius={12}
      />
      <CanvasImage
        src={logoUrl}
        x={badgeXY + QR_LOGO_PAD}
        y={badgeXY + QR_LOGO_PAD}
        width={QR_LOGO_SIZE}
        height={QR_LOGO_SIZE}
      />
    </Group>
  )
}

const formatMetaText = ({ updatedDate, versionName }: RatingImageInfo) =>
  [
    updatedDate != null ? `Updated at ${updatedDate}` : null,
    versionName != null ? `using ${versionName} data` : null,
  ]
    .filter(Boolean)
    .join("; ")

// Three left-aligned lines (rating, card name, title/meta), vertically
// centered, with the score URL and QR code in the top-right corner.
const CanvasHeader = ({
  info,
  scoreUrl,
  metaText,
  hasRanks,
  hasTitle,
}: {
  info: RatingImageInfo
  scoreUrl?: string
  metaText: string
  hasRanks: boolean
  hasTitle: boolean
}) => {
  const { cardName, title, trophy, rating, courseRank, classRank } = info
  // The title bar shrinks to leave room for the rank badges, as in the browser.
  const titleBarWidth = hasRanks
    ? Math.min(
        TITLE_BAR_MAX_WIDTH,
        RECORD_WIDTH -
          RANK_GAP -
          CLASS_RANK_WIDTH -
          RANK_GROUP_GAP -
          COURSE_RANK_WIDTH,
      )
    : TITLE_BAR_MAX_WIDTH
  const hasLine3 = hasTitle || metaText !== ""
  const linesHeight =
    PLATE_HEIGHT +
    HEADER_LINE_GAP +
    CARD_PLATE_HEIGHT +
    (hasLine3 ? HEADER_LINE_GAP + TITLE_BAR_HEIGHT : 0)
  const line1Y = Math.round((HEADER_HEIGHT - linesHeight) / 2)
  const line2Y = line1Y + PLATE_HEIGHT + HEADER_LINE_GAP
  const line3Y = line2Y + CARD_PLATE_HEIGHT + HEADER_LINE_GAP

  const line1Right =
    PADDING + PLATE_WIDTH + RANK_GAP + (hasRanks ? CLASS_RANK_WIDTH : 0)
  const urlX = Math.max(WIDTH * 0.4, line1Right + RANK_GAP)
  const urlWidth = WIDTH - PADDING - urlX

  return (
    <>
      <RatingPlate rating={rating} x={PADDING} y={line1Y} />
      {hasRanks && classRank != null ? (
        <RankImage
          src={classRankImages[classRank]}
          x={PADDING + PLATE_WIDTH + RANK_GAP}
          y={line1Y + (PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
          height={RANK_BADGE_HEIGHT}
        />
      ) : null}

      <Group x={PADDING} y={line2Y}>
        <Rect
          width={CARD_PLATE_WIDTH}
          height={CARD_PLATE_HEIGHT}
          cornerRadius={CARD_PLATE_FONT_SIZE * 0.2}
          fill="#ffffff"
          stroke="#cccccc"
          strokeWidth={CARD_PLATE_BORDER}
        />
        <Text
          x={CARD_PLATE_PADDING + CARD_PLATE_BORDER}
          width={
            CARD_PLATE_WIDTH - (CARD_PLATE_PADDING + CARD_PLATE_BORDER) * 2
          }
          height={CARD_PLATE_HEIGHT}
          verticalAlign="middle"
          text={cardName}
          fontSize={CARD_PLATE_FONT_SIZE}
          fontStyle="700"
          fontFamily="M PLUS Rounded 1c"
          fill="#000000"
          wrap="none"
          ellipsis={true}
        />
      </Group>
      {hasRanks && courseRank != null ? (
        <RankImage
          src={courseRankImages[courseRank]}
          x={PADDING + CARD_PLATE_WIDTH + RANK_GAP}
          y={line2Y + (CARD_PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
          height={RANK_BADGE_HEIGHT}
        />
      ) : null}

      {hasTitle ? (
        <TitlePlate
          title={title}
          trophy={trophy}
          x={PADDING}
          y={line3Y}
          width={titleBarWidth}
        />
      ) : null}
      {metaText !== "" ? (
        <Text
          x={PADDING + (hasTitle ? titleBarWidth + RANK_GAP : 0)}
          y={line3Y}
          height={TITLE_BAR_HEIGHT}
          verticalAlign="middle"
          text={metaText}
          fontSize={HEADER_EM}
          fontStyle="600"
          fontFamily="M PLUS 2"
          fill="#8a7698"
        />
      ) : null}

      {scoreUrl != null ? (
        <>
          <Text
            x={urlX}
            y={line1Y}
            width={urlWidth}
            height={CORNER_URL_HEIGHT}
            align="right"
            verticalAlign="middle"
            text={scoreUrl}
            // Shrink long URLs to fit on one line.
            fontSize={Math.min(
              44,
              urlWidth / Math.max(1, scoreUrl.length * 0.62),
            )}
            fontFamily="M PLUS 2"
            fill="#c8c8c8"
            wrap="none"
          />
          <QrCode
            url={scoreUrl}
            x={WIDTH - PADDING - QR_SIZE}
            y={line1Y + CORNER_URL_HEIGHT + 12}
          />
        </>
      ) : null}
    </>
  )
}

// -----------------------------------------------------------------------------
// Chart blocks
// -----------------------------------------------------------------------------

// Konva can't read CSS variables.
const difficultyColors = [
  "#22aa5d", // Basic
  "#f0b400", // Advanced
  "#ff5060", // Expert
  "#9b5de5", // Master
  "#c84bff", // Re:Master
]
const REMASTER_DIFFICULTY = 4

// Indexed by combo_flag / sync_flag; 0 is "no flag", drawn blank to keep the
// badge slots aligned.
const comboFlagImages = [
  blankFlagUrl,
  fcFlagUrl,
  fcpFlagUrl,
  apFlagUrl,
  appFlagUrl,
]
const syncFlagImages = [
  blankFlagUrl,
  sFlagUrl,
  fsFlagUrl,
  fspFlagUrl,
  fsdFlagUrl,
  fsdpFlagUrl,
]

const TITLE_BAND_H = Math.round(BLOCK_H * 0.4)
const SCORE_BAND_H = Math.round(BLOCK_H * 0.44)
const VARIANT_H = Math.round(Math.round(BLOCK_H * 0.07) * 2.3)
const FLAG_SIZE = Math.round(BLOCK_H * 0.13)
const FLAG_GAP = 4
const BLOCK_PAD = Math.round(BLOCK_W * 0.03)
const SCORE_LINE_HEIGHT = Math.round(BLOCK_H * 0.16)
const SCORE_LINE_Y = BLOCK_H - BLOCK_PAD - SCORE_LINE_HEIGHT
const TITLE_LINE_Y = SCORE_LINE_Y - FLAG_SIZE - Math.round(BLOCK_H * 0.02)
const SCORE_ITEM_GAP = 10
const RATING_VALUE_WIDTH = Math.round(BLOCK_W * 0.24)
const RATING_VALUE_X = BLOCK_W - BLOCK_PAD - RATING_VALUE_WIDTH
const FLAGS_X = RATING_VALUE_X - SCORE_ITEM_GAP - FLAG_SIZE * 2 - FLAG_GAP
const FLAGS_Y = SCORE_LINE_Y + (SCORE_LINE_HEIGHT - FLAG_SIZE) / 2

// Center-crop the square cover to the block's aspect ratio.
const coverCrop = (img: HTMLImageElement) => {
  const side = Math.min(img.naturalWidth, img.naturalHeight)
  const cropH = (side * BLOCK_H) / BLOCK_W
  if (cropH <= side) {
    return { x: 0, y: (side - cropH) / 2, width: side, height: cropH }
  }
  const cropW = (side * BLOCK_W) / BLOCK_H
  return { x: (side - cropW) / 2, y: 0, width: cropW, height: side }
}

// A cover-backed block: variant and level over a dark top scrim; title, score,
// flags and rating over a difficulty-tinted bottom scrim.
const ChartBlock = ({
  entry,
  x,
  y,
}: {
  entry: ScoreTableEntry
  x: number
  y: number
}) => {
  const cover = useImage(getCanvasCoverUrl(entry.song_id))
  const accent = difficultyColors[entry.difficulty] ?? "#888888"
  // Re:Master shares Master's purple, so it gets a lighter scrim and a white
  // frame to tell them apart.
  const isReMaster = entry.difficulty === REMASTER_DIFFICULTY
  const level = entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level
  return (
    <Group x={x} y={y}>
      {cover ? (
        <KonvaImage
          image={cover}
          width={BLOCK_W}
          height={BLOCK_H}
          crop={coverCrop(cover)}
          cornerRadius={BLOCK_RADIUS}
        />
      ) : (
        <Rect
          width={BLOCK_W}
          height={BLOCK_H}
          cornerRadius={BLOCK_RADIUS}
          fill="#2c2f36"
        />
      )}
      {/* Lighten the cover so the scrims and white text stand out. */}
      <Rect
        width={BLOCK_W}
        height={BLOCK_H}
        cornerRadius={BLOCK_RADIUS}
        fill="#ffffff"
        opacity={0.18}
      />
      <Rect
        width={BLOCK_W}
        height={TITLE_BAND_H}
        cornerRadius={[BLOCK_RADIUS, BLOCK_RADIUS, 0, 0]}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: TITLE_BAND_H }}
        fillLinearGradientColorStops={[0, "#000000b8", 1, "#00000000"]}
      />
      <Rect
        y={BLOCK_H - SCORE_BAND_H}
        width={BLOCK_W}
        height={SCORE_BAND_H}
        cornerRadius={[0, 0, BLOCK_RADIUS, BLOCK_RADIUS]}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: SCORE_BAND_H }}
        fillLinearGradientColorStops={[
          0,
          "#00000000",
          1,
          `${isReMaster ? "#e6a8ff" : accent}f0`,
        ]}
      />
      <Rect
        width={BLOCK_W}
        height={BLOCK_H}
        cornerRadius={BLOCK_RADIUS}
        stroke={isReMaster ? "#ffffff" : accent}
        strokeWidth={5}
      />

      <CanvasImage
        src={entry.deluxe ? dxVariantUrl : stdVariantUrl}
        x={BLOCK_PAD}
        y={BLOCK_PAD}
        width={VARIANT_H * 2}
        height={VARIANT_H}
      />
      <Text
        y={BLOCK_PAD}
        width={BLOCK_W - BLOCK_PAD}
        align="right"
        text={`${level}`}
        fontSize={Math.round(BLOCK_H * 0.15)}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        stroke="#00000080"
        strokeWidth={Math.round(BLOCK_H * 0.008)}
        fillAfterStrokeEnabled={true}
      />

      <Text
        x={BLOCK_PAD}
        y={TITLE_LINE_Y}
        width={BLOCK_W - BLOCK_PAD * 2}
        height={FLAG_SIZE}
        verticalAlign="middle"
        text={entry.title}
        fontSize={Math.round(BLOCK_H * 0.13)}
        fontStyle="700"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        wrap="none"
        ellipsis={true}
      />
      <Text
        x={BLOCK_PAD}
        y={SCORE_LINE_Y}
        width={FLAGS_X - BLOCK_PAD - SCORE_ITEM_GAP}
        height={SCORE_LINE_HEIGHT}
        verticalAlign="middle"
        text={entry.score ? `${entry.score.toFixed(4)}%` : "―"}
        fontSize={Math.round(BLOCK_H * 0.1)}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        wrap="none"
        ellipsis={true}
      />
      <CanvasImage
        src={comboFlagImages[entry.combo_flag] ?? blankFlagUrl}
        x={FLAGS_X}
        y={FLAGS_Y}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
      />
      <CanvasImage
        src={syncFlagImages[entry.sync_flag] ?? blankFlagUrl}
        x={FLAGS_X + FLAG_SIZE + FLAG_GAP}
        y={FLAGS_Y}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
      />
      <Text
        x={RATING_VALUE_X}
        y={SCORE_LINE_Y}
        width={RATING_VALUE_WIDTH}
        height={SCORE_LINE_HEIGHT}
        align="right"
        verticalAlign="middle"
        text={`${entry.rating}`}
        fontSize={Math.round(BLOCK_H * 0.14)}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        stroke="#00000070"
        strokeWidth={Math.round(BLOCK_H * 0.009)}
        fillAfterStrokeEnabled={true}
        wrap="none"
      />
    </Group>
  )
}

const sectionHeight = (count: number) =>
  SECTION_TITLE_HEIGHT +
  Math.ceil(count / COLUMNS) * (BLOCK_H + TILE_GAP) -
  TILE_GAP

const Section = ({
  title,
  entries,
  y,
}: {
  title: string
  entries: ScoreTableEntry[]
  y: number
}) => {
  const total = entries.reduce((sum, e) => sum + e.rating, 0)
  const average = entries.length > 0 ? total / entries.length : 0
  return (
    <Group y={y}>
      <Rect
        x={PADDING}
        y={20}
        width={12}
        height={36}
        cornerRadius={6}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 12, y: 36 }}
        fillLinearGradientColorStops={[0, "#5f4181", 1, "#209edb"]}
      />
      <Text
        x={PADDING + 32}
        y={12}
        text={`${title} ${entries.length} - ${total} (Avg ${average.toFixed(1)})`}
        fontSize={52}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#5f4181"
      />
      <Rect
        x={PADDING + 820}
        y={37}
        width={WIDTH - PADDING * 2 - 850}
        height={3}
        cornerRadius={2}
        fill="#d9c8e5"
      />
      <Rect
        x={WIDTH - PADDING - 16}
        y={29}
        width={16}
        height={16}
        rotation={45}
        fill="#209edb"
      />
      {entries.map((entry, i) => (
        <ChartBlock
          key={entry.hash}
          entry={entry}
          x={PADDING + (i % COLUMNS) * (BLOCK_W + TILE_GAP)}
          y={
            SECTION_TITLE_HEIGHT +
            Math.floor(i / COLUMNS) * (BLOCK_H + TILE_GAP)
          }
        />
      ))}
    </Group>
  )
}

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

const FOOTER_LOGO_SIZE = FOOTER_EM * 1.7
const FOOTER_BRAND_GAP = FOOTER_EM * 0.2
const FOOTER_WORD_WIDTH = 300

const CanvasFooter = () => (
  <>
    <Rect
      x={PADDING}
      y={HEIGHT - FOOTER_HEIGHT}
      width={WIDTH - PADDING * 2}
      height={2}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: WIDTH - PADDING * 2, y: 0 }}
      fillLinearGradientColorStops={[
        0,
        "#d9c8e500",
        0.5,
        "#bca5cc",
        1,
        "#d9c8e500",
      ]}
    />
    <Group
      x={(WIDTH - FOOTER_LOGO_SIZE - FOOTER_BRAND_GAP - FOOTER_WORD_WIDTH) / 2}
      y={HEIGHT - FOOTER_HEIGHT}
    >
      <CanvasImage
        src={logoUrl}
        y={(FOOTER_HEIGHT - FOOTER_LOGO_SIZE) / 2}
        width={FOOTER_LOGO_SIZE}
        height={FOOTER_LOGO_SIZE}
      />
      <Text
        x={FOOTER_LOGO_SIZE + FOOTER_BRAND_GAP}
        width={FOOTER_WORD_WIDTH}
        height={FOOTER_HEIGHT}
        verticalAlign="middle"
        text="Otohime"
        fontSize={FOOTER_EM * 1.25}
        fontFamily="McLaren"
        fill="#5f4181"
      />
    </Group>
  </>
)

// -----------------------------------------------------------------------------
// Root
// -----------------------------------------------------------------------------

const selectRatingEntries = (scoreTable: ScoreTableEntry[]) => {
  const used = scoreTable.filter((entry) => entry.rating_used)
  const newEntries = used
    .filter((entry) => entry.rating_latest)
    .sort((a, b) => (a.new_rank ?? Infinity) - (b.new_rank ?? Infinity))
    .slice(0, RATING_NEW_COUNT)
  const oldEntries = used
    .filter((entry) => !entry.rating_latest)
    .sort((a, b) => (a.old_rank ?? Infinity) - (b.old_rank ?? Infinity))
    .slice(0, RATING_OLD_COUNT)
  return { newEntries, oldEntries }
}

// An offscreen renderer: draws the scene, then reports it as a PNG blob.
const PlayerRatingCanvas = ({
  scoreTable,
  info,
  scoreUrl,
  showTitle,
  showRanks,
  showUrl,
  onRender,
}: PlayerRatingCanvasProps) => {
  const { cardName, title, courseRank, classRank } = info
  const hasRanks = showRanks && courseRank != null && classRank != null
  const hasUrl = showUrl && scoreUrl != null
  const hasTitle = showTitle && title.length > 0
  const metaText = formatMetaText(info)
  const { newEntries, oldEntries } = useMemo(
    () => selectRatingEntries(scoreTable),
    [scoreTable],
  )
  const layerRef = useRef<Konva.Layer>(null)

  // Bumped as images settle, so the scene redraws and the export re-checks.
  const [settledCount, bumpSettled] = useReducer((n: number) => n + 1, 0)
  const [tracker] = useState(() => new ImageLoadTracker(bumpSettled))

  // Canvas text doesn't repaint when a font arrives, so wait for every glyph.
  const [fontsLoaded, setFontsLoaded] = useState(false)
  useEffect(() => {
    if (fontsLoaded) return
    const mplus2Text = [
      `Rating NEW OLD Avg ${metaText}`,
      ...newEntries.map((entry) => entry.title),
      ...oldEntries.map((entry) => entry.title),
    ].join("")
    const done = () => setFontsLoaded(true)
    Promise.all([
      document.fonts.load(`800 30px "M PLUS 2"`, mplus2Text),
      document.fonts.load(
        `700 30px "M PLUS Rounded 1c"`,
        `${cardName}${title}Otohime`,
      ),
      document.fonts.load(`400 30px "McLaren"`, "Otohime"),
    ]).then(done, done)
  }, [cardName, title, metaText, newEntries, oldEntries, fontsLoaded])

  // Export once fonts and images have settled, and again when a toggle changes
  // the scene (settledCount re-checks tracker.pending).
  useEffect(() => {
    if (!fontsLoaded || tracker.pending > 0) return
    // Reading the layer's own canvas avoids the two extra ~31.5MB canvases
    // Konva's export helpers would allocate.
    const canvas = layerRef.current?.getCanvas()._canvas
    if (canvas == null) return
    let cancelled = false
    // Wait for Konva's draw from this commit.
    const frame = requestAnimationFrame(() => {
      canvas.toBlob((blob) => {
        if (!cancelled && blob != null) onRender(blob)
      }, "image/png")
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [onRender, fontsLoaded, tracker, settledCount, hasRanks, hasUrl, hasTitle])

  // Destroying the stage shrinks its four full-size canvases to 0x0, releasing
  // over 120MB right away on iOS Safari.
  useEffect(
    () => () => {
      layerRef.current?.getStage()?.destroy()
    },
    [],
  )

  if (!fontsLoaded) return null

  const newHeight = sectionHeight(newEntries.length)
  const oldHeight = sectionHeight(oldEntries.length)
  // Center the sections vertically when there are fewer charts than the max.
  const slack =
    HEIGHT - FOOTER_HEIGHT - HEADER_HEIGHT - newHeight - SECTION_GAP - oldHeight
  const newY = HEADER_HEIGHT + Math.max(0, slack) / 2

  return (
    <ImageLoadContext value={tracker}>
      <Stage width={WIDTH} height={HEIGHT}>
        {/* Not interactive, so skip drawing the hit graph. */}
        <Layer ref={layerRef} listening={false}>
          <Rect width={WIDTH} height={HEIGHT} fill={BG_COLOR} />
          <CanvasHeader
            info={info}
            scoreUrl={hasUrl ? scoreUrl : undefined}
            metaText={metaText}
            hasRanks={hasRanks}
            hasTitle={hasTitle}
          />
          <Section title="NEW" entries={newEntries} y={newY} />
          <Section
            title="OLD"
            entries={oldEntries}
            y={newY + newHeight + SECTION_GAP}
          />
          <CanvasFooter />
        </Layer>
      </Stage>
    </ImageLoadContext>
  )
}

// Re-rendering redraws the whole scene; all props are scalars or stable.
export default memo(PlayerRatingCanvas)
