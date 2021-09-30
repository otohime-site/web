import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import {
  Alert,
  Tab,
  Tabs,
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"
import { green, orange, red, deepPurple, purple } from "@mui/material/colors"
import { styled } from "@mui/material/styles"
import { formatRelative } from "date-fns"
import { zhTW } from "date-fns/locale"
import { FunctionComponent } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "urql"
import { useAuth } from "../auth"
import {
  DxIntlSongsDocument,
  DxIntlPlayersTimelinesDocument,
  DxIntlPlayerWithTimelineDocument,
  DxIntlPlayerWithTimelineQuery,
  Dx_Intl_Scores,
} from "../generated/graphql"
import { gradeNames } from "./Grade"
import { ActualScore, FlagContainer } from "./Player"
import { classRankNames, courseRankNames } from "./Ranks"
import Variant from "./Variant"
import { ComboFlag, SyncFlag } from "./flags"
import { difficulties, FlattenedNote, getNoteHash } from "./helper"

interface FlattenNodeWithBeforeAfter extends FlattenedNote {
  before?: Pick<Dx_Intl_Scores, "score" | "combo_flag" | "sync_flag">
  after?: Pick<Dx_Intl_Scores, "score" | "combo_flag" | "sync_flag">
}

const StyledTable = styled(Table)(
  ({ theme }) => `
  .MuiTableCell-root {
    font-family: "M PLUS 1p";
    padding: 8px;
  }
  .MuiTableCell-head {
    font-weight: 700;
  }
  table-layout: fixed;

  ${theme.breakpoints.down("md")} {
    thead {
      display: none;
    }

    tr,
    th,
    td {
      display: block;
    }
    tr {
      clear: left;
      margin-top: 0.5em;
      border-bottom: 1px solid #cccccc;
    }
    th,
    td {
      float: left;
      border-bottom: none;
    }
  }
`
)
const FirstCol = styled("col")(
  ({ theme }) => `
  ${theme.breakpoints.down("md")} {
    width: 100%;
  }
`
)
const DxCol = styled("col")(
  ({ theme }) => `
  width: 2.2em;
  ${theme.breakpoints.down("md")} {
    width: 0;
  }
`
)
const DiffCol = styled("col")(
  ({ theme }) => `
  width: 5em;
  ${theme.breakpoints.down("md")} {
    width: 0;
  }
`
)
const ArrowCol = styled("col")(
  ({ theme }) => `
  width: 3em;
  ${theme.breakpoints.down("md")} {
    width: 0;
  }
`
)
const BACol = styled("col")(
  ({ theme }) => `
  ${theme.breakpoints.down("md")} {
    width: 0;
  }
`
)

const DiffCell = styled(TableCell)`
  font-size: 85%;
  text-transform: uppercase;
  &.difficulty-0 {
    color: ${green[700]};
  }
  &.difficulty-1 {
    color: ${orange[700]};
  }
  &.difficulty-2 {
    color: ${red[700]};
  }
  &.difficulty-3 {
    color: ${deepPurple[700]};
  }
  &.difficulty-4 {
    color: ${purple[700]};
  }
`

const BeforeCell = styled(TableCell)`
  clear: left;
`

const BeforeAfterContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 10em;
`

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
  const params = useParams<{ nickname: string; hash?: string }>()
  const [songsResult] = useQuery({
    query: DxIntlSongsDocument,
    pause: params.hash === null,
  })
  const [timelinesResult] = useQuery({
    query: DxIntlPlayersTimelinesDocument,
    variables: { nickname: params.nickname },
    pause: loading,
  })
  const [timelineResult] = useQuery({
    query: DxIntlPlayerWithTimelineDocument,
    variables: {
      nickname: params.nickname,
      time: hashToDateString(params.hash ?? ""),
    },
    pause: loading || params.hash == null || params.hash.length === 0,
  })
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

  const notes: Map<string, FlattenNodeWithBeforeAfter> =
    params.hash != null && songsResult.data != null
      ? new Map(
          songsResult.data.dx_intl_songs.reduce<Array<[string, FlattenedNote]>>(
            (accr, song) => [
              ...accr,
              ...song.dx_intl_variants.reduce<Array<[string, FlattenedNote]>>(
                (accrInner, variant) => [
                  ...accrInner,
                  ...variant.dx_intl_notes.map<[string, FlattenedNote]>(
                    (note) => [
                      getNoteHash({
                        song_id: song.id,
                        deluxe: variant.deluxe,
                        ...note,
                      }),
                      {
                        song_id: song.id,
                        category: song.category,
                        title: song.title,
                        order: song.order,
                        deluxe: variant.deluxe,
                        version: variant.version,
                        active: variant.active,
                        ...note,
                      },
                    ]
                  ),
                ],
                []
              ),
            ],
            []
          )
        )
      : new Map()

  if (timelineResult.data != null) {
    timelineResult.data.beforeScores.forEach((score) => {
      const note = notes.get(
        getNoteHash({
          song_id: score.song_id ?? "",
          deluxe: score.deluxe ?? false,
          difficulty: score.difficulty ?? -1,
        })
      )
      if (score == null || note == null) {
        return
      }
      note.before = {
        score: score.score ?? 0,
        combo_flag: score.combo_flag ?? "",
        sync_flag: score.sync_flag ?? "",
      }
    })
    timelineResult.data.afterScores.forEach((score) => {
      const note = notes.get(
        getNoteHash({
          song_id: score.song_id ?? "",
          deluxe: score.deluxe ?? false,
          difficulty: score.difficulty ?? -1,
        })
      )
      if (score == null || note == null) {
        return
      }
      note.after = {
        score: score.score ?? 0,
        combo_flag: score.combo_flag ?? "",
        sync_flag: score.sync_flag ?? "",
      }
    })
  }

  const recordDiffRows = (
    before?: DxIntlPlayerWithTimelineQuery["beforeRecord"][0],
    after?: DxIntlPlayerWithTimelineQuery["afterRecord"][0]
  ): React.ReactNode => (
    <>
      {before?.card_name !== after?.card_name ? (
        <TableRow>
          <TableCell colSpan={3}>Name</TableCell>
          <BeforeCell>{before?.card_name ?? ""}</BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>{after?.card_name ?? ""}</TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {before?.title !== after?.title ? (
        <TableRow>
          <TableCell colSpan={3}>Title</TableCell>
          <BeforeCell>{before?.title ?? ""}</BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>{after?.title ?? ""}</TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {before?.rating !== after?.rating ? (
        <TableRow>
          <TableCell colSpan={3}>Rating</TableCell>
          <BeforeCell>{before?.rating ?? ""}</BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>{after?.rating ?? ""}</TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {before?.max_rating !== after?.max_rating ? (
        <TableRow>
          <TableCell colSpan={3}>Max Rating</TableCell>
          <BeforeCell>
            {(before?.max_rating ?? 0) >= 0 ? before?.max_rating ?? "" : ""}
          </BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>
            {(after?.max_rating ?? 0) >= 0 ? after?.max_rating ?? "" : ""}
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {before?.grade !== after?.grade ? (
        <TableRow>
          <TableCell colSpan={3}>Grade</TableCell>
          <BeforeCell>{gradeNames[before?.grade ?? 0] ?? ""}</BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>{gradeNames[after?.grade ?? 0] ?? ""}</TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {(before?.course_rank ?? null) !== (after?.course_rank ?? null) ? (
        <TableRow>
          <TableCell colSpan={3}>段位</TableCell>
          <BeforeCell>
            {before?.course_rank != null
              ? courseRankNames[before.course_rank] ?? ""
              : ""}
          </BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>
            {after?.course_rank != null
              ? courseRankNames[after.course_rank] ?? ""
              : ""}
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
      {(before?.class_rank ?? null) !== (after?.class_rank ?? null) ? (
        <TableRow>
          <TableCell colSpan={3}>對戰階級</TableCell>
          <BeforeCell>
            {before?.class_rank != null
              ? classRankNames[before.class_rank] ?? ""
              : ""}
          </BeforeCell>
          <TableCell>
            <ArrowForwardIcon />
          </TableCell>
          <TableCell>
            {after?.class_rank != null
              ? classRankNames[after.class_rank] ?? ""
              : ""}
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  )

  const showTimelineResult = (
    data: DxIntlPlayerWithTimelineQuery
  ): React.ReactNode => (
    <StyledTable>
      <colgroup>
        <FirstCol />
        <DxCol />
        <DiffCol />
        <BACol />
        <ArrowCol />
        <BACol />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableCell component="th" colSpan={3}>
            項目
          </TableCell>
          <TableCell component="th">Before</TableCell>
          <TableCell component="th"></TableCell>
          <TableCell component="th">After</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.beforeRecord.length > 0 || data.afterRecord.length > 0 ? (
          recordDiffRows(data.beforeRecord[0], data.afterRecord[0])
        ) : (
          <></>
        )}
        {[...notes.values()]
          .filter((note) => note.before != null || note.after != null)
          .map((note) => (
            <TableRow key={getNoteHash(note)}>
              <TableCell component="th">{note.title}</TableCell>
              <TableCell>
                <Variant deluxe={note.deluxe} />
              </TableCell>
              <DiffCell className={`difficulty-${note.difficulty}`}>
                {difficulties[note.difficulty].substr(0, 3)} {note.level}
              </DiffCell>
              <BeforeCell>
                {note.before != null ? (
                  <BeforeAfterContainer>
                    <ActualScore>{note.before.score.toFixed(4)}%</ActualScore>
                    <FlagContainer>
                      <ComboFlag flag={note.before.combo_flag} />
                      <SyncFlag flag={note.before.sync_flag} />
                    </FlagContainer>
                  </BeforeAfterContainer>
                ) : (
                  <BeforeAfterContainer />
                )}
              </BeforeCell>
              <TableCell>
                <ArrowForwardIcon />
              </TableCell>
              <TableCell>
                {note.after != null ? (
                  <BeforeAfterContainer>
                    <ActualScore>{note.after.score.toFixed(4)}%</ActualScore>
                    <FlagContainer>
                      <ComboFlag flag={note.after.combo_flag} />
                      <SyncFlag flag={note.after.sync_flag} />
                    </FlagContainer>
                  </BeforeAfterContainer>
                ) : (
                  <BeforeAfterContainer />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </StyledTable>
  )
  return (
    <>
      <Helmet>
        <title>成績單歷史紀錄 - Otohime</title>
      </Helmet>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        component={RouterLink}
        to={`/dxi/p/${params.nickname}`}
      >
        回成績單
      </Button>
      <Tabs
        value={params?.hash ?? false}
        variant="scrollable"
        scrollButtons
        indicatorColor="primary"
        textColor="primary"
        allowScrollButtonsMobile
      >
        {outerTimelines.timelines.map((time) => (
          <Tab
            key={dateStringToHash(time)}
            value={dateStringToHash(time)}
            label={formatRelative(new Date(time), new Date(), { locale: zhTW })}
            component={RouterLink}
            to={`/dxi/p/${params.nickname}/history/${dateStringToHash(time)}`}
          />
        ))}
      </Tabs>
      {params.hash == null ? (
        <Card>
          <CardContent>請選擇一個時間檢視該時間的歷程。</CardContent>
        </Card>
      ) : timelineResult.data == null ? (
        <></>
      ) : (
        showTimelineResult(timelineResult.data)
      )}
    </>
  )
}

export default PlayerHistory
