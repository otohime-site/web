import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import { getRankScoreIndex, getRating, RANK_SCORES } from "./helper"

const RatingTable = styled(Table)`
  width: 10em;
  a svg {
    margin-left: 0.5em;
    vertical-align: middle;
  }
`

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
    <RatingTable>
      <TableBody>
        <TableRow>
          <RatingTableCell>{internalLv.toFixed(1)}</RatingTableCell>
          <RatingDiffCell>
            {rating} / {maxRating}
            <Tooltip title="顯示相關說明">
              <Link
                href="https://littlebtc.gitbook.io/otohime-docs/internal-lv"
                target="_blank"
              >
                <HelpOutlineIcon fontSize="inherit" />
              </Link>
            </Tooltip>
          </RatingDiffCell>
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
    </RatingTable>
  )
}

export default NoteRating
