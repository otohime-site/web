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

// The gauge spans AAA→SSS+ in equal-width segments, one per rank, since
// rating is so top-heavy that a linear bar would crowd every border
// into its last stretch. Each border tick shows the rating reached there.
const GAUGE_START = 94
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
  const { rating, maxRating, stops, fill } = useMemo(() => {
    if (internalLv == null) {
      return { rating: 0, maxRating: 0, stops: [], fill: 0 }
    }
    const rating = getRating(internalLv, score, apBonus)
    // 100.5% is only reachable with all critical perfect, so the
    // maximum keeps the AP bonus once it exists.
    const maxRating = getRating(internalLv, 100.5, afterCircle)
    const stops = GAUGE_STOPS.map(([minScore, name]) => ({
      name,
      minScore,
      rating: getRating(internalLv, minScore),
    }))
    const edges = [GAUGE_START, ...GAUGE_STOPS.map(([minScore]) => minScore)]
    const segments = edges.length - 1
    const fill =
      score >= edges[segments]
        ? 1
        : edges.reduce(
            (fill, edge, index) =>
              index < segments && score >= edge
                ? (index + (score - edge) / (edges[index + 1] - edge)) /
                  segments
                : fill,
            0,
          )
    return { rating, maxRating, stops, fill }
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
        <div className={classes.track}>
          <span className={classes.fill} style={{ width: `${fill * 100}%` }} />
          {stops.map((stop) => (
            <span key={stop.name} className={classes.seg} />
          ))}
        </div>
        <ol className={classes.stops}>
          {stops.map((stop) => (
            <li
              key={stop.name}
              data-achieved={score >= stop.minScore ? "" : undefined}
            >
              <span className={classes["stop-rank"]}>{stop.name}</span>
              <span className={classes["stop-rating"]}>{stop.rating}</span>
            </li>
          ))}
        </ol>
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
