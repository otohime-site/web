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
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  getCoverUrl,
  getRating,
} from "../models/aggregation"
import { RATING_NEW_COUNT, RATING_OLD_COUNT } from "../models/constants"
import { classRankImages, courseRankImages } from "./Ranks"
import { getRatingImage } from "./Rating"

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
const HEADER_HEIGHT = 600
const FOOTER_HEIGHT = 100
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
const RANK_GAP = 16

// The QR code lives in the header's top-right corner with the score URL above
// it and the site logo badged in its center. Sized generously for the larger
// canvas so it stays scannable at export resolution.
const QR_SIZE = 240
const CORNER_URL_HEIGHT = 40
const LOGO_BADGE = 60

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
const PLATE_EM = 46
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
// bottom (song title, level, and a rating progress bar), plus a
// difficulty-colored frame.
const TITLE_BAND_H = Math.round(BLOCK_H * 0.4)
const SCORE_BAND_H = Math.round(BLOCK_H * 0.44)
// The variant badge SVGs are 2:1; drawn at the top-left header height.
const HEADER_FONT = Math.round(BLOCK_H * 0.07)
const VARIANT_H = Math.round(HEADER_FONT * 1.15)
// A thin white progress bar showing this chart's rating against the theoretical
// max for its internal level (SSS+/AP at 101%).
const BAR_H = Math.max(3, Math.round(BLOCK_H * 0.02))
// Combo / sync flag badges on the score line; the source SVGs are square.
const FLAG_SIZE = Math.round(BLOCK_H * 0.13)

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
  const cover = useImage(getCoverUrl(entry.song_id))
  const variant = useImage(entry.deluxe ? dxVariantUrl : stdVariantUrl)
  const comboFlag = useImage(comboFlagImages[entry.combo_flag] ?? blankFlagUrl)
  const syncFlag = useImage(syncFlagImages[entry.sync_flag] ?? blankFlagUrl)
  const accent = difficultyColors[entry.difficulty] ?? "#888888"
  // Re:Master shares Master's purple family; give its bottom scrim a lighter
  // purple tint (paired with the white border) so the two read apart.
  const isReMaster = entry.difficulty === REMASTER_DIFFICULTY
  const scrimTint = isReMaster ? "#e6a8ff" : accent
  const level = entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level
  // Max rating this chart can yield: SSS+/AP (101%) at its internal level. When
  // the exact internal level is unknown, fall back to the estimated one for the
  // displayed level so the bar stays meaningful; guard against a zero denominator.
  const effectiveLv =
    entry.internal_lv ?? ESTIMATED_INTERNAL_LV[entry.level] ?? 0
  const maxRating = effectiveLv > 0 ? getRating(effectiveLv, 101, true) : 0
  const progress = maxRating > 0 ? Math.min(1, entry.rating / maxRating) : 0
  const pad = Math.round(BLOCK_W * 0.03)
  // Bottom band: two lines above the progress bar. Line 2 (score % + rating)
  // sits just above the bar; line 1 (title + flags) sits above line 2.
  const BOTTOM_LINE2_H = Math.round(BLOCK_H * 0.16)
  const BOTTOM_LINE2_Y = BLOCK_H - BAR_H - pad - BOTTOM_LINE2_H
  const BOTTOM_LINE1_Y = BOTTOM_LINE2_Y - FLAG_SIZE - Math.round(BLOCK_H * 0.02)
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
        fillLinearGradientColorStops={[0, "#000000d8", 1, "#00000000"]}
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
          x={pad}
          y={pad}
          width={VARIANT_H * 2}
          height={VARIANT_H}
        />
      ) : null}

      {/* Top-right: the (internal) level, larger. */}
      <Text
        x={0}
        y={pad}
        width={BLOCK_W - pad}
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

      {/* Bottom band, two lines stacked above the progress bar:
          line 1 — song title (left) + combo/sync flags (right);
          line 2 — score % (left) + rating (right). */}
      {/* Line 1: title (left) + flags (right). */}
      <Text
        x={pad}
        y={BOTTOM_LINE1_Y}
        width={BLOCK_W - pad * 2 - FLAG_SIZE * 2 - 12}
        height={FLAG_SIZE}
        verticalAlign="middle"
        text={entry.title}
        fontSize={Math.round(BLOCK_H * 0.11)}
        fontStyle="700"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        wrap="none"
        ellipsis={true}
      />
      <KonvaImage
        image={comboFlag}
        x={BLOCK_W - pad - FLAG_SIZE * 2 - 6}
        y={BOTTOM_LINE1_Y}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
      />
      <KonvaImage
        image={syncFlag}
        x={BLOCK_W - pad - FLAG_SIZE}
        y={BOTTOM_LINE1_Y}
        width={FLAG_SIZE}
        height={FLAG_SIZE}
      />

      {/* Line 2: score % (left) + rating (right). */}
      <Text
        x={pad}
        y={BOTTOM_LINE2_Y}
        height={BOTTOM_LINE2_H}
        verticalAlign="middle"
        text={entry.score ? `${entry.score.toFixed(4)}%` : "―"}
        fontSize={Math.round(BLOCK_H * 0.1)}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffffff"
      />
      <Text
        x={0}
        y={BOTTOM_LINE2_Y}
        width={BLOCK_W - pad}
        height={BOTTOM_LINE2_H}
        align="right"
        verticalAlign="middle"
        text={`${entry.rating}`}
        fontSize={BOTTOM_LINE2_H}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffffff"
        stroke="#00000070"
        strokeWidth={Math.round(BLOCK_H * 0.009)}
        fillAfterStrokeEnabled={true}
      />

      {/* Rating progress bar along the bottom edge. */}
      <Rect
        x={pad}
        y={BLOCK_H - BAR_H - pad}
        width={BLOCK_W - pad * 2}
        height={BAR_H}
        cornerRadius={BAR_H / 2}
        fill="#00000070"
      />
      <Rect
        x={pad}
        y={BLOCK_H - BAR_H - pad}
        width={(BLOCK_W - pad * 2) * progress}
        height={BAR_H}
        cornerRadius={BAR_H / 2}
        fill="#ffffff"
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
        y={12}
        text={`${title}  (${entries.length})  —  ${total}`}
        fontSize={52}
        fontStyle="bold"
        fontFamily="M PLUS 2"
        fill="#ffd54f"
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

