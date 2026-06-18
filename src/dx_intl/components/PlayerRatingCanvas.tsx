import { useEffect, useMemo, useState } from "react"
import {
  Group,
  Image as KonvaImage,
  Layer,
  Rect,
  Stage,
  Text,
} from "react-konva"
import { ScoreTableEntry, getCoverUrl } from "../models/aggregation"
import { RATING_NEW_COUNT, RATING_OLD_COUNT } from "../models/constants"
import { getRatingImage } from "./Rating"

// Concrete colors for difficulty borders (Konva can't read CSS variables).
const difficultyColors = [
  "#22aa5d", // Basic
  "#f0b400", // Advanced
  "#ff5060", // Expert
  "#9b5de5", // Master
  "#c84bff", // Re:Master
]

// Canvas geometry.
const WIDTH = 1200
const PADDING = 32
const HEADER_HEIGHT = 96
const COLUMNS = 5
const TILE_GAP = 16
const COVER_SIZE = Math.floor(
  (WIDTH - PADDING * 2 - TILE_GAP * (COLUMNS - 1)) / COLUMNS,
)
const TILE_LABEL_HEIGHT = 58
const TILE_HEIGHT = COVER_SIZE + TILE_LABEL_HEIGHT
const SECTION_TITLE_HEIGHT = 48
const BG_COLOR = "#1b1d22"
const SECTION_GAP = 24

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
        y={COVER_SIZE + 4}
        width={COVER_SIZE}
        height={28}
        align="center"
        verticalAlign="top"
        text={entry.title}
        fontSize={16}
        fontFamily="M PLUS Rounded 1c"
        fill="#d8d8d8"
        wrap="none"
        ellipsis={true}
      />
      <Text
        x={0}
        y={COVER_SIZE + 32}
        width={COVER_SIZE}
        align="center"
        text={`${entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}  →  ${entry.rating}`}
        fontSize={20}
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
}: {
  scoreTable: ScoreTableEntry[]
  cardName: string
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

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

  const newSectionY = HEADER_HEIGHT
  const oldSectionY =
    newSectionY + sectionHeight(newEntries.length) + SECTION_GAP
  const height =
    oldSectionY + sectionHeight(oldEntries.length) + SECTION_GAP - TILE_GAP
  const totalRating = [...newEntries, ...oldEntries].reduce(
    (sum, e) => sum + e.rating,
    0,
  )

  return (
    <Stage width={WIDTH} height={height}>
      <Layer>
        <Rect width={WIDTH} height={height} fill={BG_COLOR} />
        <Text
          x={PADDING}
          y={24}
          text={cardName}
          fontSize={40}
          fontStyle="bold"
          fontFamily="M PLUS Rounded 1c"
          fill="#ffffff"
        />
        <RatingPlate
          rating={totalRating}
          legacy={false}
          x={WIDTH - PADDING - PLATE_WIDTH}
          y={24 + (40 - PLATE_HEIGHT) / 2}
        />
        <Section title="新曲 (Best 15)" entries={newEntries} y={newSectionY} />
        <Section title="舊曲 (Best 35)" entries={oldEntries} y={oldSectionY} />
      </Layer>
    </Stage>
  )
}

export default PlayerRatingCanvas
