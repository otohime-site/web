import {
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import "chartjs-adapter-date-fns"
import clsx from "clsx"
import { useMemo } from "react"
import { Tab, TabPanel, Tabs } from "react-aria-components"
import { Line } from "react-chartjs-2"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import IconArrowBack from "~icons/mdi/arrow-back"
import IconNavigateNext from "~icons/mdi/navigate-next"

import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableTabList } from "../../common/components/ui/ScrollableTabList"
import { formatDateTime } from "../../common/utils/datetime"
import { ResultOf, graphql, readFragment } from "../../graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"
import { flatSongsResult, getNoteHash } from "../models/aggregation"
import {
  classRankNames,
  difficulties,
  gradeNames,
  legacyCourseRankNames,
} from "../models/constants"
import {
  dxIntlRecordsWithHistoryFields,
  dxIntlScoresWithHistoryFields,
} from "../models/fragments"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./PlayerHistory.module.css"

Chart.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const dxIntlPlayersTimelinesDocument = graphql(`
  query dxIntlPlayersTimelines($nickname: String!) {
    dx_intl_players_timelines(where: { nickname: { _eq: $nickname } }) {
      timelines
    }
  }
`)

const dxIntlPlayerRatingGraphDocument = graphql(`
  query dxIntlPlayerRatingGraph($nickname: String!) {
    dx_intl_records_with_history(
      where: { dx_intl_player: { nickname: { _eq: $nickname } } }
      order_by: { start: asc }
    ) {
      start
      rating
    }
  }
`)

const dxIntlPlayerWithTimelineDocument = graphql(
  `
    query dxIntlPlayerWithTimeline($nickname: String!, $time: timestamptz!) {
      beforeRecord: dx_intl_records_with_history(
        where: {
          dx_intl_player: { nickname: { _eq: $nickname } }
          end: { _eq: $time }
        }
      ) {
        ...dxIntlRecordsWithHistoryFields
      }
      afterRecord: dx_intl_records_with_history(
        where: {
          dx_intl_player: { nickname: { _eq: $nickname } }
          start: { _eq: $time }
        }
      ) {
        ...dxIntlRecordsWithHistoryFields
      }
      beforeScores: dx_intl_scores_with_history(
        where: {
          dx_intl_player: { nickname: { _eq: $nickname } }
          end: { _eq: $time }
        }
      ) {
        ...dxIntlScoresWithHistoryFields
      }
      afterScores: dx_intl_scores_with_history(
        where: {
          dx_intl_player: { nickname: { _eq: $nickname } }
          start: { _eq: $time }
        }
      ) {
        ...dxIntlScoresWithHistoryFields
      }
    }
  `,
  [dxIntlRecordsWithHistoryFields, dxIntlScoresWithHistoryFields],
)

interface HistoryEntry {
  score: number
  combo_flag: "" | "fc" | "fc+" | "ap" | "ap+"
  sync_flag: "" | "s" | "fs" | "fs+" | "fdx" | "fdx+"
}

