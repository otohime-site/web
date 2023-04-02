import { FunctionComponent, useMemo } from "react"
import { MdArrowBack, MdNavigateNext } from "react-icons/md"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { useAuth } from "../../auth"
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { formatDateTime } from "../../common/utils"
import {
  DxIntlPlayersTimelinesDocument,
  DxIntlPlayerWithTimelineDocument,
  DxIntlPlayerWithTimelineQuery,
  DxIntlSongsDocument,
  Dx_Intl_Scores,
} from "../../generated/graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
import Variant from "../components/Variant"
import { getNoteHash, prepareSongs, VariantEntry } from "../helper"
import {
  classRankNames,
  difficulties,
  gradeNames,
  legacyCourseRankNames,
} from "../models/constants"
import classes from "./PlayerHistory.module.css"

type HistoryEntry = Pick<Dx_Intl_Scores, "score" | "combo_flag" | "sync_flag">

// Deal with precision for Postgres...
const dateStringToHash = (str: string): string => {
  const decimalPart = parseInt(
    (str.match(/\.([0-9]+)/) ?? ["0"])[1].padEnd(6, "0"),
    10
  )
  const withoutDecimalPartTime = new Date(
    str.replace(/\.([0-9]+)/, "")
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
    `.${decimalPart.toString(10).padStart(6, "0")}+00:00`
  )
  return resultStr
}