// Header line geometry. The rating plate sets the height of line 1; the card
// name plate mirrors it on line 2; the trophy title bar is line 3. Rank badges
// are drawn as SVGs to the right of the plate on their respective line.
const CARD_PLATE_HEIGHT = 96
const CARD_PLATE_WIDTH = 560
const TITLE_BAR_HEIGHT = 96
const TITLE_BAR_WIDTH = 840
const RANK_BADGE_HEIGHT = 84
const HEADER_LINE_GAP = 20

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
  // + course rank, then the trophy title bar, vertically centered in the fixed
  // header band.
  const line1H = PLATE_HEIGHT
  const line2H = CARD_PLATE_HEIGHT
  const line3H = hasTitle ? TITLE_BAR_HEIGHT : 0
  const linesH =
    line1H +
    HEADER_LINE_GAP +
    line2H +
    (hasTitle ? HEADER_LINE_GAP + line3H : 0)
  const line1Y = Math.round((HEADER_HEIGHT - linesH) / 2)
  const line2Y = line1Y + line1H + HEADER_LINE_GAP
  const line3Y = line2Y + line2H + HEADER_LINE_GAP

  // Content sits between the header and footer bands, vertically centered in the
  // slack so the grid floats evenly regardless of exact block sizing.
  const newSectionH = sectionHeight(newEntries.length)
  const oldSectionH = sectionHeight(oldEntries.length)
  const contentH = newSectionH + SECTION_GAP + oldSectionH
  const contentTop = HEADER_HEIGHT
  const contentBottom = HEIGHT - FOOTER_HEIGHT
  const slack = Math.max(0, contentBottom - contentTop - contentH)
  const newSectionY = contentTop + slack / 2
  const oldSectionY = newSectionY + newSectionH + SECTION_GAP

  // Header's top-right corner: score URL above the QR code, right-aligned.
  const cornerX = WIDTH - PADDING - QR_SIZE
  const cornerUrlY = line1Y
  const cornerQrY = cornerUrlY + CORNER_URL_HEIGHT + 12

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

        {/* Top-right corner: score URL + QR code with logo badge */}
        {hasUrl ? (
          <>
            <Text
              x={cornerX - 200}
              y={cornerUrlY}
              width={QR_SIZE + 200}
              height={CORNER_URL_HEIGHT}
              align="right"
              verticalAlign="middle"
              text={scoreUrl}
              fontSize={32}
              fontFamily="M PLUS 2"
              fill="#c8c8c8"
              wrap="none"
              ellipsis={true}
            />
            <QrCode url={scoreUrl} x={cornerX} y={cornerQrY} />
          </>
        ) : null}

        <Section title="新曲 (Best 15)" entries={newEntries} y={newSectionY} />
        <Section title="舊曲 (Best 35)" entries={oldEntries} y={oldSectionY} />

        {/* Footer band: site attribution centered along the bottom. */}
        <Text
          x={0}
          y={HEIGHT - FOOTER_HEIGHT}
          width={WIDTH}
          height={FOOTER_HEIGHT}
          align="center"
          verticalAlign="middle"
          text="otohi.me"
          fontSize={40}
          fontStyle="bold"
          fontFamily="M PLUS 2"
          fill="#8a8f99"
        />
      </Layer>
    </Stage>
  )
}

export default PlayerRatingCanvas
