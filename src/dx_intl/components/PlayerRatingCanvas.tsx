import { useEffect, useMemo, useState } from "react"
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
import { ScoreTableEntry, getCoverUrl } from "../models/aggregation"
import { RATING_NEW_COUNT, RATING_OLD_COUNT } from "../models/constants"
import { classRankImages, courseRankImages } from "./Ranks"
import { getRatingImage } from "./Rating"

// Concrete colors for difficulty borders (Konva can't read CSS variables).
const difficultyColors = [
  "#22aa5d", // Basic
  "#f0b400", // Advanced
  "#ff5060", // Expert
  "#9b5de5", // Master
  "#c84bff", // Re:Master
]

// Canvas geometry. The image is a fixed 1080x1350 portrait frame (Instagram
// 4:5). The cover size is derived from the width, then everything below is laid
// out to fit the fixed height — see the layout assertions in the component.
const WIDTH = 1080
const HEIGHT = 1350
const PADDING = 32
const COLUMNS = 10
const TILE_GAP = 8
const COVER_SIZE = Math.floor(
  (WIDTH - PADDING * 2 - TILE_GAP * (COLUMNS - 1)) / COLUMNS,
)
const TILE_LABEL_HEIGHT = 40
const TILE_HEIGHT = COVER_SIZE + TILE_LABEL_HEIGHT
const SECTION_TITLE_HEIGHT = 44
const BG_COLOR = "#1b1d22"
const SECTION_GAP = 20
const RANK_GAP = 12

// Header holds three stacked left-aligned lines: (1) the rating plate + class
// rank name, (2) the card-name plate + course rank name, (3) the trophy title
// bar. Heights are tuned so the block clears the top-right URL/QR corner.
const HEADER_LINE_GAP = 12
// The QR code lives in the top-right corner with the score URL above it and the
// site logo badged in its center. Kept small so it never crowds the header.
const QR_SIZE = 132
const CORNER_URL_HEIGHT = 22
const LOGO_BADGE = 34

// Load an image element for use in Konva, requesting CORS so the resulting
// canvas stays exportable (covers are served from Cloudflare R2 / covers.otohi.me).
const useImage = (url: string): HTMLImageElement | undefined => {
  const [image, setImage] = useState<HTMLImageElement>()
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = url
    const onLoad = () => setImage(img)
    img.addEventListener("load", onLoad)
    return () => img.removeEventListener("load", onLoad)
  }, [url])
  return image
}

// Mirror of <Rating>: an SVG plate chosen by rating tier, with the number
// overlaid in gold right-aligned text. The plate art is 296x86; sizes below
// are derived from Rating.module.css where 1em maps to PLATE_EM px.
const PLATE_EM = 25
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
        y={0.6 * PLATE_EM}
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
  const image = useImage(src ?? "")
  if (src == null || !image) return null
  const width = (image.naturalWidth / image.naturalHeight) * height
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />
}

