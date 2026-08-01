import Konva from "konva"
import {
  createContext,
  memo,
  type RefObject,
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

// Everything the image needs about the player, gathered once where the record
// is read so the dialog and the canvas can pass it along untouched.
export interface RatingImageInfo {
  cardName: string
  title: string
  trophy: Trophy
  // The record's own rating, which is what the game reports; summing the
  // listed entries can disagree with it during data updates.
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

// This stage is already sized at the intended export resolution. Letting Konva
// apply the device pixel ratio would turn it into a 6300x11250 backing canvas on
// a 3x iPhone, which exceeds iOS Safari's canvas memory budget.
Konva.pixelRatio = 1

// Concrete colors for difficulty accents (Konva can't read CSS variables).
const difficultyColors = [
  "#22aa5d", // Basic
  "#f0b400", // Advanced
  "#ff5060", // Expert
  "#9b5de5", // Master
  "#c84bff", // Re:Master
]
// Re:Master shares the purple family with Master, so it gets an extra white
// outer border to tell the two apart at a glance.
const REMASTER_DIFFICULTY = 4

// Combo / sync flag badge SVGs indexed by combo_flag / sync_flag. Index 0 is
// "no flag" — the blank placeholder keeps the badge slots aligned across blocks.
const comboFlagImages: string[] = [
  blankFlagUrl,
  fcFlagUrl,
  fcpFlagUrl,
  apFlagUrl,
  appFlagUrl,
]
const syncFlagImages: string[] = [
  blankFlagUrl,
  sFlagUrl,
  fsFlagUrl,
  fspFlagUrl,
  fsdFlagUrl,
  fsdpFlagUrl,
]

// Canvas geometry. The image is a fixed 2100x3750 portrait frame. The header
// eats a fixed band at the top, the footer a fixed band at the bottom, and the
// remaining middle is laid out as a 5-column grid of cover-backed blocks — see
// the layout math in the component.
const WIDTH = 2100
const HEIGHT = 3750
// The smaller record header frees 100px for a roomier footer while preserving
// the existing content band—and therefore all song-card dimensions.
const HEADER_HEIGHT = 500
const FOOTER_HEIGHT = 260
const PADDING = 64
const COLUMNS = 5
const TILE_GAP = 20
const SECTION_TITLE_HEIGHT = 72
const SECTION_GAP = 32
// Each block is a rounded rectangle filled by the cover art, with rank / title /
// score text drawn over difficulty-tinted scrims. The width comes from the
// 5-column grid; the height is sized so both sections (10 rows total) fit the
// content band between header and footer — so blocks are slightly landscape and
// the square cover is center-cropped to fill.
const BLOCK_W = Math.floor(
  (WIDTH - PADDING * 2 - TILE_GAP * (COLUMNS - 1)) / COLUMNS,
)
const NEW_ROWS = Math.ceil(RATING_NEW_COUNT / COLUMNS)
const OLD_ROWS = Math.ceil(RATING_OLD_COUNT / COLUMNS)
const TOTAL_ROWS = NEW_ROWS + OLD_ROWS
const CONTENT_BAND = HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT
// Solve for the block height that packs every row into the band, accounting for
// the two section titles, the inter-section gap, and the inter-row gaps.
const BLOCK_H = Math.floor(
  (CONTENT_BAND -
    2 * SECTION_TITLE_HEIGHT -
    SECTION_GAP -
    (TOTAL_ROWS - 2) * TILE_GAP) /
    TOTAL_ROWS,
)
const BLOCK_RADIUS = 20
// Concrete equivalent of --otohime-0. Keeping this fixed makes exported images
// use the light brand canvas even when the browser is in dark mode.
const BG_COLOR = "oklch(98.2% 0.012 340)"

// The QR code lives in the header's top-right corner with the score URL above
// it and the site logo badged in its center. Sized generously for the larger
// canvas so it stays scannable at export resolution.
const QR_SIZE = 240
const CORNER_URL_HEIGHT = 56
const LOGO_BADGE = 60

// The browser record is based on the app's 14px root font. Header elements in
// this full-resolution export use the same CSS em measurements at 3x. Since the
// dialog previews the canvas at 25%, they appear at 75% of the browser size.
const HEADER_EXPORT_SCALE = 3
const BROWSER_ROOT_EM = 14
const HEADER_EM = BROWSER_ROOT_EM * HEADER_EXPORT_SCALE
// Footer branding keeps its original export scale independently of the record.
const FOOTER_EM = BROWSER_ROOT_EM * 4

// Shared by every useImage in the scene: the decoded images, plus a count of
// the requests still in flight so the root can export exactly once, when all of
// them have settled. Both live in one object because they are one concern —
// the images live in nested components, so this is passed through context.
//
// The cache exists because toggling a switch remounts the rank badges and
// re-runs every block's useImage; without it each toggle would build fresh
// Image elements and re-decode art already in memory. A settled entry resolves
// during render, so the export isn't gated on work that's already done. null
// marks a failed load — never re-requested, and Konva draws nothing for it.
//
// It is owned by the stage rather than the module so ~50 decoded covers
// (~30MB) are released when the dialog closes instead of accumulating for the
// page's lifetime as the user browses players.
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
  settle(url: string, image: HTMLImageElement | null) {
    this.cache.set(url, image)
    this.pending--
    this.onChange()
  }
  // A request abandoned mid-flight (a toggle swapping the scene) releases its
  // slot without caching, or the pending count could never reach zero.
  abandon() {
    this.pending--
    this.onChange()
  }
}
const ImageLoadContext = createContext<ImageLoadTracker | null>(null)

// Load an image element for use in Konva, requesting CORS so the resulting
// canvas stays exportable (covers are served from Cloudflare R2 / covers.otohi.me).
const useImage = (url?: string): HTMLImageElement | undefined => {
  const tracker = use(ImageLoadContext)
  // Reading the cache during render means a URL that already settled resolves
  // on the first render, with no effect round-trip, so remounted badges and
  // blocks paint immediately. The tracker re-renders the stage as entries land.
  const image = url == null ? undefined : (tracker?.cache.get(url) ?? undefined)
  useEffect(() => {
    if (tracker == null || url == null || tracker.cache.has(url)) return
    const img = new window.Image()
    tracker.add()
    // A missing or non-CORS cover must still settle, or the export would wait
    // on it forever; Konva simply draws nothing for an image that never loads.
    let settled = false
    const settle = (image: HTMLImageElement | null) => () => {
      if (settled) return
      settled = true
      tracker.settle(url, image)
    }
    const onLoad = settle(img)
    const onError = settle(null)
    img.addEventListener("load", onLoad)
    img.addEventListener("error", onError)
    // WebKit may issue or cache a non-CORS request when these are assigned in
    // the opposite order. Both must be in place before starting the request.
    img.crossOrigin = "anonymous"
    img.src = url
    return () => {
      img.removeEventListener("load", onLoad)
      img.removeEventListener("error", onError)
      if (!settled) {
        settled = true
        tracker.abandon()
      }
    }
  }, [url, tracker])
  return image
}

// The score table has already loaded this resource as an ordinary <img> by the
// time the dialog opens. Keep the canvas request on a distinct cache key so
// Safari cannot reuse that non-CORS response for an anonymous-CORS image.
const getCanvasCoverUrl = (songId: string) => `${getCoverUrl(songId)}?cors=1`

// Mirror of <Rating>: an SVG plate chosen by rating tier, with the number
// overlaid in gold right-aligned text. The plate art is 296x86; sizes below
// are derived from Rating.module.css where 1em maps to PLATE_EM px.
const PLATE_EM = HEADER_EM
const PLATE_WIDTH = 7.56 * PLATE_EM
const PLATE_HEIGHT = 2.2 * PLATE_EM

const RatingPlate = ({
  rating,
  legacy,
  x,
  y,
}: {
  rating: number
  legacy: boolean
  x: number
  y: number
}) => {
  const plate = useImage(getRatingImage(rating, legacy) as string)
  return (
    <Group x={x} y={y}>
      {plate ? (
        <KonvaImage image={plate} width={PLATE_WIDTH} height={PLATE_HEIGHT} />
      ) : null}
      <Text
        x={0}
        y={0.5 * PLATE_EM}
        width={PLATE_WIDTH - 0.4 * PLATE_EM}
        align="right"
        text={`${rating}`}
        fontSize={PLATE_EM}
        fontStyle="900"
        fontFamily="M PLUS 2"
        letterSpacing={0.125 * PLATE_EM}
        fill="#e5c100"
        stroke="#393939"
        strokeWidth={0.03 * PLATE_EM}
        fillAfterStrokeEnabled={true}
      />
    </Group>
  )
}

// Class/course rank badges are SVGs with a fixed intrinsic height (70px) but
// varying widths. We draw them at a fixed target height, scaling the width by
// the loaded image's natural aspect ratio so each badge keeps its proportions.
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
  if (src == null || !image) return null
  const width = (image.naturalWidth / image.naturalHeight) * height
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />
}

