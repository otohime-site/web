import { useMemo } from "react"
import { useQuery } from "urql"
import { Link } from "wouter"
import { QueryResult } from "../../common/components/QueryResult"
import { graphql } from "../../graphql"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"
import { flatSongsResult } from "../models/aggregation"
import { dxIntlSongsDocument } from "../models/queries"
import { getDifficultyClassName } from "../utils/styling"

const dxIntlNewRatingStatsDocument = graphql(`
  query dxIntlNewRatingStats {
    dx_intl_new_rating_stats {
      range
      count
    }
  }
`)

const Overview = () => {
  const [baseRatingResult] = useQuery({ query: dxIntlNewRatingStatsDocument })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult.data],
  )
  const mostPlayedEntries = useMemo(
    () =>
      [...flattedEntries]
        .filter((entry) => entry.play != null && entry.play > 0)
        .sort((a, b) =>
          (b.play ?? 0) !== (a.play ?? 0)
            ? (b.play ?? 0) - (a.play ?? 0)
            : a.order !== b.order
              ? a.order - b.order
              : a.difficulty - b.difficulty,
        )
        .slice(0, 20),
    [flattedEntries],
  )

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
        range: curr.range,
        count: curr.count,
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
      <h5>Most Played Charts</h5>
      <p>依照公開成績單中的遊玩人數排序。</p>
      <QueryResult result={songsResult}>
        <table className={tableClasses.table}>
          <colgroup>
            <col className={tableClasses["col-rating"]} />
            <col className={tableClasses["col-title"]} />
            <col className={tableClasses["col-deluxe"]} />
            <col className={tableClasses["col-difficulty"]} />
            <col className={tableClasses["col-stats"]} />
          </colgroup>
          <thead>
            <tr>
              <th className={tableClasses["col-rating"]}>#</th>
              <th className={tableClasses["col-title"]}>曲目</th>
              <th className={tableClasses["col-deluxe"]}></th>
              <th className={tableClasses["col-difficulty"]}></th>
              <th className={tableClasses["col-stats"]}>Play</th>
            </tr>
          </thead>
          <tbody>
            {mostPlayedEntries.map((entry, index) => (
              <tr key={entry.hash}>
                <td className={tableClasses["col-rating"]}>{index + 1}</td>
                <td className={tableClasses["col-title"]}>
                  <Link
                    href={`~/dxi/s/${entry.song_id.substring(0, 8)}/${
                      entry.deluxe ? "dx" : "std"
                    }/${entry.difficulty}`}
                  >
                    {entry.title}
                  </Link>
                </td>
                <td className={tableClasses["col-deluxe"]}>
                  <Variant deluxe={entry.deluxe} />
                </td>
                <td className={getDifficultyClassName(tableClasses, entry)}>
                  {entry.internal_lv
                    ? entry.internal_lv.toFixed(1)
                    : entry.level}
                </td>
                <td className={tableClasses["col-stats"]}>{entry.play ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </QueryResult>
    </main>
  )
}

export default Overview