// Trophy title bars in the DOM (Record.module.css) use a two-stop vertical
// gradient (lighter top 60%, darker bottom) with a colored border and shadow.
// Konva can't clip a CSS gradient string, so we mirror the same stops here as
// a linear fill from top to bottom.
type Trophy = "normal" | "bronze" | "silver" | "gold" | "rainbow"
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
  const radius = height * 0.28
  return (
    <Group x={x} y={y}>
      {/* Drop shadow sits just below the plate. */}
      <Rect
        y={height * 0.14}
        width={width}
        height={height}
        cornerRadius={radius}
        fill={style.shadow}
      />
      <Rect
        width={width}
        height={height}
        cornerRadius={radius}
        stroke={style.border}
        strokeWidth={height * 0.07}
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
        fontSize={height * 0.5}
        fontStyle="700"
        fontFamily="M PLUS Rounded 1c"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth={height * 0.045}
        fillAfterStrokeEnabled={true}
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
  const badgePad = 2
  const badge = LOGO_BADGE + badgePad * 2
  const badgeXY = (QR_SIZE - badge) / 2
  return (
    <Group x={x} y={y}>
      <Rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" cornerRadius={4} />
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
        cornerRadius={6}
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

const ChartTile = ({
  entry,
  x,
  y,
}: {
  entry: ScoreTableEntry
  x: number
  y: number
}) => {
  const cover = useImage(getCoverUrl(entry.song_id))
  const borderColor = difficultyColors[entry.difficulty] ?? "#888"
  return (
    <Group x={x} y={y}>
      {cover ? (
        <KonvaImage
          image={cover}
          width={COVER_SIZE}
          height={COVER_SIZE}
          cornerRadius={8}
        />
      ) : (
        <Rect
          width={COVER_SIZE}
          height={COVER_SIZE}
          cornerRadius={8}
          fill="#2c2f36"
        />
      )}
      {/* Difficulty-colored frame */}
      <Rect
        width={COVER_SIZE}
        height={COVER_SIZE}
        cornerRadius={8}
        stroke={borderColor}
        strokeWidth={4}
      />
      <Text
        x={0}
        y={COVER_SIZE + 2}
        width={COVER_SIZE}
        height={18}
        align="center"
        verticalAlign="top"
        text={entry.title}
        fontSize={13}
        fontFamily="M PLUS 2"
        fill="#d8d8d8"
        wrap="none"
        ellipsis={true}
      />
      <Text
        x={0}
        y={COVER_SIZE + 21}
        width={COVER_SIZE}
        align="center"
        text={`${entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}  →  ${entry.rating}`}
        fontSize={16}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#f5f5f5"
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
  return (
    <Group y={y}>
      <Text
        x={PADDING}
        y={8}
        text={`${title}  (${entries.length})  —  ${total}`}
        fontSize={30}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffd54f"
      />
      {entries.map((entry, i) => {
        const col = i % COLUMNS
        const row = Math.floor(i / COLUMNS)
        return (
          <ChartTile
            key={entry.hash}
            entry={entry}
            x={PADDING + col * (COVER_SIZE + TILE_GAP)}
            y={SECTION_TITLE_HEIGHT + row * (TILE_HEIGHT + TILE_GAP)}
          />
        )
      })}
    </Group>
  )
}

const sectionHeight = (count: number) => {
  const rows = Math.ceil(count / COLUMNS)
  return SECTION_TITLE_HEIGHT + rows * (TILE_HEIGHT + TILE_GAP)
}

// Header line geometry. The rating plate sets the height of line 1; the card
// name plate mirrors it on line 2; the trophy title bar is line 3. Rank badges
// are drawn as SVGs to the right of the plate on their respective line.
const CARD_PLATE_HEIGHT = 52
const CARD_PLATE_WIDTH = 300
const TITLE_BAR_HEIGHT = 52
const TITLE_BAR_WIDTH = 460
const RANK_BADGE_HEIGHT = 46

const PlayerRatingCanvas = ({
  scoreTable,
  cardName,
  title,
  trophy,
  courseRank,
  classRank,
  scoreUrl,
  showRating,
  showRanks,
  showUrl,
}: {
  scoreTable: ScoreTableEntry[]
  cardName: string
  title: string
  trophy: Trophy
  courseRank?: number | null
  classRank?: number | null
  scoreUrl?: string
  showRating: boolean
  showRanks: boolean
  showUrl: boolean
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const hasRanks = showRanks && courseRank != null && classRank != null
  const hasUrl = showUrl && scoreUrl != null
  const hasTitle = title.length > 0

  const { newEntries, oldEntries } = useMemo(() => {
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
  }, [scoreTable])

  // Konva paints to a canvas, so a font that isn't loaded yet falls back
  // silently with no re-paint. Wait for every glyph we draw — the section
  // labels and song titles in M PLUS 2, plus the card name and user title in
  // M PLUS Rounded 1c — before rendering.
  useEffect(() => {
    const mplus2Text = [
      "Rating 組成新曲舊曲Best",
      ...newEntries.map((entry) => entry.title),
      ...oldEntries.map((entry) => entry.title),
    ].join("")
    const roundedText = `${cardName}${title}`
    Promise.all([
      document.fonts.load(`800 30px "M PLUS 2"`, mplus2Text),
      document.fonts.load(`700 30px "M PLUS Rounded 1c"`, roundedText),
    ])
      .then(() => setFontsLoaded(true))
      .catch(() => setFontsLoaded(true))
  }, [cardName, title, newEntries, oldEntries])

  if (!fontsLoaded) {
    return null
  }

  const totalRating = [...newEntries, ...oldEntries].reduce(
    (sum, e) => sum + e.rating,
    0,
  )

  // The header stacks three left-aligned lines: rating + class rank, card name
  // + course rank, then the trophy title bar. Compute each line's top so we can
  // measure the whole header and center the section block in the leftover space.
  const line1Y = PADDING
  const line2Y = line1Y + PLATE_HEIGHT + HEADER_LINE_GAP
  const line3Y = line2Y + CARD_PLATE_HEIGHT + HEADER_LINE_GAP
  const headerHeight =
    (hasTitle ? line3Y + TITLE_BAR_HEIGHT : line2Y + CARD_PLATE_HEIGHT) +
    SECTION_GAP

  const newSectionH = sectionHeight(newEntries.length)
  const oldSectionH = sectionHeight(oldEntries.length)
  const contentH = newSectionH + SECTION_GAP + oldSectionH
  const slack = Math.max(0, HEIGHT - headerHeight - contentH - PADDING)
  const newSectionY = headerHeight + slack / 2
  const oldSectionY = newSectionY + newSectionH + SECTION_GAP

  // Top-right corner: score URL above the QR code, right-aligned to the padding.
  const cornerX = WIDTH - PADDING - QR_SIZE
  const cornerUrlY = PADDING
  const cornerQrY = cornerUrlY + CORNER_URL_HEIGHT + 6

  return (
    <Stage width={WIDTH} height={HEIGHT}>
      <Layer>
        <Rect width={WIDTH} height={HEIGHT} fill={BG_COLOR} />

        {/* Line 1: rating plate + class rank badge */}
        {showRating ? (
          <RatingPlate
            rating={totalRating}
            legacy={false}
            x={PADDING}
            y={line1Y}
          />
        ) : null}
        {hasRanks ? (
          <RankImage
            src={classRankImages[classRank]}
            x={PADDING + (showRating ? PLATE_WIDTH + RANK_GAP : 0)}
            y={line1Y + (PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
            height={RANK_BADGE_HEIGHT}
          />
        ) : null}

        {/* Line 2: card name plate + course rank badge */}
        <Group x={PADDING} y={line2Y}>
          <Rect
            width={CARD_PLATE_WIDTH}
            height={CARD_PLATE_HEIGHT}
            cornerRadius={CARD_PLATE_HEIGHT * 0.16}
            fill="#ffffff"
            stroke="#cccccc"
            strokeWidth={CARD_PLATE_HEIGHT * 0.08}
          />
          <Text
            x={CARD_PLATE_HEIGHT * 0.28}
            y={0}
            width={CARD_PLATE_WIDTH - CARD_PLATE_HEIGHT * 0.56}
            height={CARD_PLATE_HEIGHT}
            verticalAlign="middle"
            text={cardName}
            fontSize={CARD_PLATE_HEIGHT * 0.52}
            fontStyle="700"
            fontFamily="M PLUS Rounded 1c"
            fill="#000000"
            wrap="none"
            ellipsis={true}
          />
        </Group>
        {hasRanks ? (
          <RankImage
            src={courseRankImages[courseRank]}
            x={PADDING + CARD_PLATE_WIDTH + RANK_GAP}
            y={line2Y + (CARD_PLATE_HEIGHT - RANK_BADGE_HEIGHT) / 2}
            height={RANK_BADGE_HEIGHT}
          />
        ) : null}

        {/* Line 3: user-assigned title with trophy effect */}
        {hasTitle ? (
          <TitlePlate
            title={title}
            trophy={trophy}
            x={PADDING}
            y={line3Y}
            width={TITLE_BAR_WIDTH}
            height={TITLE_BAR_HEIGHT}
          />
        ) : null}

        <Section title="新曲 (Best 15)" entries={newEntries} y={newSectionY} />
        <Section title="舊曲 (Best 35)" entries={oldEntries} y={oldSectionY} />

        {/* Top-right corner: score URL + QR code with logo badge */}
        {hasUrl ? (
          <>
            <Text
              x={cornerX - 40}
              y={cornerUrlY}
              width={QR_SIZE + 40}
              height={CORNER_URL_HEIGHT}
              align="right"
              verticalAlign="middle"
              text={scoreUrl}
              fontSize={16}
              fontFamily="M PLUS 2"
              fill="#c8c8c8"
              wrap="none"
              ellipsis={true}
            />
            <QrCode url={scoreUrl} x={cornerX} y={cornerQrY} />
          </>
        ) : null}
      </Layer>
    </Stage>
  )
}

export default PlayerRatingCanvas