// The site logo in the footer lockup. This is a component rather than a
// useImage call in the root so that it renders below the ImageLoadContext
// provider — every image in the scene is then counted the same way, and the
// export gate stays a single "pending === 0" with no per-image exceptions.
const FooterLogo = () => {
  const image = useImage(logoUrl)
  if (!image) return null
  return (
    <KonvaImage
      image={image}
      y={(FOOTER_HEIGHT - FOOTER_LOGO_SIZE) / 2}
      width={FOOTER_LOGO_SIZE}
      height={FOOTER_LOGO_SIZE}
    />
  )
}

// Trophy title bars in the DOM (Record.module.css) use a two-stop vertical
// gradient (lighter top 60%, darker bottom) with a colored border and shadow.
// Konva can't clip a CSS gradient string, so we mirror the same stops here as
// a linear fill from top to bottom.
const trophyStyles: Record<
  Trophy,
  { top: string; bottom: string; border: string; shadow: string }
> = {
  normal: {
    top: "#f9f9f9",
    bottom: "#dadada",
    border: "#b8b8b8",
    shadow: "#666666",
  },
  bronze: {
    top: "#fb9966",
    bottom: "#dd7733",
    border: "#b8b8b8",
    shadow: "#803300",
  },
  silver: {
    top: "#e3e3f0",
    bottom: "#96b6e3",
    border: "#b6d3f3",
    shadow: "#3333aa",
  },
  gold: {
    top: "#ffdf4b",
    bottom: "#fabf00",
    border: "#ffe366",
    shadow: "#bb3e00",
  },
  // The rainbow plate is a complex multi-layer CSS gradient; approximate it with
  // a broad horizontal spectrum that reads the same at a glance.
  rainbow: {
    top: "#fdfd92",
    bottom: "#befafa",
    border: "#ffffff",
    shadow: "#888888",
  },
}
const rainbowStops = [
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
]

