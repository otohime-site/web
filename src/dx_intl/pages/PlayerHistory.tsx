import clsx from "clsx"
import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Link, Params } from "wouter"
import IconNavigateNext from "~icons/mdi/navigate-next"

import { navigate } from "wouter/use-browser-location"
import { Alert } from "../../common/components/ui/Alert"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import "../../common/utils/chartSetup"
import { formatDateTime } from "../../common/utils/datetime"
import { ResultOf, graphql, readFragment } from "../../graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"
import {
  flatSongsResult,
  getCoverUrl,
  getNoteHash,
} from "../models/aggregation"
import {
  classRankNames,
  comboFlags,
  difficulties,
  gradeNames,
  legacyCourseRankNames,
  syncFlags,
} from "../models/constants"
import {
  dxIntlRecordsWithHistoryFields,
  dxIntlScoresWithHistoryFields,
} from "../models/fragments"
import { dxIntlSongsDocument } from "../models/queries"
import { getDifficultyClassName } from "../utils/styling"
import classes from "./PlayerHistory.module.css"

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
  combo_flag: (typeof comboFlags)[number]
  sync_flag: (typeof syncFlags)[number]
}

const ChangeValue = ({
  before,
  after,
  changed = true,
  className,
}: {
  before: React.ReactNode
  after: React.ReactNode
  changed?: boolean
  className?: string
}) => (
  <span className={clsx(classes["change-value"], className)}>
    {changed ? (
      <>
        <span className={classes["change-before"]}>{before}</span>
        <IconNavigateNext aria-hidden className={classes["change-arrow"]} />
      </>
    ) : null}
    <strong className={classes["change-after"]}>{after}</strong>
  </span>
)

const emptyValue = <span className={classes.empty}>—</span>

const FlagValue = ({
  flag,
  type,
}: {
  flag: HistoryEntry["combo_flag"] | HistoryEntry["sync_flag"] | undefined
  type: "combo" | "sync"
}) => {
  const label = flag ? flag.toUpperCase() : `無 ${type} 標記`
  return (
    <span
      aria-label={label}
      className={classes["flag-value"]}
      role="img"
      title={label}
    >
      {type === "combo" ? (
        <ComboFlag flag={(flag ?? "") as HistoryEntry["combo_flag"]} />
      ) : (
        <SyncFlag flag={(flag ?? "") as HistoryEntry["sync_flag"]} />
      )}
    </span>
  )
}

const ScoreChanges = ({
  before,
  after,
}: {
  before?: HistoryEntry
  after?: HistoryEntry
}) => {
  const scoreChanged = before?.score !== after?.score
  const comboChanged = (before?.combo_flag ?? "") !== (after?.combo_flag ?? "")
  const syncChanged = (before?.sync_flag ?? "") !== (after?.sync_flag ?? "")

  return (
    <div className={classes["score-changes"]}>
      <ChangeValue
        before={before == null ? emptyValue : `${before.score.toFixed(4)}%`}
        after={after == null ? emptyValue : `${after.score.toFixed(4)}%`}
        changed={scoreChanged}
        className={classes["score-change"]}
      />
      <div className={classes["flag-changes"]}>
        <ChangeValue
          before={<FlagValue flag={before?.combo_flag} type="combo" />}
          after={<FlagValue flag={after?.combo_flag} type="combo" />}
          changed={comboChanged}
          className={classes["combo-change"]}
        />
        <span aria-hidden className={classes["flag-divider"]} />
        <ChangeValue
          before={<FlagValue flag={before?.sync_flag} type="sync" />}
          after={<FlagValue flag={after?.sync_flag} type="sync" />}
          changed={syncChanged}
          className={classes["sync-change"]}
        />
      </div>
    </div>
  )
}

