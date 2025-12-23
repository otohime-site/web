import { useMemo } from "react"
import { Link } from "wouter"
import IconCircleOutline from "~icons/mdi/help-circle-outline"
import { Progress } from "../../common/components/ui/Progress"
import { comboFlags } from "../../finale/models/constants"
import {
  ESTIMATED_INTERNAL_LV,
  getCoverUrl,
  getRankScoreIndex,
  getRating,
  ScoreTableEntry,
} from "../models/aggregation"
import {
  categories,
  difficulties,
  RANK_SCORES,
  versions,
} from "../models/constants"
import classes from "./NotePopup.module.css"

const NoteRating = ({
  entry,
  afterCircle,
}: {
  entry: ScoreTableEntry
  afterCircle: boolean
}) => {
  const internalLv = entry.internal_lv || ESTIMATED_INTERNAL_LV[entry.level]
  const [rating, maxRating, targets] = useMemo(() => {
    if (internalLv == null) {
      return [0, 0, []]
    }
    const index = getRankScoreIndex(entry.score ?? 0)
    const rating = getRating(
      internalLv,
      entry.score ?? 0,
      afterCircle && entry.combo_flag >= comboFlags.indexOf("ap"),
    )
    const maxRating = getRating(internalLv, 100.5, afterCircle)
    const targets = RANK_SCORES.slice(index + 1, index + 4).map(
      ([minScore, rankName]) => [rankName, getRating(internalLv, minScore)],
    )

    return [rating, maxRating, targets]
  }, [internalLv, entry, afterCircle])

  if (internalLv == null) {
    return <></>
  }

  return (
    <table className={classes.popup}>
      <thead>
        <tr>
          <th colSpan={2}>
            <section>
              <img src={getCoverUrl(entry.song_id)} />
              <Link
                href={`~/dxi/s/${entry.song_id.substring(0, 8)}/${
                  entry.deluxe ? "dx" : "std"
                }/${entry.difficulty}`}
              >
                <h6>{entry.title}</h6>
                <p>{entry.artist ?? ""}</p>
                <p>
                  {categories[entry.category]} /{" "}
                  {entry.deluxe ? "DELUXE" : "STANDARD"} (
                  {versions[entry.version]}) / {difficulties[entry.difficulty]}{" "}
                  {entry.internal_lv ? internalLv.toFixed(1) : entry.level}
                </p>
              </Link>
            </section>
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={2}>
            Rating{" "}
            <a
              href="https://littlebtc.gitbook.io/otohime-docs/internal-lv"
              target="_blank"
              rel="noreferrer"
              title="顯示相關說明"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <IconCircleOutline />
            </a>
          </th>
        </tr>
        <tr>
          <td colSpan={2}>
            <Progress
              label={`${internalLv.toFixed(1)}`}
              value={rating}
              max={maxRating}
              translations={{ value: () => `${rating} / ${maxRating}` }}
            />
          </td>
        </tr>
        {targets.map((t) => (
          <tr key={t[0]}>
            <td>{t[0]}</td>
            <td>{t[1]}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>
            <Link
              href={`~/dxi/s/${entry.song_id.substring(0, 8)}/${
                entry.deluxe ? "dx" : "std"
              }/${entry.difficulty}`}
            >
              檢視統計
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default NoteRating