// The user-assigned title with its trophy effect: a gradient plate with a
// colored border and drop shadow, and white text stroked in black (paint order
// stroke-then-fill, matching the DOM's -webkit-text-stroke + paint-order).
const TitlePlate = ({
  title,
  trophy,
  x,
  y,
  width,
  height,
}: {
  title: string
  trophy: Trophy
  x: number
  y: number
  width: number
  height: number
}) => {
  const style = trophyStyles[trophy]
  // Width may flex-shrink around rank badges in the browser, but its font and
  // vertical measurements continue to use the unchanged root em.
  const em = HEADER_EM
  const radius = em * 0.4
  return (
    <Group x={x} y={y}>
      {/* Drop shadow sits just below the plate. */}
      <Rect
        y={em * 0.2}
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
        strokeWidth={em * 0.1}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={
          trophy === "rainbow" ? { x: width, y: 0 } : { x: 0, y: height }
        }
        fillLinearGradientColorStops={
          trophy === "rainbow"
            ? rainbowStops
            : [0, style.top, 0.6, style.top, 0.6, style.bottom, 1, style.bottom]
        }
      />
      <Text
        x={0}
        y={0}
        width={width}
        height={height}
        align="center"
        verticalAlign="middle"
        text={title}
        fontSize={em}
        fontStyle="700"
        fontFamily="M PLUS Rounded 1c"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={em * 0.1}
        fillAfterStrokeEnabled={true}
        shadowColor="#666666"
        shadowOffset={{ x: em * 0.06, y: em * 0.06 }}
        wrap="none"
        ellipsis={true}
      />
    </Group>
  )
}

