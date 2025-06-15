import { useMemo } from "react"
import { Link } from "react-aria-components"
import IconCircleOutline from "~icons/mdi/help-circle-outline"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  getRankScoreIndex,
  getRating,
} from "../models/aggregation"
import { RANK_SCORES, versions } from "../models/constants"

const NoteRating = ({ entry }: { entry: ScoreTableEntry }) => {
  const internalLv = entry.internal_lv || ESTIMATED_INTERNAL_LV[entry.level]
  const [rating, maxRating, targets] = useMemo(() => {
    if (internalLv == null) {
      return [0, 0, []]
    }
    const index = getRankScoreIndex(entry.score ?? 0)
    const rating = getRating(entry.score ?? 0, internalLv)
    const maxRating = getRating(100.5, internalLv)
    const targets = RANK_SCORES.slice(index + 1, index + 4).map(
      ([minScore, rankName]) => [
        rankName,
        getRating(minScore, internalLv) - rating,
      ],
    )

    return [rating, maxRating, targets]
  }, [internalLv, entry])
  if (internalLv == null) {
    return <></>
  }
  return (
    <table style={{ fontSize: "0.86rem" }}>
      <thead>
        <tr>
          <th>
            {entry.title} ({entry.internal_lv ?? entry.level})
          </th>
          <td> {versions[entry.version]}</td>
        </tr>
        <tr>
          <td>
            <Link
              href={`/dxi/s/${entry.song_id.substring(0, 8)}/${
                entry.deluxe ? "dx" : "std"
              }/${entry.difficulty}`}
            >
              檢視統計
            </Link>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={2}>SSS/FC/AP Rate</th>
        </tr>
        <tr>
          <td>SSS</td>
          <td>{((entry?.sss_rate ?? 0) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <td>FC</td>
          <td>{((entry?.fc_rate ?? 0) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <td>AP</td>
          <td>{((entry?.ap_rate ?? 0) * 100).toFixed(1)}%</td>
        </tr>
        <tr>
          <th colSpan={2}>Rating</th>
        </tr>
        <tr>
          <td>{internalLv.toFixed(1)}</td>
          <td>
            {rating} / {maxRating}
            <a
              href="https://littlebtc.gitbook.io/otohime-docs/internal-lv"
              target="_blank"
              rel="noreferrer"
              title="顯示相關說明"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <IconCircleOutline />
            </a>
          </td>
        </tr>
        {entry.score && entry.score >= 100.5 ? (
          <tr>
            <td colSpan={2}>已拿滿！</td>
          </tr>
        ) : (
          <></>
        )}
        {targets.map((t) => (
          <tr key={t[0]}>
            <td>{t[0]}</td>
            <td>+{t[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default NoteRating