const PlayerHistory: FunctionComponent = () => {
  const [, loading] = useAuth()
  const params = useParams<"nickname" | "hash">()
  const [songsResult] = useQuery({
    query: DxIntlSongsDocument,
    pause: params.hash === null,
  })
  const [timelinesResult] = useQuery({
    query: DxIntlPlayersTimelinesDocument,
    variables: { nickname: params.nickname ?? "" },
    pause: loading,
  })
  const [timelineResult] = useQuery({
    query: DxIntlPlayerWithTimelineDocument,
    variables: {
      nickname: params.nickname ?? "",
      time: hashToDateString(params.hash ?? ""),
    },
    pause: loading || params.hash == null || params.hash.length === 0,
  })

  // Arrange variants
  const entries = useMemo<VariantEntry[]>(() => {
    if (songsResult.error != null || songsResult.data == null) {
      return []
    }
    const { variantEntries } = prepareSongs(songsResult.data.dx_intl_songs)
    return variantEntries.reduce<VariantEntry[]>((prev, entry) => {
      const { notes, ...restEntry } = entry
      return [
        ...prev,
        ...notes.map((note) => ({
          ...restEntry,
          notes: [note],
        })),
      ]
    }, [])
  }, [songsResult])

  const { beforeMap, afterMap } = useMemo(() => {
    const beforeMap: Map<string, HistoryEntry> = new Map(
      (timelineResult.data?.beforeScores ?? []).map((score) => [
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
      ])
    )
    const afterMap: Map<string, HistoryEntry> = new Map(
      (timelineResult.data?.afterScores ?? []).map((score) => [
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
      ])
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

  const recordDiffRows = (
    before?: DxIntlPlayerWithTimelineQuery["beforeRecord"][0],
    after?: DxIntlPlayerWithTimelineQuery["afterRecord"][0]
  ): React.ReactNode => (
    <>
      {before?.card_name !== after?.card_name ? (
        <tr>
          <td colSpan={3}>Name</td>
          <td>{before?.card_name ?? ""}</td>
          <td>
            <MdNavigateNext />
          </td>
          <td>{after?.card_name ?? ""}</td>
        </tr>
      ) : (
        <></>
      )}
      {before?.title !== after?.title ? (
        <tr>
          <td colSpan={3}>Title</td>
          <td>{before?.title ?? ""}</td>
          <td>
            <MdNavigateNext />
          </td>
          <td>{after?.title ?? ""}</td>
        </tr>
      ) : (
        <></>
      )}
      {before?.rating !== after?.rating ? (
        <tr>
          <td colSpan={3}>Rating</td>
          <td>{before?.rating ?? ""}</td>
          <td>
            <MdNavigateNext />
          </td>
          <td>{after?.rating ?? ""}</td>
        </tr>
      ) : (
        <></>
      )}
      {before?.max_rating !== after?.max_rating ? (
        <tr>
          <td colSpan={3}>Max Rating</td>
          <td>
            {(before?.max_rating ?? 0) >= 0 ? before?.max_rating ?? "" : ""}
          </td>
          <td>
            <MdNavigateNext />
          </td>
          <td>
            {(after?.max_rating ?? 0) >= 0 ? after?.max_rating ?? "" : ""}
          </td>
        </tr>
      ) : (
        <></>
      )}
      {before?.grade !== after?.grade ? (
        <tr>
          <td colSpan={3}>Grade</td>
          <td>{gradeNames[before?.grade ?? 0] ?? ""}</td>
          <td>
            <MdNavigateNext />
          </td>
          <td>{gradeNames[after?.grade ?? 0] ?? ""}</td>
        </tr>
      ) : (
        <></>
      )}
      {(before?.course_rank ?? null) !== (after?.course_rank ?? null) ? (
        <tr>
          <td colSpan={3}>段位</td>
          <td>
            {before?.course_rank != null
              ? legacyCourseRankNames[before.course_rank] ?? ""
              : ""}
          </td>
          <td>
            <MdNavigateNext />
          </td>
          <td>
            {after?.course_rank != null
              ? legacyCourseRankNames[after.course_rank] ?? ""
              : ""}
          </td>
        </tr>
      ) : (
        <></>
      )}
      {(before?.class_rank ?? null) !== (after?.class_rank ?? null) ? (
        <tr>
          <td colSpan={3}>對戰階級</td>
          <td>
            {before?.class_rank != null
              ? classRankNames[before.class_rank] ?? ""
              : ""}
          </td>
          <td>
            <MdNavigateNext />
          </td>
          <td>
            {after?.class_rank != null
              ? classRankNames[after.class_rank] ?? ""
              : ""}
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  )

  const showTimelineResult = (
    data: DxIntlPlayerWithTimelineQuery
  ): React.ReactNode => (
    <table className={classes.table}>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={3}>項目</th>
          <th>Before</th>
          <th></th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        {data.beforeRecord.length > 0 || data.afterRecord.length > 0 ? (
          recordDiffRows(data.beforeRecord[0], data.afterRecord[0])
        ) : (
          <></>
        )}
        {entries
          .filter((entry) => {
            const hash = entry.notes[0].hash
            return beforeMap.has(hash) || afterMap.has(hash)
          })
          .map((entry) => {
            const note = entry.notes[0]
            const before = beforeMap.get(note.hash)
            const after = afterMap.get(note.hash)
            return (
              <tr key={note.hash}>
                <th>{entry.title}</th>
                <td>
                  <Variant deluxe={entry.deluxe} />
                </td>
                <td
                  className={`${classes["diff"]} ${
                    classes["diff" + note.difficulty]
                  }`}
                >
                  {difficulties[note.difficulty].slice(0, 3)} {note.level}
                </td>
                <td>
                  {before != null ? (
                    <div className={classes.container}>
                      <span className={classes.score}>
                        {before.score.toFixed(4)}%
                      </span>
                      <span className={classes.flags}>
                        <ComboFlag flag={before.combo_flag} />
                        <SyncFlag flag={before.sync_flag} />
                      </span>
                    </div>
                  ) : (
                    <div className={classes.container} />
                  )}
                </td>
                <td>
                  <MdNavigateNext />
                </td>
                <td>
                  {after != null ? (
                    <div className={classes.container}>
                      <span className={classes.score}>
                        {after.score.toFixed(4)}%
                      </span>
                      <span className={classes.flags}>
                        <ComboFlag flag={after.combo_flag} />
                        <SyncFlag flag={after.sync_flag} />
                      </span>
                    </div>
                  ) : (
                    <div className={classes.container} />
                  )}
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
      <LinkButton to={`/dxi/p/${params.nickname}`} variant="violet">
        <MdArrowBack /> 回成績單
      </LinkButton>
      <div>
        {outerTimelines.timelines.map((time) => (
          <Link
            to={`/dxi/p/${params.nickname}/history/${dateStringToHash(time)}`}
            key={time}
          >
            {formatDateTime(new Date(time))}
          </Link>
        ))}
      </div>
      {params.hash == null ? (
        <div>請選擇一個時間檢視該時間的歷程。</div>
      ) : timelineResult.data == null ? (
        <></>
      ) : (
        showTimelineResult(timelineResult.data)
      )}
    </>
  )
}

export default PlayerHistory