// A QR code drawn as filled squares with the site logo badged in its center.
// uqr gives us a boolean matrix (including its own quiet-zone border) at high
// error correction, so a small logo over the middle stays scannable. We scale
// the matrix to fit QR_SIZE and paint each dark module as a black Rect over a
// white background, then a white-backed logo on top.
const QrCode = ({ url, x, y }: { url: string; x: number; y: number }) => {
  const matrix = useMemo(() => encode(url, { border: 2, ecc: "H" }).data, [url])
  const logo = useImage(logoUrl)
  const module = QR_SIZE / matrix.length
  const badgePad = 4
  const badge = LOGO_BADGE + badgePad * 2
  const badgeXY = (QR_SIZE - badge) / 2
  return (
    <Group x={x} y={y}>
      <Rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" cornerRadius={8} />
      {/* The matrix is fixed-size, so grid coordinates are stable keys. */}
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
      {logo ? (
        <KonvaImage
          image={logo}
          x={badgeXY + badgePad}
          y={badgeXY + badgePad}
          width={LOGO_BADGE}
          height={LOGO_BADGE}
        />
      ) : null}
    </Group>
  )
}

// One chart rendered as a cover-backed block: the square cover art is
// center-cropped to fill the landscape block, with a difficulty-tinted scrim at
// the top (variant + difficulty on the left, rating score on the right) and
// bottom (song title, score, flags, and rating), plus a difficulty-colored
// frame.
const TITLE_BAND_H = Math.round(BLOCK_H * 0.4)
const SCORE_BAND_H = Math.round(BLOCK_H * 0.44)
// The variant badge SVGs are 2:1; drawn at the top-left header height.
const HEADER_FONT = Math.round(BLOCK_H * 0.07)
const VARIANT_H = Math.round(HEADER_FONT * 2.3)
// Combo / sync flag badges on the score line; the source SVGs are square.
const FLAG_SIZE = Math.round(BLOCK_H * 0.13)
const BLOCK_PAD = Math.round(BLOCK_W * 0.03)
const SCORE_LINE_HEIGHT = Math.round(BLOCK_H * 0.16)
const SCORE_LINE_Y = BLOCK_H - BLOCK_PAD - SCORE_LINE_HEIGHT
const TITLE_LINE_Y = SCORE_LINE_Y - FLAG_SIZE - Math.round(BLOCK_H * 0.02)
const RATING_VALUE_WIDTH = Math.round(BLOCK_W * 0.24)
const FLAG_GAP = 4
const SCORE_ITEM_GAP = 10
const RATING_VALUE_X = BLOCK_W - BLOCK_PAD - RATING_VALUE_WIDTH
const FLAGS_X = RATING_VALUE_X - SCORE_ITEM_GAP - FLAG_SIZE * 2 - FLAG_GAP
const FLAGS_Y = SCORE_LINE_Y + (SCORE_LINE_HEIGHT - FLAG_SIZE) / 2

// Center-crop the square source cover to the block's aspect ratio. The source
// is square (side = naturalWidth), so we keep the full width and trim the
// height, or vice-versa, whichever fills the landscape block.
const coverCrop = (img: HTMLImageElement) => {
  const side = Math.min(img.naturalWidth, img.naturalHeight)
  const cropH = (side * BLOCK_H) / BLOCK_W
  if (cropH <= side) {
    return { x: 0, y: (side - cropH) / 2, width: side, height: cropH }
  }
  const cropW = (side * BLOCK_W) / BLOCK_H
  return { x: (side - cropW) / 2, y: 0, width: cropW, height: side }
}

