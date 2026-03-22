import { useMemo, useState } from "react"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"

const dxIntlNewRatingStatsDocument = graphql(`
  query dxIntlNewRatingStats {
    dx_intl_new_rating_stats {
      range
      count
    }
  }
`)

const dxIntlSongTitlesDocument = graphql(`
  query dxIntlSongTitles {
    dx_intl_songs {
      id
      title
    }
  }
`)

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

const RATING_TARGETS = Array.from({ length: 11 }, (_, i) => 14000 + i * 250)
const DIFFICULTY_SHORT = ["BSC", "ADV", "EXP", "MAS", "RE:M"] as const

type StatRow = {
  song_id?: string | null
  current_version?: boolean | null
  deluxe?: boolean | null
  difficulty?: number | null
  count?: number | null
  average_score?: unknown
}

const RatingTargetTable = ({
  rows,
  songTitleMap,
}: {
  rows: StatRow[]
  songTitleMap: Map<string, string>
}) => (
  <table className={tableClasses.table}>
    <colgroup>
      <col className={tableClasses["col-title"]} />
      <col className={tableClasses["col-deluxe"]} />
      <col className={tableClasses["col-difficulty"]} />
      <col className={tableClasses["col-score"]} />
      <col className={tableClasses["col-rating"]} />
    </colgroup>
    <thead>
      <tr>
        <th className={tableClasses["col-title"]}>曲名</th>
        <th className={tableClasses["col-deluxe"]}></th>
        <th className={tableClasses["col-difficulty"]}>難度</th>
        <th className={tableClasses["col-score"]}>平均成績</th>
        <th className={tableClasses["col-rating"]}>人數</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          <td className={tableClasses["col-title"]}>
            {row.song_id ? (songTitleMap.get(row.song_id) ?? row.song_id) : ""}
          </td>
          <td className={tableClasses["col-deluxe"]}>
            {row.deluxe != null && <Variant deluxe={row.deluxe} />}
          </td>
          <td
            className={[
              tableClasses["col-difficulty"],
              row.difficulty != null
                ? tableClasses[
                    `difficulty-${row.difficulty as 0 | 1 | 2 | 3 | 4}`
                  ]
                : "",
            ].join(" ")}
          >
            {row.difficulty != null
              ? (DIFFICULTY_SHORT[row.difficulty] ?? "")
              : ""}
          </td>
          <td className={tableClasses["col-score"]}>
            {row.average_score != null
              ? `${Number(row.average_score).toFixed(4)}%`
              : ""}
          </td>
          <td className={tableClasses["col-rating"]}>{row.count ?? 0}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const Overview = () => {
  const [selectedTarget, setSelectedTarget] = useState(14000)

  const [baseRatingResult] = useQuery({ query: dxIntlNewRatingStatsDocument })
  const [songTitlesResult] = useQuery({ query: dxIntlSongTitlesDocument })
  const [ratingTargetStatsResult] = useQuery({
    query: dxIntlRatingTargetStatsDocument,
    variables: { rating_target: selectedTarget },
  })

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

  const songTitleMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const song of songTitlesResult.data?.dx_intl_songs ?? []) {
      map.set(song.id, song.title)
    }
    return map
  }, [songTitlesResult.data])

  const stats = ratingTargetStatsResult.data?.dx_intl_rating_target_stats ?? []
  const newStats = stats.filter((s) => s.current_version)
  const oldStats = stats.filter((s) => !s.current_version)

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
      <h4>Rating 別 Best 50 組成曲</h4>
      <ScrollableSegmentGroupRoot
        value={String(selectedTarget)}
        onValueChange={({ value }) => {
          if (value) setSelectedTarget(parseInt(value, 10))
        }}
      >
        {RATING_TARGETS.map((t) => (
          <SegmentGroupItem key={t} value={String(t)}>
            {t}
          </SegmentGroupItem>
        ))}
      </ScrollableSegmentGroupRoot>
      <QueryResult result={ratingTargetStatsResult}>
        <h5>新曲</h5>
        <RatingTargetTable rows={newStats} songTitleMap={songTitleMap} />
        <h5>舊曲</h5>
        <RatingTargetTable rows={oldStats} songTitleMap={songTitleMap} />
      </QueryResult>
    </main>
  )
}

export default Overview