// Deal with precision for Postgres...
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
    query: dxIntlSongsDocument,
    pause: params.hash === null,
  })
  const [timelinesResult] = useQuery({
    query: dxIntlPlayersTimelinesDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [ratingGraphResult] = useQuery({
    query: dxIntlPlayerRatingGraphDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [timelineResult] = useQuery({
    query: dxIntlPlayerWithTimelineDocument,
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
      dxIntlScoresWithHistoryFields,
      timelineResult.data?.beforeScores ?? [],
    )
    const afterScores = readFragment(
      dxIntlScoresWithHistoryFields,
      timelineResult.data?.afterScores ?? [],
    )
    const beforeMap: Map<string, HistoryEntry> = new Map(
      beforeScores.map((score) => [
        getNoteHash({
          song_id: score.song_id ?? "",
          deluxe: score.deluxe ?? false,
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
          song_id: score.song_id ?? "",
          deluxe: score.deluxe ?? false,
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
  const outerTimelines = timelinesResult.data.dx_intl_players_timelines[0]
  if (outerTimelines == null || outerTimelines.timelines == null) {
    return (
      <Alert severity="warning">
        沒有歷史紀錄。可能是還沒有上傳成績，或著成績單的隱私設定為「私人」。
      </Alert>
    )
  }

  const recordDiffs = (
    before?: ResultOf<typeof dxIntlRecordsWithHistoryFields>,
    after?: ResultOf<typeof dxIntlRecordsWithHistoryFields>,
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
    if (before?.grade !== after?.grade && after?.grade != null) {
      results.push({
        item: "舊版段位",
        before: before?.grade != null ? (gradeNames[before?.grade] ?? "") : "",
        after: after?.grade != null ? (gradeNames[after?.grade] ?? "") : "",
      })
    }
    if (
      before?.course_rank !== after?.course_rank &&
      after?.course_rank != null
    ) {
      results.push({
        item: "段位",
        before:
          before?.course_rank != null
            ? (legacyCourseRankNames[before?.course_rank] ?? "")
            : "",
        after:
          after?.course_rank != null
            ? (legacyCourseRankNames[after?.course_rank] ?? "")
            : "",
      })
    }
    if (before?.class_rank !== after?.class_rank && after?.class_rank != null) {
      results.push({
        item: "對戰階級",
        before:
          before?.class_rank != null
            ? (classRankNames[before.class_rank] ?? "")
            : "",
        after:
          after?.class_rank != null
            ? (classRankNames[after.class_rank] ?? "")
            : "",
      })
    }
    return results
  }

  const showTimelineResult = (
    data: ResultOf<typeof dxIntlPlayerWithTimelineDocument>,
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
            readFragment(dxIntlRecordsWithHistoryFields, data.beforeRecord[0]),
            readFragment(dxIntlRecordsWithHistoryFields, data.afterRecord[0]),
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
                      <Variant deluxe={entry.deluxe} />
                      <span
                        className={clsx(
                          classes["col-level-diff"],
                          tableClasses[
                            `difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4}`
                          ],
                          entry.internal_lv
                            ? ""
                            : entry.level.includes("+")
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
                  {before ? `${before.score.toFixed(4)}%` : ""}
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
                  {after ? `${after.score.toFixed(4)}%` : ""}
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
      <LinkButton href={`/dxi/p/${params.nickname}`}>
        <IconArrowBack /> 回成績單
      </LinkButton>
      <Tabs selectedKey={params.hash ?? ""}>
        <ScrollableTabList
          items={outerTimelines.timelines.map((time) => ({ time }))}
        >
          {({ time }) => (
            <Tab
              href={`/dxi/p/${params.nickname}/history/${dateStringToHash(time)}`}
              key={time}
              id={dateStringToHash(time)}
            >
              {formatDateTime(new Date(time))}
            </Tab>
          )}
        </ScrollableTabList>
        <TabPanel id={params.hash ?? ""}>
          {params.hash == null ? (
            <div>
              請選擇一個時間檢視該時間的歷程。
              {ratingGraphResult.data?.dx_intl_records_with_history != null ? (
                <div style={{ height: "40vh" }}>
                  <Line
                    data={{
                      labels:
                        ratingGraphResult.data.dx_intl_records_with_history.map(
                          (record) => record.start,
                        ),

                      datasets: [
                        {
                          label: "Rating",
                          data: ratingGraphResult.data.dx_intl_records_with_history.map(
                            (record) => record.rating,
                          ),
                          borderColor: "rgb(112, 72, 232)",
                          backgroundColor: "rgba(112, 72, 232, 0.2)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          type: "time",
                        },
                      },
                    }}
                  />
                </div>
              ) : null}
            </div>
          ) : timelineResult.data == null ? (
            <></>
          ) : (
            showTimelineResult(timelineResult.data)
          )}
        </TabPanel>
      </Tabs>
    </>
  )
}

export default PlayerHistory