// Konva can't tint with a CSS color string on a gradient, so build vertical
// scrim stops from a difficulty color faded to transparent. Colors are hex, so
// append alpha bytes for the translucent stops.
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
  const variant = useImage(entry.deluxe ? dxVariantUrl : stdVariantUrl)
  const comboFlag = useImage(comboFlagImages[entry.combo_flag] ?? blankFlagUrl)
  const syncFlag = useImage(syncFlagImages[entry.sync_flag] ?? blankFlagUrl)
  const accent = difficultyColors[entry.difficulty] ?? "#888888"
  // Re:Master shares Master's purple family; give its bottom scrim a lighter
  // purple tint (paired with the white border) so the two read apart.
  const isReMaster = entry.difficulty === REMASTER_DIFFICULTY
  const scrimTint = isReMaster ? "#e6a8ff" : accent
  const level = entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level
  return (
    <Group x={x} y={y}>
      {/* Cover art (center-cropped) or a placeholder, clipped to the block. */}
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

      {/* Lighten the cover so the darker scrims and white text pop against it. */}
      <Rect
        width={BLOCK_W}
        height={BLOCK_H}
        cornerRadius={BLOCK_RADIUS}
        fill="#ffffff"
        opacity={0.18}
      />

      {/* Top scrim: black-to-transparent so the header reads over any cover. */}
      <Rect
        width={BLOCK_W}
        height={TITLE_BAND_H}
        cornerRadius={[BLOCK_RADIUS, BLOCK_RADIUS, 0, 0]}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: TITLE_BAND_H }}
        fillLinearGradientColorStops={[0, "#000000b8", 1, "#00000000"]}
      />
      {/* Bottom scrim behind the title/level, tinted with the difficulty accent. */}
      <Rect
        y={BLOCK_H - SCORE_BAND_H}
        width={BLOCK_W}
        height={SCORE_BAND_H}
        cornerRadius={[0, 0, BLOCK_RADIUS, BLOCK_RADIUS]}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: SCORE_BAND_H }}
        fillLinearGradientColorStops={[0, "#00000000", 1, `${scrimTint}f0`]}
      />

      {/* Difficulty-colored frame. Re:Master (index 4) uses a white border to
          set it apart from the plain-purple Master charts. */}
      <Rect
        width={BLOCK_W}
        height={BLOCK_H}
        cornerRadius={BLOCK_RADIUS}
        stroke={isReMaster ? "#ffffff" : accent}
        strokeWidth={5}
      />

      {/* Top-left: variant (DX/STD) badge. */}
      {variant ? (
        <KonvaImage
          image={variant}
          x={BLOCK_PAD}
          y={BLOCK_PAD}
          width={VARIANT_H * 2}
          height={VARIANT_H}
        />
      ) : null}

      {/* Top-right: the (internal) level, larger. */}
      <Text
        x={0}
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

      {/* Bottom band: a larger song title, then score · flags · rating. */}
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

      {/* Final line: score (left), combo/sync flags, and rating (right). */}
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
      <KonvaImage
        image={comboFlag}
        x={FLAGS_X}
        y={FLAGS_Y}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
      />
      <KonvaImage
        image={syncFlag}
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
      {/* A small Otohime-colored flourish gives each section a clear visual
          start without competing with the difficulty colors below it. */}
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
      {entries.map((entry, i) => {
        const col = i % COLUMNS
        const row = Math.floor(i / COLUMNS)
        return (
          <ChartBlock
            key={entry.hash}
            entry={entry}
            x={PADDING + col * (BLOCK_W + TILE_GAP)}
            y={SECTION_TITLE_HEIGHT + row * (BLOCK_H + TILE_GAP)}
          />
        )
      })}
    </Group>
  )
}

const sectionHeight = (count: number) => {
  const rows = Math.ceil(count / COLUMNS)
  return SECTION_TITLE_HEIGHT + rows * (BLOCK_H + TILE_GAP) - TILE_GAP
}

// Browser-derived header measurements at 3x. The card name establishes its
// own em with font-size: 120%; the auto heights include the inherited 1.5 line
// height and 0.1em borders on both sides.
const CARD_PLATE_FONT_SIZE = HEADER_EM * 1.2
const CARD_PLATE_WIDTH = Math.round(CARD_PLATE_FONT_SIZE * 9)
const CARD_PLATE_BORDER = CARD_PLATE_FONT_SIZE * 0.1
const CARD_PLATE_PADDING = HEADER_EM * 0.25
const CARD_PLATE_HEIGHT = Math.round(
  CARD_PLATE_FONT_SIZE * 1.5 + CARD_PLATE_BORDER * 2,
)
const BROWSER_RECORD_WIDTH = HEADER_EM * 25
const TITLE_BAR_MAX_WIDTH = HEADER_EM * 20
const TITLE_BAR_HEIGHT = Math.round(HEADER_EM * 1.5 + HEADER_EM * 0.2)
const RANK_BADGE_HEIGHT = HEADER_EM * 2
// --size-2 between items in a row; --size-1 between browser record rows.
const RANK_GAP = HEADER_EM * 0.5
const RANK_GROUP_GAP = HEADER_EM * 0.25
const CLASS_RANK_WIDTH = RANK_BADGE_HEIGHT * (126 / 70)
const COURSE_RANK_WIDTH = RANK_BADGE_HEIGHT * (175 / 70)
const HEADER_LINE_GAP = HEADER_EM * 0.25
const FOOTER_LOGO_SIZE = FOOTER_EM * 1.7
const FOOTER_WORD_FONT_SIZE = FOOTER_EM * 1.25
const FOOTER_WORD_WIDTH = 300
const FOOTER_BRAND_GAP = FOOTER_EM * 0.2

