import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core"
import React, { FunctionComponent } from "react"
import { useQuery } from "urql"
import {
  DxIntlBaseRatingDocument,
  Dx_Intl_Base_Rating,
} from "../generated/graphql"
import { QueryResult } from "../QueryResult"

const Overview: FunctionComponent = () => {
  const [baseRatingResult] = useQuery({ query: DxIntlBaseRatingDocument })
  const baseRatingAccumulated = (
    baseRatingResult.data?.dx_intl_base_rating ?? []
  ).reduce<
    Array<
      Pick<Dx_Intl_Base_Rating, "range" | "count"> & { accumulated: number }
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
      <Typography variant="h6">Rating 底值</Typography>
      <Typography variant="body2">
        只計算公開成績單。已排除段位加成。
      </Typography>
      <QueryResult result={baseRatingResult}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">底 R 範圍</TableCell>
              <TableCell component="th">玩家數</TableCell>
              <TableCell component="th">累計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {baseRatingAccumulated.map((br) => (
              <TableRow>
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
