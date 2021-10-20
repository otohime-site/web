import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import { getRankScoreIndex, getRating, RANK_SCORES } from "./helper"

const RatingTableCell = styled(TableCell)`
  padding: 8px;
`

const RatingDiffCell = styled(RatingTableCell)`
  text-align: right;
`

const NoteRating: FunctionComponent<{
  internalLv: number
  score: number
}> = ({ internalLv, score }) => {
  const index = getRankScoreIndex(score)
  const rating = getRating(score, internalLv)
  const maxRating = getRating(100.5, internalLv)
  const targets =
    index >= 0
      ? RANK_SCORES.slice(index + 1, index + 4).map(([minScore, rankName]) => [
          rankName,
          getRating(minScore, internalLv) - rating,
        ])
      : []
  return (
    <Table>
      <TableBody>
        <TableRow>
          <RatingTableCell colSpan={2}>
            {internalLv.toFixed(1)} - {rating} / {maxRating}
          </RatingTableCell>
        </TableRow>
        {targets.length === 0 ? (
          <TableRow>
            <RatingTableCell colSpan={2}>已拿滿！</RatingTableCell>
          </TableRow>
        ) : (
          <></>
        )}
        {targets.map((t) => (
          <TableRow>
            <RatingTableCell>{t[0]}</RatingTableCell>
            <RatingDiffCell>+{t[1]}</RatingDiffCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default NoteRating