const historyEntriesEqual = (
  before?: HistoryEntry,
  after?: HistoryEntry,
): boolean =>
  before?.score === after?.score &&
  before?.combo_flag === after?.combo_flag &&
  before?.sync_flag === after?.sync_flag

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

  const getRecordChanges = (
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
  ): React.ReactNode => {
    const recordChanges = getRecordChanges(
      readFragment(dxIntlRecordsWithHistoryFields, data.beforeRecord[0]),
      readFragment(dxIntlRecordsWithHistoryFields, data.afterRecord[0]),
    )
    const scoreChanges = flattedEntries.filter((entry) => {
      const before = beforeMap.get(entry.hash)
      const after = afterMap.get(entry.hash)
      return (
        (before != null || after != null) && !historyEntriesEqual(before, after)
      )
    })

    if (recordChanges.length === 0 && scoreChanges.length === 0) {
      return <p className={classes.empty}>這個時間點沒有可顯示的變更。</p>
    }

    return (
      <div className={classes["history-cards"]}>
        {recordChanges.length > 0 ? (
          <article
            className={clsx(
              classes["history-card"],
              classes["record-changes-card"],
            )}
          >
            <dl className={classes["record-changes"]}>
              {recordChanges.map((entry) => (
                <div key={entry.item} className={classes["record-change"]}>
                  <dt>{entry.item}</dt>
                  <dd>
                    <ChangeValue
                      before={entry.before || emptyValue}
                      after={entry.after || emptyValue}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ) : null}
        {scoreChanges.map((entry) => {
          const before = beforeMap.get(entry.hash)
          const after = afterMap.get(entry.hash)
          const songHref = `~/dxi/s/${entry.song_id.substring(0, 8)}/${
            entry.deluxe ? "dx" : "std"
          }/${entry.difficulty}`
          return (
            <article
              key={entry.hash}
              className={clsx(
                classes["history-card"],
                classes["score-change-card"],
              )}
            >
              <Link className={classes["song-summary"]} href={songHref}>
                <img src={getCoverUrl(entry.song_id)} alt="" />
                <span className={classes["song-info"]}>
                  <strong title={entry.title}>{entry.title}</strong>
                  <span className={classes["song-meta"]}>
                    <Variant deluxe={entry.deluxe} />
                    <span
                      className={getDifficultyClassName(
                        tableClasses,
                        entry,
                        classes["song-difficulty"],
                      )}
                    >
                      {difficulties[entry.difficulty]}{" "}
                      {entry.internal_lv
                        ? entry.internal_lv.toFixed(1)
                        : entry.level}
                    </span>
                  </span>
                </span>
              </Link>
              <ScoreChanges before={before} after={after} />
            </article>
          )
        })}
      </div>
    )
  }
  const timelines = outerTimelines.timelines.map((time) => ({
    time,
    hash: dateStringToHash(time),
    label: formatDateTime(new Date(time)),
  }))
  const selectedTimeline = timelines.find(({ hash }) => hash === params.hash)
  const historyHref = (hash: string): string =>
    `/dxi/p/${params.nickname}/history/${hash}`

  const historyContent =
    params.hash == null ? (
      <div>
        <p>請選擇一個時間檢視該時間的歷程。</p>
        {ratingGraphResult.data?.dx_intl_records_with_history != null ? (
          <div className={classes["rating-chart"]}>
            <Line
              data={{
                datasets: [
                  {
                    label: "Rating",
                    borderColor: "#1f77b4",
                    backgroundColor: "#1f77b4",
                    data: ratingGraphResult.data.dx_intl_records_with_history
                      .filter((record) => record.start != null)
                      .map((record) => ({
                        x: new Date(record.start!).getTime(),
                        y: record.rating ?? 0,
                      })),
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                      tooltipFormat: "yyyy-MM-dd",
                      displayFormats: { month: "yyyy-MM" },
                    },
                    ticks: { major: { enabled: true } },
                  },
                  y: { min: 0, max: 16750 },
                },
              }}
            />
          </div>
        ) : null}
      </div>
    ) : timelineResult.data == null ? null : (
      showTimelineResult(timelineResult.data)
    )

  return (
    <>
      <Titled title={(title) => `成績單歷史紀錄 - ${title}`} />
      <div className={classes["history-layout"]}>
        <nav aria-label="歷史紀錄時間" className={classes["timeline-rail"]}>
          <strong>時間</strong>
          {timelines.map(({ time, hash, label }) => (
            <Link
              key={time}
              aria-current={hash === params.hash ? "page" : undefined}
              className={clsx(
                classes["timeline-link"],
                hash === params.hash && classes.active,
              )}
              href={`~${historyHref(hash)}`}
            >
              <time dateTime={time}>{label}</time>
            </Link>
          ))}
        </nav>
        <div className={classes["history-content"]}>
          <div className={classes["mobile-timeline"]}>
            <ScrollableSegmentGroupRoot
              value={params.hash ?? ""}
              onValueChange={({ value }) => {
                if (value != null) navigate(historyHref(value))
              }}
            >
              {timelines.map(({ time, hash, label }) => (
                <SegmentGroupItem key={time} value={hash}>
                  {label}
                </SegmentGroupItem>
              ))}
            </ScrollableSegmentGroupRoot>
          </div>
          {selectedTimeline != null ? (
            <time
              className={classes["mobile-selected-time"]}
              dateTime={selectedTimeline.time}
            >
              {selectedTimeline.label}
            </time>
          ) : null}
          {historyContent}
        </div>
      </div>
    </>
  )
}

export default PlayerHistory
