import { useMemo } from "react"
import { useQuery } from "urql"
import { Params, Redirect } from "wouter"
import { navigate } from "wouter/use-browser-location"
import { QueryResult } from "../../common/components/QueryResult"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"
import { flatSongsResult, getNoteHash } from "../models/aggregation"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./RatingTarget.module.css"

const dxIntlRatingTargetStatsDocument = graphql(`
  query dxIntlRatingTargetStats($rating_target: Int!) {
    dx_intl_rating_target_stats(
      where: { rating_target: { _eq: $rating_target } }
      order_by: { count: desc }
    ) {
      song_id
      current_version
      deluxe
      difficulty
      count
      average_score
    }
  }
`)

export const RATING_TARGETS = Array.from(
  { length: 11 },
  (_, i) => 14000 + i * 250,
)

type AggregatedRow = {
  note: ReturnType<typeof flatSongsResult>[number]
  average_score: number
  count: number
}

const RatingTargetTable = ({ rows }: { rows: AggregatedRow[] }) => (
  <table className={tableClasses.table}>
    <colgroup>
      <col className={tableClasses["col-title"]} />
      <col className={tableClasses["col-deluxe"]} />
      <col className={tableClasses["col-difficulty"]} />
      <col className={tableClasses["col-score"]} />
      <col className={tableClasses["col-stats"]} />
    </colgroup>
    <thead>
      <tr>
        <th className={tableClasses["col-title"]}></th>
        <th className={tableClasses["col-deluxe"]}></th>
        <th className={tableClasses["col-difficulty"]}></th>
        <th className={tableClasses["col-score"]}>平均成績</th>
        <th className={tableClasses["col-stats"]}>人數</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={getNoteHash(row.note)}>
          <td className={tableClasses["col-title"]}>{row.note.title}</td>
          <td className={tableClasses["col-deluxe"]}>
            <Variant deluxe={row.note.deluxe} />
          </td>
          <td
            className={[
              tableClasses["col-difficulty"],
              tableClasses[
                `difficulty-${row.note.difficulty as 0 | 1 | 2 | 3 | 4}`
              ],
            ].join(" ")}
          >
            {row.note.internal_lv ? row.note.internal_lv.toFixed(1) : ""}
          </td>
          <td className={tableClasses["col-score"]}>
            {`${row.average_score.toFixed(4)}%`}
          </td>
          <td className={tableClasses["col-stats"]}>{row.count}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const RatingTarget = ({ params }: { params: Params }) => {
  const rating = parseInt(params.rating ?? "", 10)
  const [ratingTargetStatsResult] = useQuery({
    query: dxIntlRatingTargetStatsDocument,
    variables: { rating_target: rating },
  })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const noteMap = useMemo(
    () =>
      new Map(
        flatSongsResult(songsResult.data).map((entry) => [
          getNoteHash(entry),
          entry,
        ]),
      ),
    [songsResult],
  )

  const aggregatedStats = useMemo(() => {
    const stats =
      ratingTargetStatsResult.data?.dx_intl_rating_target_stats ?? []
    return stats.flatMap((row) => {
      if (row.song_id == null || row.deluxe == null || row.difficulty == null)
        return []
      const note = noteMap.get(
        getNoteHash({
          song_id: row.song_id,
          deluxe: row.deluxe,
          difficulty: row.difficulty,
        }),
      )
      if (!note) return []
      return [
        {
          note,
          average_score: Number(row.average_score ?? 0),
          count: row.count ?? 0,
          current_version: row.current_version ?? false,
        },
      ]
    })
  }, [ratingTargetStatsResult, noteMap])

  if (!RATING_TARGETS.includes(rating)) {
    return <Redirect to="~/dxi/rt/14000" />
  }

  const newStats = aggregatedStats.filter((r) => r.current_version)
  const oldStats = aggregatedStats.filter((r) => !r.current_version)

  return (
    <>
      <main>
        <h4>Rating 別 Best 50 組成曲</h4>
        <p>
          列出最新一次改版後，每個 Rating 目標玩家（取正負125分）最常出現的 Best
          50 組成曲。
        </p>
        <ScrollableSegmentGroupRoot
          value={String(rating)}
          onValueChange={({ value }) => {
            navigate(`/dxi/rt/${value}`)
          }}
        >
          {RATING_TARGETS.map((target) => (
            <SegmentGroupItem key={target} value={String(target)}>
              {target}
            </SegmentGroupItem>
          ))}
        </ScrollableSegmentGroupRoot>
        <QueryResult result={ratingTargetStatsResult}>
          <div className={classes["rating-target-grid"]}>
            <div>
              <h5>新曲</h5>
              <RatingTargetTable rows={newStats} />
            </div>
            <div>
              <h5>舊曲</h5>
              <RatingTargetTable rows={oldStats} />
            </div>
          </div>
        </QueryResult>
      </main>
    </>
  )
}

export default RatingTarget
