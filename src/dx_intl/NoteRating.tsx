import { useMemo } from "react"
import IconCircleOutline from "~icons/mdi/help-circle-outline"
import { getRankScoreIndex, getRating } from "./models/aggregation"
import { RANK_SCORES, levels } from "./models/constants"

const NoteRating = ({
  note,
  score,
}: {
  nickname?: string
  note: {
    song_id: string
    deluxe: boolean
    dificultiy: number
    level: (typeof levels)[number]
    internal_lv?: number | null
  }
  score: number
}) => {
  const internalLv = note.internal_lv
  const [rating, maxRating, targets] = useMemo(() => {
    if (internalLv == null) {
      return [0, 0, []]
    }
    const index = getRankScoreIndex(score)
    const rating = getRating(score, internalLv)
    const maxRating = getRating(100.5, internalLv)
    const targets =
      index >= 0
        ? RANK_SCORES.slice(index + 1, index + 4).map(
            ([minScore, rankName]) => [
              rankName,
              getRating(minScore, internalLv) - rating,
            ],
          )
        : []

    return [rating, maxRating, targets]
  }, [internalLv, score])
  if (internalLv == null) {
    return <></>
  }
  return (
    <table>
      <tbody>
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
        {targets.length === 0 ? (
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
