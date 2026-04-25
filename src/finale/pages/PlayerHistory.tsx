import { ResponsiveLine } from "@nivo/line"
import clsx from "clsx"
import { useMemo } from "react"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import IconArrowBack from "~icons/mdi/arrow-back"
import IconNavigateNext from "~icons/mdi/navigate-next"

import { navigate } from "wouter/use-browser-location"
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { formatDateTime } from "../../common/utils/datetime"
import { ResultOf, graphql, readFragment } from "../../graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
import tableClasses from "../components/PlayerScoreTable.module.css"
import { flatSongsResult, getNoteHash } from "../models/aggregation"
import {
  classNames,
  comboFlags,
  difficulties,
  syncFlags,
} from "../models/constants"
import {
  finaleRecordsWithHistoryFields,
  finaleScoresWithHistoryFields,
} from "../models/fragments"
import { finaleSongsDocument } from "../models/queries"
import classes from "./PlayerHistory.module.css"

const finalePlayersTimelinesDocument = graphql(`
  query finalePlayersTimelines($nickname: String!) {
    finale_players_timelines(where: { nickname: { _eq: $nickname } }) {
      timelines
    }
  }
`)

const finalePlayerRatingGraphDocument = graphql(`
  query finalePlayerRatingGraph($nickname: String!) {
    finale_records_with_history(
      where: { finale_player: { nickname: { _eq: $nickname } } }
      order_by: { start: asc }
    ) {
      start
      rating
    }
  }
`)

const finalePlayerWithTimelineDocument = graphql(
  `
    query finalePlayerWithTimeline($nickname: String!, $time: timestamptz!) {
      beforeRecord: finale_records_with_history(
        where: {
          finale_player: { nickname: { _eq: $nickname } }
          end: { _eq: $time }
        }
      ) {
        ...finaleRecordsWithHistoryFields
      }
      afterRecord: finale_records_with_history(
        where: {
          finale_player: { nickname: { _eq: $nickname } }
          start: { _eq: $time }
        }
      ) {
        ...finaleRecordsWithHistoryFields
      }
      beforeScores: finale_scores_with_history(
        where: {
          finale_player: { nickname: { _eq: $nickname } }
          end: { _eq: $time }
        }
      ) {
        ...finaleScoresWithHistoryFields
      }
      afterScores: finale_scores_with_history(
        where: {
          finale_player: { nickname: { _eq: $nickname } }
          start: { _eq: $time }
        }
      ) {
        ...finaleScoresWithHistoryFields
      }
    }
  `,
  [finaleRecordsWithHistoryFields, finaleScoresWithHistoryFields],
)

interface HistoryEntry {
  score: number
  combo_flag: (typeof comboFlags)[number]
  sync_flag: (typeof syncFlags)[number]
}

// Deal with timestamp precision for Postgres and JavaScript
const dateStringToHash = (str: string): string => {
  const decimalPart = parseInt(
    (str.match(/\.([0-9]+)/) ?? ["0"])[1].padEnd(6, "0"),
    10,
  )
  const withoutDecimalPartTime = new Date(
    str.replace(/\.([0-9]+)/, ""),
  ).getTime()
  const resultTime = withoutDecimalPartTime * 1000 + decimalPart
  return resultTime.toString(36)
}

const hashToDateString = (hash: string): string => {
  const resultTime = parseInt(hash, 36)
  if (isNaN(resultTime)) return ""
  const withoutDecimalPartTime = Math.floor(resultTime / 1000000) * 1000
  const decimalPart = resultTime % 1000000
  const intermediateStr = new Date(withoutDecimalPartTime).toISOString()
  const resultStr = intermediateStr.replace(
    /\.[0-9]+Z/,
    `.${decimalPart.toString(10).padStart(6, "0")}+00:00`,
  )
  return resultStr
}

