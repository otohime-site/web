import { useMemo } from "react"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import { graphql } from "../../graphql"
import { flatSongsResult } from "../models/aggregation"
import { dxIntlSongsDocument } from "../models/queries"

const dxIntlNewRatingStatsDocument = graphql(`
  query dxIntlNewRatingStats {
    dx_intl_new_rating_stats {
      range
      count
    }
  }
`)

const Overview = () => {
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const flattedEntries = useMemo(() => {
    const flattened = flatSongsResult(songsResult.data)
    flattened.sort((a, b) => (b.play ?? 0) - (a.play ?? 0))
    return flattened.slice(0, 50)
  }, [songsResult])
  console.log(flattedEntries)
  const [baseRatingResult] = useQuery({ query: dxIntlNewRatingStatsDocument })
  const baseRatingAccumulated = (
    baseRatingResult.data?.dx_intl_new_rating_stats ?? []
  ).reduce<
    Array<{
      range?: string | null
      count?: number | null
      accumulated: number
    }>
  >(
    (accr, curr) => [
      ...accr,
      {
        ...curr,
        accumulated:
          (accr[accr.length - 1]?.accumulated ?? 0) + (curr.count ?? 0),
      },
    ],
    [],
  )

  return (
    <main>
      <h4>maimai DX 國際版玩家統計</h4>
      <h5>Rating</h5>
      <p>只計算公開成績單與遊玩過 Splash PLUS 以後版本的玩家。</p>
      <QueryResult result={baseRatingResult}>
        <table>
          <thead>
            <tr>
              <th>範圍</th>
              <th>玩家數</th>
              <th>累計</th>
            </tr>
          </thead>
          <tbody>
            {baseRatingAccumulated.map((br) => (
              <tr key={br.range}>
                <td>{br.range ?? ""}</td>
                <td>{br.count ?? "0"}</td>
                <td>{br.accumulated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </QueryResult>
    </main>
  )
}

export default Overview
