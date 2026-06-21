import { useMemo } from "react"
import { useQuery } from "urql"
import { Params, Redirect } from "wouter"
import { navigate } from "wouter/use-browser-location"
import { QueryResult } from "../../common/components/QueryResult"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import { ChartBlock, chartBlockClasses } from "../components/ChartBlock"
import { flatSongsResult, getNoteHash } from "../models/aggregation"
import { dxIntlSongsDocument } from "../models/queries"

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

const RatingTargetList = ({ rows }: { rows: AggregatedRow[] }) => (
  <ol className={chartBlockClasses["chart-blocks"]}>
    {rows.map((row, index) => (
      <li key={getNoteHash(row.note)}>
        <ChartBlock
          entry={row.note}
          rank={index + 1}
          value={
            <span className={chartBlockClasses["chart-value-group"]}>
              <span>{`${row.count}`}</span>
              <span className={chartBlockClasses["chart-value-sub"]}>
                {`${row.average_score.toFixed(4)}%`}
              </span>
            </span>
          }
        />
      </li>
    ))}
  </ol>
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
        <p>※下面的數字分別為「納入組成玩家數」與「納入玩家的平均成績」。</p>
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
          <h5>新曲</h5>
          <RatingTargetList rows={newStats} />
          <h5>舊曲</h5>
          <RatingTargetList rows={oldStats} />
        </QueryResult>
      </main>
    </>
  )
}

export default RatingTarget