const PlayerHistory = ({ params }: { params: Params }) => {
  const [songsResult] = useQuery({
    query: finaleSongsDocument,
    pause: params.hash === null,
  })
  const [timelinesResult] = useQuery({
    query: finalePlayersTimelinesDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [ratingGraphResult] = useQuery({
    query: finalePlayerRatingGraphDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [timelineResult] = useQuery({
    query: finalePlayerWithTimelineDocument,
    variables: {
      nickname: params.nickname ?? "",
      time: hashToDateString(params.hash ?? ""),
    },
    pause: params.hash == null || params.hash.length === 0,
  })

  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )

  const { beforeMap, afterMap } = useMemo(() => {
    const beforeScores = readFragment(
      finaleScoresWithHistoryFields,
      timelineResult.data?.beforeScores ?? [],
    )
    const afterScores = readFragment(
      finaleScoresWithHistoryFields,
      timelineResult.data?.afterScores ?? [],
    )
    const beforeMap: Map<string, HistoryEntry> = new Map(
      beforeScores.map((score) => [
        getNoteHash({
          song_id: score.song_id ?? -1,
          difficulty: score.difficulty ?? -1,
        }),
        {
          score: score.score ?? 0,
          combo_flag: score.combo_flag ?? "",
          sync_flag: score.sync_flag ?? "",
        },
      ]),
    )
    const afterMap: Map<string, HistoryEntry> = new Map(
      afterScores.map((score) => [
        getNoteHash({
          song_id: score.song_id ?? -1,
          difficulty: score.difficulty ?? -1,
        }),
        {
          score: score.score ?? 0,
          combo_flag: score.combo_flag ?? "",
          sync_flag: score.sync_flag ?? "",
        },
      ]),
    )

    return {
      beforeMap,
      afterMap,
    }
  }, [timelineResult])

  if (timelinesResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (timelinesResult.data == null) {
    return <></>
  }
  const outerTimelines = timelinesResult.data.finale_players_timelines[0]
  if (outerTimelines == null || outerTimelines.timelines == null) {
    return (
      <Alert severity="warning">
        沒有歷史紀錄。可能是還沒有上傳成績，或著成績單的隱私設定為「私人」。
      </Alert>
    )
  }

  const recordDiffs = (
    before?: ResultOf<typeof finaleRecordsWithHistoryFields>,
    after?: ResultOf<typeof finaleRecordsWithHistoryFields>,
  ): { item: string; before: string; after: string }[] => {
    const results = []
    if (before?.card_name !== after?.card_name) {
      results.push({
        item: "卡名",
        before: before?.card_name ?? "",
        after: after?.card_name ?? "",
      })
    }
    if (before?.title !== after?.title) {
      results.push({
        item: "稱號",
        before: before?.title ?? "",
        after: after?.title ?? "",
      })
    }
    if (before?.rating != after?.rating) {
      results.push({
        item: "Rating",
        before: `${before?.rating ?? ""}`,
        after: `${after?.rating ?? ""}`,
      })
    }
    if (
      before?.max_rating != after?.max_rating &&
      (after?.max_rating ?? 0) >= 0
    ) {
      results.push({
        item: "Max Rating",
        before:
          (before?.max_rating ?? 0) >= 0 ? `${before?.max_rating ?? ""}` : "",
        after:
          (after?.max_rating ?? 0) >= 0 ? `${after?.max_rating ?? ""}` : "",
      })
    }
    if (before?.class !== after?.class && after?.class != null) {
      results.push({
        item: "段位",
        before: before?.class != null ? (classNames[before.class] ?? "") : "",
        after: after?.class != null ? (classNames[after.class] ?? "") : "",
      })
    }
    return results
  }

  const showTimelineResult = (
    data: ResultOf<typeof finalePlayerWithTimelineDocument>,
  ): React.ReactNode => (
    <table className={clsx(classes.table)}>
      <colgroup>
        <col className={tableClasses["col-title"]} />
        <col className={tableClasses["col-score"]} />
        <col className={tableClasses["col-flags"]} />
        <col className={classes["col-arrow"]} />
        <col className={tableClasses["col-score"]} />
        <col className={tableClasses["col-flags"]} />
      </colgroup>
      <thead>
        <tr>
          <th>項目</th>
          <th colSpan={2}>Before</th>
          <th></th>
          <th colSpan={2}>After</th>
        </tr>
      </thead>
      <tbody>
        {data.beforeRecord.length > 0 || data.afterRecord.length > 0 ? (
          recordDiffs(
            readFragment(finaleRecordsWithHistoryFields, data.beforeRecord[0]),
            readFragment(finaleRecordsWithHistoryFields, data.afterRecord[0]),
          ).map((entry) => (
            <tr key={entry.item}>
              <td
                className={clsx(tableClasses["col-title"], classes["col-item"])}
              >
                {entry.item}
              </td>
              <td colSpan={2} className={classes["col-value"]}>
                {entry.before}
              </td>
              <td className={classes["col-arrow"]}>
                <IconNavigateNext />
              </td>
              <td colSpan={2} className={classes["col-value"]}>
                {entry.after}
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
        {flattedEntries
          .filter(
            (entry) => beforeMap.has(entry.hash) || afterMap.has(entry.hash),
          )
          .map((entry) => {
            const before = beforeMap.get(entry.hash)
            const after = afterMap.get(entry.hash)
            return (
              <tr key={entry.hash}>
                <td
                  className={clsx(
                    tableClasses["col-title"],
                    classes["col-item"],
                  )}
                >
                  <div>
                    <span>{entry.title}</span>
                    <span>
                      <span
                        className={clsx(
                          classes["col-level-diff"],
                          tableClasses[
                            `difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4 | 5}`
                          ],
                          entry.level.includes("+")
                            ? tableClasses["plus"]
                            : tableClasses["non-plus"],
                        )}
                      >
                        {difficulties[entry.difficulty].slice(0, 3)}{" "}
                        {entry.level}
                      </span>
                    </span>
                  </div>
                </td>
                <td className={tableClasses["col-score"]}>
                  {before ? `${before.score.toFixed(2)}%` : ""}
                </td>
                <td className={tableClasses["col-flags"]}>
                  {before ? (
                    <>
                      <ComboFlag flag={before.combo_flag} />
                      <SyncFlag flag={before.sync_flag} />
                    </>
                  ) : null}
                </td>
                <td className={classes["col-arrow"]}>
                  <IconNavigateNext />
                </td>
                <td className={tableClasses["col-score"]}>
                  {after ? `${after.score.toFixed(2)}%` : ""}
                </td>
                <td className={tableClasses["col-flags"]}>
                  {after ? (
                    <>
                      <ComboFlag flag={after.combo_flag} />
                      <SyncFlag flag={after.sync_flag} />
                    </>
                  ) : null}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
  return (
    <>
      <Titled title={(title) => `成績單歷史紀錄 - ${title}`} />
      <LinkButton href={`~/fin/p/${params.nickname}`}>
        <IconArrowBack /> 回成績單
      </LinkButton>
      <ScrollableSegmentGroupRoot
        value={params.hash ?? ""}
        onValueChange={({ value }) => {
          navigate(`/fin/p/${params.nickname}/history/${value}`)
        }}
      >
        {outerTimelines.timelines.map((time) => (
          <SegmentGroupItem key={time} value={dateStringToHash(time)}>
            {formatDateTime(new Date(time))}
          </SegmentGroupItem>
        ))}
      </ScrollableSegmentGroupRoot>
      {params.hash == null ? (
        <div>
          請選擇一個時間檢視該時間的歷程。
          {ratingGraphResult.data?.finale_records_with_history != null ? (
            <div style={{ height: "40vh" }}>
              <ResponsiveLine
                colors={{ scheme: "category10" }}
                margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
                data={[
                  {
                    id: "Rating",
                    data: ratingGraphResult.data.finale_records_with_history.map(
                      (record) => ({
                        x: record.start,
                        y: record.rating,
                      }),
                    ),
                  },
                ]}
                xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S.%f%Z" }}
                yScale={{ type: "linear", min: "auto", max: 20 }}
                xFormat={"time:%Y-%m-%d"}
                axisBottom={{
                  format: "%Y-%m-%d",
                }}
                useMesh={true}
              />
            </div>
          ) : null}
        </div>
      ) : timelineResult.data == null ? (
        <></>
      ) : (
        showTimelineResult(timelineResult.data)
      )}
    </>
  )
}

export default PlayerHistory
