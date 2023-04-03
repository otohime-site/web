import { useMemo } from "react"
import { MdHelpOutline } from "react-icons/md"
import { Link } from "react-router-dom"
import { getRankScoreIndex, getRating } from "./helper"
import { RANK_SCORES } from "./models/constants"
import { NoteEntry } from "./pages/Player"

const NoteRating = ({
  note,
  score,
}: {
  nickname?: string
  note: NoteEntry
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
            ]
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
            <Link
              to="https://littlebtc.gitbook.io/otohime-docs/internal-lv"
              target="_blank"
              title="顯示相關說明"
            >
              <MdHelpOutline />
            </Link>
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