// -----------------------------------------------------------------------------
// Scene data and layout
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

const formatMetaText = ({ updatedDate, versionName }: RatingImageInfo) =>
  [
    updatedDate != null ? `Updated at ${updatedDate}` : null,
    versionName != null ? `using ${versionName} data` : null,
  ]
    .filter(Boolean)
    .join("; ")

interface HeaderLayoutOptions {
  hasRanks: boolean
  hasTitle: boolean
  metaText: string
  scoreUrl?: string
}

const getHeaderLayout = ({
  hasRanks,
  hasTitle,
  metaText,
  scoreUrl,
}: HeaderLayoutOptions) => {
  const titleBarWidth = hasRanks
    ? Math.min(
        TITLE_BAR_MAX_WIDTH,
        BROWSER_RECORD_WIDTH -
          RANK_GAP -
          CLASS_RANK_WIDTH -
          RANK_GROUP_GAP -
          COURSE_RANK_WIDTH,
      )
    : TITLE_BAR_MAX_WIDTH

  // The three left-aligned lines are vertically centered in the fixed header.
  const hasLine3 = hasTitle || metaText !== ""
  const linesHeight =
    PLATE_HEIGHT +
    HEADER_LINE_GAP +
    CARD_PLATE_HEIGHT +
    (hasLine3 ? HEADER_LINE_GAP + TITLE_BAR_HEIGHT : 0)
  const line1Y = Math.round((HEADER_HEIGHT - linesHeight) / 2)
  const line2Y = line1Y + PLATE_HEIGHT + HEADER_LINE_GAP
  const line3Y = line2Y + CARD_PLATE_HEIGHT + HEADER_LINE_GAP

  // The score URL sits above the QR code in the top-right corner.
  const cornerX = WIDTH - PADDING - QR_SIZE
  const cornerUrlY = line1Y
  const cornerQrY = cornerUrlY + CORNER_URL_HEIGHT + 12
  const leftLine1Right =
    PADDING + PLATE_WIDTH + RANK_GAP + (hasRanks ? CLASS_RANK_WIDTH : 0)
  const cornerUrlX = Math.max(WIDTH * 0.4, leftLine1Right + RANK_GAP)
  const cornerUrlWidth = WIDTH - PADDING - cornerUrlX
  const cornerUrlFontSize =
    scoreUrl != null
      ? Math.min(44, cornerUrlWidth / Math.max(1, scoreUrl.length * 0.62))
      : 44

  return {
    titleBarWidth,
    line1Y,
    line2Y,
    line3Y,
    cornerX,
    cornerUrlY,
    cornerQrY,
    cornerUrlX,
    cornerUrlWidth,
    cornerUrlFontSize,
  }
}

const getSectionPositions = (newCount: number, oldCount: number) => {
  const newSectionHeight = sectionHeight(newCount)
  const oldSectionHeight = sectionHeight(oldCount)
  const contentHeight = newSectionHeight + SECTION_GAP + oldSectionHeight
  const contentBottom = HEIGHT - FOOTER_HEIGHT
  const slack = Math.max(0, contentBottom - HEADER_HEIGHT - contentHeight)
  const newSectionY = HEADER_HEIGHT + slack / 2
  return {
    newSectionY,
    oldSectionY: newSectionY + newSectionHeight + SECTION_GAP,
  }
}

// -----------------------------------------------------------------------------
// Renderer lifecycle
// -----------------------------------------------------------------------------

interface CanvasFontOptions {
  cardName: string
  title: string
  metaText: string
  newEntries: ScoreTableEntry[]
  oldEntries: ScoreTableEntry[]
}

