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
const HEADER_HEIGHT = 92
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
// The rank plates ship as 70px-tall SVGs; keep their aspect ratios so they
// stay crisp when drawn on the canvas.
const RANK_HEIGHT = 44
const CLASS_RANK_WIDTH = RANK_HEIGHT * (126 / 70)
const COURSE_RANK_WIDTH = RANK_HEIGHT * (175 / 70)
const RANK_GAP = 12
// Footer holds the score URL text and its QR code when enabled.
const QR_SIZE = 120
const FOOTER_HEIGHT = QR_SIZE

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
        width={PLATE_WIDTH - 0.34 * PLATE_EM}
        align="right"
        text={`${rating}`}
        fontSize={PLATE_EM}
        fontStyle="900"
        fontFamily="M PLUS 1p"
        letterSpacing={0.125 * PLATE_EM}
        fill="#e5c100"
        stroke="#393939"
        strokeWidth={0.03 * PLATE_EM}
        fillAfterStrokeEnabled={true}
      />
    </Group>
  )
}

// A rank plate SVG (class or course) drawn at a fixed height with its aspect
// ratio preserved.
const RankPlate = ({
  src,
  x,
  y,
  width,
}: {
  src: string
  x: number
  y: number
  width: number
}) => {
  const image = useImage(src)
  return image ? (
    <KonvaImage image={image} x={x} y={y} width={width} height={RANK_HEIGHT} />
  ) : null
}

// A QR code drawn as filled squares. uqr gives us a boolean matrix (including
// its own quiet-zone border); we scale it to fit QR_SIZE and paint each dark
// module as a black Rect over a white background so the result is scannable.
const QrCode = ({ url, x, y }: { url: string; x: number; y: number }) => {
  const matrix = useMemo(() => encode(url, { border: 2 }).data, [url])
  const module = QR_SIZE / matrix.length
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
        fontFamily="M PLUS Rounded 1c"
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
        fontFamily="M PLUS Rounded 1c"
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
        fontFamily="M PLUS Rounded 1c"
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

const PlayerRatingCanvas = ({
  scoreTable,
  cardName,
  courseRank,
  classRank,
  scoreUrl,
  showRating,
  showRanks,
  showUrl,
}: {
  scoreTable: ScoreTableEntry[]
  cardName: string
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
  // silently with no re-paint. Wait for every glyph we draw — the static
  // labels, the card name and all song titles — before rendering.
  useEffect(() => {
    const text = [
      "Rating 組成新曲舊曲Best",
      cardName,
      ...newEntries.map((entry) => entry.title),
      ...oldEntries.map((entry) => entry.title),
    ].join("")
    document.fonts
      .load(`800 30px "M PLUS Rounded 1c"`, text)
      .then(() => setFontsLoaded(true))
      .catch(() => setFontsLoaded(true))
  }, [cardName, newEntries, oldEntries])

  if (!fontsLoaded) {
    return null
  }

  const totalRating = [...newEntries, ...oldEntries].reduce(
    (sum, e) => sum + e.rating,
    0,
  )

  // Grow the header to make room for the rank plates when shown, and reserve a
  // footer band for the score URL + QR code. Then distribute any leftover
  // vertical space evenly so the section block sits centered in the frame.
  const headerHeight = HEADER_HEIGHT + (hasRanks ? RANK_HEIGHT + RANK_GAP : 0)
  const footerHeight = hasUrl ? FOOTER_HEIGHT + SECTION_GAP : 0
  const newSectionH = sectionHeight(newEntries.length)
  const oldSectionH = sectionHeight(oldEntries.length)
  const contentH = newSectionH + SECTION_GAP + oldSectionH
  const slack = Math.max(
    0,
    HEIGHT - PADDING - headerHeight - contentH - footerHeight - PADDING,
  )
  const newSectionY = headerHeight + slack / 2
  const oldSectionY = newSectionY + newSectionH + SECTION_GAP
  const footerY = HEIGHT - PADDING - FOOTER_HEIGHT

  return (
    <Stage width={WIDTH} height={HEIGHT}>
      <Layer>
        <Rect width={WIDTH} height={HEIGHT} fill={BG_COLOR} />
        <Text
          x={PADDING}
          y={24}
          text={cardName}
          fontSize={40}
          fontStyle="bold"
          fontFamily="M PLUS Rounded 1c"
          fill="#ffffff"
        />
        {showRating ? (
          <RatingPlate
            rating={totalRating}
            legacy={false}
            x={WIDTH - PADDING - PLATE_WIDTH}
            y={24 + (40 - PLATE_HEIGHT) / 2}
          />
        ) : null}
        {hasRanks ? (
          <Group x={PADDING} y={HEADER_HEIGHT - 8}>
            <RankPlate
              src={courseRankImages[courseRank] as string}
              x={0}
              y={0}
              width={COURSE_RANK_WIDTH}
            />
            <RankPlate
              src={classRankImages[classRank] as string}
              x={COURSE_RANK_WIDTH + RANK_GAP}
              y={0}
              width={CLASS_RANK_WIDTH}
            />
          </Group>
        ) : null}
        <Section title="新曲 (Best 15)" entries={newEntries} y={newSectionY} />
        <Section title="舊曲 (Best 35)" entries={oldEntries} y={oldSectionY} />
        {hasUrl ? (
          <Group y={footerY}>
            <QrCode url={scoreUrl} x={PADDING} y={0} />
            <Text
              x={PADDING + QR_SIZE + RANK_GAP}
              y={(QR_SIZE - 24) / 2}
              width={WIDTH - PADDING * 2 - QR_SIZE - RANK_GAP}
              text={scoreUrl}
              fontSize={24}
              fontFamily="M PLUS Rounded 1c"
              fill="#c8c8c8"
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ) : null}
      </Layer>
    </Stage>
  )
}

export default PlayerRatingCanvas
