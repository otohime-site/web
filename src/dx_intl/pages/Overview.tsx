import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { FunctionComponent } from "react"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import {
  DxIntlNewRatingStatsDocument,
  Dx_Intl_New_Rating_Stats,
} from "../../generated/graphql"

const Overview: FunctionComponent = () => {
  const [baseRatingResult] = useQuery({ query: DxIntlNewRatingStatsDocument })
  const baseRatingAccumulated = (
    baseRatingResult.data?.dx_intl_new_rating_stats ?? []
  ).reduce<
    Array<
      Pick<Dx_Intl_New_Rating_Stats, "range" | "count"> & {
        accumulated: number
      }
    >
  >(
    (accr, curr) => [
      ...accr,
      {
        ...curr,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        accumulated:
          (accr[accr.length - 1]?.accumulated ?? 0) + (curr.count ?? 0),
      },
    ],
    []
  )

  return (
    <Container component="main">
      <Typography variant="h5">maimai DX 國際版玩家統計</Typography>
      <Typography variant="h6">Rating</Typography>
      <Typography variant="body2">
        只計算公開成績單與遊玩過 Splash PLUS 以後版本的玩家。
      </Typography>
      <QueryResult result={baseRatingResult}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">範圍</TableCell>
              <TableCell component="th">玩家數</TableCell>
              <TableCell component="th">累計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {baseRatingAccumulated.map((br) => (
              <TableRow key={br.range}>
                <TableCell>{br.range ?? ""}</TableCell>
                <TableCell>{br.count ?? "0"}</TableCell>
                <TableCell>{br.accumulated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryResult>
    </Container>
  )
}

export default Overview