const useCanvasFonts = ({
  cardName,
  title,
  metaText,
  newEntries,
  oldEntries,
}: CanvasFontOptions) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Konva paints to a canvas, so a font that isn't loaded yet falls back
  // silently with no re-paint. Wait for every glyph drawn by the scene.
  useEffect(() => {
    if (fontsLoaded) return
    const mplus2Text = [
      `Rating NEW OLD Avg ${metaText}`,
      ...newEntries.map((entry) => entry.title),
      ...oldEntries.map((entry) => entry.title),
    ].join("")
    const roundedText = `${cardName}${title}Otohime`
    Promise.all([
      document.fonts.load(`800 30px "M PLUS 2"`, mplus2Text),
      document.fonts.load(`700 30px "M PLUS Rounded 1c"`, roundedText),
      document.fonts.load(`400 30px "McLaren"`, "Otohime"),
    ])
      .then(() => setFontsLoaded(true))
      .catch(() => setFontsLoaded(true))
  }, [cardName, title, metaText, newEntries, oldEntries, fontsLoaded])

  return fontsLoaded
}

const useImageTracker = () => {
  // Bumped as images settle, so the scene re-renders to draw them and the
  // export effect re-checks the mutable pending count.
  const [settledCount, bumpSettled] = useReducer(
    (count: number) => count + 1,
    0,
  )
  // Identity-stable so useImage's effect doesn't re-run and double-count.
  const tracker = useMemo(() => new ImageLoadTracker(bumpSettled), [])
  return { tracker, settledCount }
}

const useDestroyStageOnUnmount = (layerRef: RefObject<Konva.Layer | null>) => {
  // Konva sizes four 2100x3750 canvases per stage. destroy() resizes them to
  // 0x0, releasing over 120MB of backing store immediately on iOS Safari.
  useEffect(
    () => () => {
      layerRef.current?.getStage()?.destroy()
    },
    [layerRef],
  )
}

interface CanvasExportOptions {
  layerRef: RefObject<Konva.Layer | null>
  fontsLoaded: boolean
  tracker: ImageLoadTracker
  settledCount: number
  hasRanks: boolean
  hasUrl: boolean
  hasTitle: boolean
  onRender: (blob: Blob) => void
}

