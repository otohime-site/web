import { useMemo } from "react"
import { Link } from "wouter"
import IconCircleOutline from "~icons/mdi/help-circle-outline"
import apIcon from "../images/flags/ap.svg"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  getCoverUrl,
  getRating,
} from "../models/aggregation"
import {
  RANK_CONST_BORDERS,
  RANK_SCORES,
  categories,
  comboFlags,
  versions,
} from "../models/constants"
import classes from "./ChartDetail.module.css"

// The gauge axis is linear in rating, so the fill and the border labels
// always agree and each border jump shows as a skip. Ratings below S
// would dwarf that scale, so the 0→S range is compressed into a
// fixed-width lead-in (on its own ground, like a broken axis). After
// CiRCLE the axis ends with a stub for the AP +1, sized as one rating
// unit on the same scale so it reads at the same weight as the skipped
// spans, and the bar only completes when the header's maximum is
// actually reached.
const GAUGE_LEAD = 0.15
const GAUGE_STOPS = RANK_SCORES.slice(3)

const ChartDetail = ({
  entry,
  showCover,
  afterCircle,
}: {
  entry: ScoreTableEntry
  // The table row already shows the cover, title, difficulty and
  // internal lv, so the detail only fills in what is missing there.
  showCover: boolean
  afterCircle: boolean
}) => {
  const internalLv = entry.internal_lv || ESTIMATED_INTERNAL_LV[entry.level]
  const score = entry.score ?? 0
  const apBonus = afterCircle && entry.combo_flag >= comboFlags.indexOf("ap")
  const { rating, maxRating, stops, gaps, fill, tail } = useMemo(() => {
    if (internalLv == null) {
      return {
        rating: 0,
        maxRating: 0,
        stops: [],
        gaps: [],
        fill: 0,
        tail: 0,
      }
    }
    const rating = getRating(internalLv, score, apBonus)
    // The formula caps the score at 100.5%; after CiRCLE the
    // theoretical maximum also counts the AP bonus.
    const maxRating = getRating(internalLv, 100.5, afterCircle)
    const ratingS = getRating(internalLv, 97)
    const ratingSssPlus = getRating(internalLv, 100.5)
    // One rating unit wide on the S→SSS+ scale: that span carries
    // `1 - GAUGE_LEAD - tail`, so an equal-weight tail solves to this.
    const tail = afterCircle
      ? (1 - GAUGE_LEAD) / (ratingSssPlus - ratingS + 1)
      : 0
    const ratingPos = (value: number) =>
      value < ratingS
        ? GAUGE_LEAD * (value / ratingS)
        : value <= ratingSssPlus
          ? GAUGE_LEAD +
            ((value - ratingS) / (ratingSssPlus - ratingS)) *
              (1 - GAUGE_LEAD - tail)
          : 1 - tail + (value - ratingSssPlus) * tail
    const stops = GAUGE_STOPS.map(([minScore, name]) => {
      const stopRating = getRating(internalLv, minScore)
      return { name, minScore, rating: stopRating, pos: ratingPos(stopRating) }
    })
    // Keep the rating axis unchanged, but mark values skipped when a rank
    // coefficient changes. Adjacent jumps (such as the two at 100.4999%
    // and 100.5%) are merged into one visible gap.
    const gaps = RANK_CONST_BORDERS.filter(
      ([border]) => border >= 970000,
    ).reduce<Array<{ from: number; to: number; start: number; end: number }>>(
      (result, [border]) => {
        const from = getRating(internalLv, (border - 1) / 10000)
        const to = getRating(internalLv, border / 10000)
        if (to - from <= 1) return result
        const gap = {
          from,
          to,
          start: ratingPos(from),
          end: ratingPos(to),
        }
        const previous = result[result.length - 1]
        if (previous != null && gap.from <= previous.to) {
          previous.to = gap.to
          previous.end = gap.end
        } else {
          result.push(gap)
        }
        return result
      },
      [],
    )
    const fill = Math.min(ratingPos(rating), 1)
    return { rating, maxRating, stops, gaps, fill, tail }
  }, [internalLv, score, apBonus, afterCircle])

  if (internalLv == null) {
    return <></>
  }

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        {showCover ? <img src={getCoverUrl(entry.song_id)} alt="" /> : null}
        <Link href={`~/dxi/s/${entry.song_id.substring(0, 8)}`}>
          <p>{entry.artist ?? ""}</p>
          <p>
            {categories[entry.category]} / {versions[entry.version]}
          </p>
        </Link>
      </div>
      <ul className={classes.rates}>
        <li>
          <span>Play</span>
          <span>{entry?.play ?? 0}</span>
        </li>
        <li>
          <span>SSS Rate</span>
          <span>{((entry?.sss_rate ?? 0) * 100).toFixed(1)}%</span>
        </li>
        <li>
          <span>FC Rate</span>
          <span>{((entry?.fc_rate ?? 0) * 100).toFixed(1)}%</span>
        </li>
        <li>
          <span>AP Rate</span>
          <span>{((entry?.ap_rate ?? 0) * 100).toFixed(1)}%</span>
        </li>
      </ul>
      <section className={classes.rating} aria-label="Rating">
        <div className={classes["rating-header"]}>
          <h6>
            Rating{" "}
            <a
              href="https://littlebtc.gitbook.io/otohime-docs/internal-lv"
              target="_blank"
              rel="noreferrer"
              title="顯示相關說明"
            >
              <IconCircleOutline />
            </a>
          </h6>
          <span className={classes["rating-value"]}>
            {rating}{" "}
            <span className={classes["rating-max"]}>/ {maxRating}</span>
          </span>
        </div>
        <div className={classes.gauge}>
          {entry.score != null ? (
            <span className={classes.marker}>
              <span
                className={classes["marker-label"]}
                style={{
                  left: `clamp(0.75rem, ${(fill * 100).toFixed(2)}%, calc(100% - 0.75rem))`,
                }}
              >
                {rating}
              </span>
              <span
                aria-hidden="true"
                className={classes["marker-pointer"]}
                style={{ left: `${(fill * 100).toFixed(2)}%` }}
              />
            </span>
          ) : null}
          <div className={classes.track}>
            <span
              className={classes.lead}
              style={{ width: `${(GAUGE_LEAD * 100).toFixed(2)}%` }}
            />
            <span
              className={classes.fill}
              style={{ width: `${(fill * 100).toFixed(2)}%` }}
            />
            {gaps.map((gap) => (
              <span
                key={`${gap.from}-${gap.to}`}
                aria-label={`無法取得的 Rating：${gap.from} 到 ${gap.to}`}
                className={classes.gap}
                title={`Rating 跳躍：${gap.from} → ${gap.to}`}
                style={{
                  left: `${(gap.start * 100).toFixed(2)}%`,
                  width: `${((gap.end - gap.start) * 100).toFixed(2)}%`,
                }}
              >
                {gap.to > stops[0].rating ? `+${gap.to - gap.from}` : null}
              </span>
            ))}
            {tail > 0 ? (
              <span
                className={classes["ap-tail"]}
                data-achieved={apBonus ? "" : undefined}
                title={
                  apBonus
                    ? "AP 加成：Rating 已 +1"
                    : "達成 AP / AP+ 時 Rating +1"
                }
                style={{ width: `${(tail * 100).toFixed(2)}%` }}
              />
            ) : null}
          </div>
          <ol className={classes.stops}>
            {stops.map((stop, index) => {
              // The last stop is the axis endpoint and carries the extra
              // AP line, so it anchors to the right edge instead of being
              // centred — a centred label that wide overflows the track.
              const isLast = index === stops.length - 1
              return (
                <li
                  key={stop.name}
                  data-achieved={score >= stop.minScore ? "" : undefined}
                  data-endpoint={isLast ? "" : undefined}
                  style={
                    isLast
                      ? undefined
                      : {
                          left: `clamp(1.5rem, ${(stop.pos * 100).toFixed(2)}%, calc(100% - 1.75rem))`,
                        }
                  }
                >
                  <span className={classes["stop-rank"]}>{stop.name}</span>
                  <span className={classes["stop-rating"]}>{stop.rating}</span>
                  {/* The AP bonus is just one more rating above SSS+, so it
                    reads as an extra line on that last stop. */}
                  {afterCircle && isLast ? (
                    <span
                      className={classes["ap-rating"]}
                      data-achieved={apBonus ? "" : undefined}
                      aria-label={`AP 加成 Rating：${maxRating}`}
                      title={
                        apBonus
                          ? "AP 加成：Rating 已 +1"
                          : "達成 AP / AP+ 時 Rating +1"
                      }
                    >
                      <img
                        className={classes["ap-icon"]}
                        src={apIcon}
                        alt=""
                        aria-hidden="true"
                      />
                      {maxRating}
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </div>
      </section>
      <Link
        className={classes["stats-link"]}
        href={`~/dxi/s/${entry.song_id.substring(0, 8)}`}
      >
        檢視統計
      </Link>
    </div>
  )
}

export default ChartDetail
