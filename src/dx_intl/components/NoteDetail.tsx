import { useMemo } from "react"
import { Link } from "wouter"
import IconCircleOutline from "~icons/mdi/help-circle-outline"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  getCoverUrl,
  getRating,
} from "../models/aggregation"
import {
  RANK_SCORES,
  categories,
  comboFlags,
  versions,
} from "../models/constants"
import { ComboFlag } from "./Flags"
import classes from "./NoteDetail.module.css"

// The gauge axis is linear in rating, so the fill and the border labels
// always agree and each border jump shows as a skip. Ratings below S
// would dwarf that scale, so the 0→S range is compressed into a
// fixed-width lead-in (on its own ground, like a broken axis). After
// CiRCLE the axis ends with a fixed-width stub for the AP +1, so the
// bar only completes when the header's maximum is actually reached.
const GAUGE_LEAD = 0.15
const GAUGE_AP_TAIL = 0.05
const GAUGE_STOPS = RANK_SCORES.slice(3)

const NoteDetail = ({
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
  const { rating, maxRating, stops, fill, tail } = useMemo(() => {
    if (internalLv == null) {
      return { rating: 0, maxRating: 0, stops: [], fill: 0, tail: 0 }
    }
    const rating = getRating(internalLv, score, apBonus)
    // The formula caps the score at 100.5%; after CiRCLE the
    // theoretical maximum also counts the AP bonus.
    const maxRating = getRating(internalLv, 100.5, afterCircle)
    const ratingS = getRating(internalLv, 97)
    const ratingSssPlus = getRating(internalLv, 100.5)
    const tail = afterCircle ? GAUGE_AP_TAIL : 0
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
    const fill = Math.min(ratingPos(rating), 1)
    return { rating, maxRating, stops, fill, tail }
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
          {afterCircle && entry.score != null ? (
            apBonus ? (
              <span
                className={classes["ap-bonus"]}
                title="AP 加成：Rating 已 +1"
              >
                <ComboFlag flag={comboFlags[entry.combo_flag]} />
                +1
              </span>
            ) : (
              <span
                className={classes["ap-bonus"]}
                data-pending=""
                title="達成 AP / AP+ 時 Rating +1"
              >
                <ComboFlag flag="ap" />
                +1
              </span>
            )
          ) : null}
          <span className={classes["rating-value"]}>
            {rating}{" "}
            <span className={classes["rating-max"]}>/ {maxRating}</span>
          </span>
        </div>
        <div className={classes.gauge}>
          {entry.score != null ? (
            <span
              className={classes.marker}
              style={{
                left: `clamp(1rem, ${(fill * 100).toFixed(2)}%, calc(100% - 1rem))`,
              }}
            >
              {rating}
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
            {stops.slice(0, -1).map((stop) => (
              <span
                key={stop.name}
                className={classes.tick}
                style={{ left: `${(stop.pos * 100).toFixed(2)}%` }}
              />
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
            {stops.map((stop) => (
              <li
                key={stop.name}
                data-achieved={score >= stop.minScore ? "" : undefined}
                style={{
                  left: `clamp(1.5rem, ${(stop.pos * 100).toFixed(2)}%, calc(100% - 1.75rem))`,
                }}
              >
                <span className={classes["stop-rank"]}>{stop.name}</span>
                <span className={classes["stop-rating"]}>{stop.rating}</span>
              </li>
            ))}
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

export default NoteDetail