const useCanvasExport = ({
  layerRef,
  fontsLoaded,
  tracker,
  settledCount,
  hasRanks,
  hasUrl,
  hasTitle,
  onRender,
}: CanvasExportOptions) => {
  // The stage is an offscreen renderer. Export only after the fonts and every
  // image have settled, and re-export when a visible toggle changes the scene.
  useEffect(() => {
    if (!fontsLoaded || tracker.pending > 0) return
    const canvas = layerRef.current?.getCanvas()._canvas
    if (canvas == null) return
    let cancelled = false
    // Let Konva finish the draw scheduled by this commit before reading it.
    const frame = requestAnimationFrame(() => {
      // Reading the existing layer avoids the two additional ~31.5MB canvases
      // that Konva's export helpers allocate at this resolution.
      canvas.toBlob((blob) => {
        if (cancelled || blob == null) return
        onRender(blob)
      }, "image/png")
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
    // settledCount is the re-check trigger for tracker.pending. The visibility
    // booleans represent only toggles that actually alter the drawn scene.
  }, [
    layerRef,
    onRender,
    fontsLoaded,
    tracker,
    settledCount,
    hasRanks,
    hasUrl,
    hasTitle,
  ])
}

// -----------------------------------------------------------------------------
// Composite scene components
// -----------------------------------------------------------------------------

interface CanvasHeaderProps {
  info: RatingImageInfo
  scoreUrl?: string
  metaText: string
  hasRanks: boolean
  hasUrl: boolean
  hasTitle: boolean
}

const CanvasHeader = ({
  info,
  scoreUrl,
  metaText,
  hasRanks,
  hasUrl,
  hasTitle,
}: CanvasHeaderProps) => {
  const { cardName, title, trophy, rating, courseRank, classRank } = info
  const layout = getHeaderLayout({ hasRanks, hasTitle, metaText, scoreUrl })

  return (
    <>
      <RatingPlate
        rating={rating}
        legacy={false}
        x={PADDING}
        y={layout.line1Y}
      />
      {hasRanks && classRank != null ? (
        <RankImage
          src={classRankImages[classRank]}
          x={PADDING + PLATE_WIDTH + RANK_GAP}
          y={layout.line1Y + (PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
          height={RANK_BADGE_HEIGHT}
        />
      ) : null}

      <Group x={PADDING} y={layout.line2Y}>
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
          y={0}
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
          y={layout.line2Y + (CARD_PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
          height={RANK_BADGE_HEIGHT}
        />
      ) : null}

      {hasTitle ? (
        <TitlePlate
          title={title}
          trophy={trophy}
          x={PADDING}
          y={layout.line3Y}
          width={layout.titleBarWidth}
          height={TITLE_BAR_HEIGHT}
        />
      ) : null}

      {metaText !== "" ? (
        <Text
          x={PADDING + (hasTitle ? layout.titleBarWidth + RANK_GAP : 0)}
          y={layout.line3Y}
          height={TITLE_BAR_HEIGHT}
          verticalAlign="middle"
          text={metaText}
          fontSize={HEADER_EM}
          fontStyle="600"
          fontFamily="M PLUS 2"
          fill="#8a7698"
        />
      ) : null}

      {hasUrl && scoreUrl != null ? (
        <>
          <Text
            x={layout.cornerUrlX}
            y={layout.cornerUrlY}
            width={layout.cornerUrlWidth}
            height={CORNER_URL_HEIGHT}
            align="right"
            verticalAlign="middle"
            text={scoreUrl}
            fontSize={layout.cornerUrlFontSize}
            fontFamily="M PLUS 2"
            fill="#c8c8c8"
            wrap="none"
          />
          <QrCode url={scoreUrl} x={layout.cornerX} y={layout.cornerQrY} />
        </>
      ) : null}
    </>
  )
}

const CanvasSections = ({
  newEntries,
  oldEntries,
}: {
  newEntries: ScoreTableEntry[]
  oldEntries: ScoreTableEntry[]
}) => {
  const { newSectionY, oldSectionY } = getSectionPositions(
    newEntries.length,
    oldEntries.length,
  )
  return (
    <>
      <Section title="NEW" entries={newEntries} y={newSectionY} />
      <Section title="OLD" entries={oldEntries} y={oldSectionY} />
    </>
  )
}

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
      <FooterLogo />
      <Text
        x={FOOTER_LOGO_SIZE + FOOTER_BRAND_GAP}
        width={FOOTER_WORD_WIDTH}
        height={FOOTER_HEIGHT}
        verticalAlign="middle"
        text="Otohime"
        fontSize={FOOTER_WORD_FONT_SIZE}
        fontFamily="McLaren"
        fill="#5f4181"
      />
    </Group>
  </>
)

// -----------------------------------------------------------------------------
// Root renderer
// -----------------------------------------------------------------------------

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
  const layerRef = useRef<Konva.Layer>(null)
  const { tracker, settledCount } = useImageTracker()
  const hasRanks = showRanks && courseRank != null && classRank != null
  const hasUrl = showUrl && scoreUrl != null
  const hasTitle = showTitle && title.length > 0
  const { newEntries, oldEntries } = useMemo(
    () => selectRatingEntries(scoreTable),
    [scoreTable],
  )
  const metaText = formatMetaText(info)
  const fontsLoaded = useCanvasFonts({
    cardName,
    title,
    metaText,
    newEntries,
    oldEntries,
  })

  useDestroyStageOnUnmount(layerRef)
  useCanvasExport({
    layerRef,
    fontsLoaded,
    tracker,
    settledCount,
    hasRanks,
    hasUrl,
    hasTitle,
    onRender,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <ImageLoadContext value={tracker}>
      <Stage width={WIDTH} height={HEIGHT}>
        {/* Nothing here is interactive. This skips hit-graph drawing on every
            redraw; Konva still sizes the hit canvas up front, so it saves work
            rather than memory. */}
        <Layer ref={layerRef} listening={false}>
          <Rect width={WIDTH} height={HEIGHT} fill={BG_COLOR} />
          <CanvasHeader
            info={info}
            scoreUrl={scoreUrl}
            metaText={metaText}
            hasRanks={hasRanks}
            hasUrl={hasUrl}
            hasTitle={hasTitle}
          />
          <CanvasSections newEntries={newEntries} oldEntries={oldEntries} />
          <CanvasFooter />
        </Layer>
      </Stage>
    </ImageLoadContext>
  )
}

// Memoized: re-rendering walks and redraws the whole Konva scene, and all
// props are scalars or identity-stable.
export default memo(PlayerRatingCanvas)
