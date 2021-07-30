import {
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  ButtonGroup,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useMediaQuery,
  Theme,
  IconButton,
  Tooltip,
  Hidden,
  Link,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core"
import {
  green,
  orange,
  red,
  deepPurple,
  purple,
} from "@material-ui/core/colors"
import React, { FunctionComponent, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "urql"
import EditIcon from "@material-ui/icons/Edit"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import RefreshIcon from "@material-ui/icons/Refresh"
import EventNoteIcon from "@material-ui/icons/EventNote"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import styled from "@emotion/styled"

import firebase from "firebase/app"
import { Alert } from "@material-ui/lab"
import { useAuth } from "../auth"
import {
  DxIntlRecordWithScoresDocument,
  DxIntlSongsDocument,
  Dx_Intl_Songs,
  Dx_Intl_Variants,
  Dx_Intl_Notes,
  DxIntlPlayersEditableDocument,
} from "../generated/graphql"
import {
  categories,
  versions,
  levels,
  difficulties,
  comboFlags,
  syncFlags,
  FlattenedNote,
  getNoteHash,
  arrangeScoreStats,
  arrangeComboStats,
  arrangeSyncStats,
} from "./helper"
import { ComboFlag, SyncFlag } from "./flags"
import Variant from "./Variant"
import Record from "./Record"

// Use to flatten the song list
type FlattenedVariant = { song_id: string } & Pick<
  Dx_Intl_Songs,
  "category" | "title" | "order"
> &
  Pick<Dx_Intl_Variants, "deluxe" | "version" | "active"> & {
    dx_intl_notes: Array<
      { __typename?: "dx_intl_notes" } & Pick<
        Dx_Intl_Notes,
        "difficulty" | "level"
      >
    >
  }

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const SizedSelect = styled(Select)`
  width: 8em;
`

const StyledCard = styled(Card)`
  .MuiCardContent-root {
    padding: 8px;
  }
  .MuiCardContent-root:last-child {
    padding-bottom: 8px;
  }
  .order {
    margin-top: 8px;
  }
`

const TabContainer = styled("div")`
  margin-top: 8px;
  position: sticky;
  top: 48px;
  background: ${(props) => props.theme.palette.background.default};
  ${(props) => props.theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: row;
  }
`

const StyledTabs = styled(Tabs)`
  .MuiTab-root {
    font-family: "M PLUS 1p";
    font-weight: 700;
    text-transform: none;
  }
  .MuiTab-wrapper {
    /* Prevent iOS trying to wrap due to strange issues */
    white-space: nowrap;
  }
`
const DifficultyTabs = styled(StyledTabs)`
  .MuiTab-root {
    text-transform: uppercase;
  }
`

const DifficultySetTabs = styled(StyledTabs)`
  .MuiTab-root {
    text-transform: uppercase;
  }
  width: 24em;
  background: #eeeeee;
`

const ScoreTable = styled(Table)`
  .MuiTableCell-root {
    font-family: "M PLUS 1p";
    padding: 8px;
  }
  .MuiTableCell-head {
    font-weight: 700;
  }
  table-layout: fixed;
`
const HeaderCell = styled(TableCell)`
  cursor: pointer;
  text-transform: uppercase;
  &.difficulty-0 {
    color: ${green[700]};
    &.selected {
      background: ${green[100]};
    }
  }
  &.difficulty-1 {
    color: ${orange[700]};
    &.selected {
      background: ${orange[100]};
    }
  }
  &.difficulty-2 {
    color: ${red[700]};
    &.selected {
      background: ${red[100]};
    }
  }
  &.difficulty-3 {
    color: ${deepPurple[700]};
    &.selected {
      background: ${deepPurple[100]};
    }
  }
  &.difficulty-4 {
    color: ${purple[700]};
    &.selected {
      background: ${purple[100]};
    }
  }
`
const ScoreCell = styled(TableCell)`
  &.difficulty-0 {
    border-bottom-color: ${green[100]};
  }
  &.difficulty-1 {
    border-bottom-color: ${orange[100]};
  }
  &.difficulty-2 {
    border-bottom-color: ${red[100]};
  }
  &.difficulty-3 {
    border-bottom-color: ${deepPurple[100]};
  }
  &.difficulty-4 {
    border-bottom-color: ${purple[100]};
  }
`
const ScoreCellInner = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ScoreLevel = styled("span")`
  color: #999999;
  width: 2.4em;
  font-size: 80%;
  text-transform: uppercase;

  &.diff {
    width: 3em;
  }

  .difficulty-0 & {
    color: ${green[200]};
  }
  .difficulty-1 & {
    color: ${orange[200]};
  }
  .difficulty-2 & {
    color: ${red[200]};
  }
  .difficulty-3 & {
    color: ${deepPurple[200]};
  }
  .difficulty-4 & {
    color: ${purple[200]};
  }
`
export const ActualScore = styled("span")`
  width: 5.5em;
  text-align: right;
  overflow: hidden;
`
export const FlagContainer = styled("span")`
  width: 4em;
  font-size: 75%;
  overflow: hidden;
`

export const AccordionDetailsVertical = styled(AccordionDetails)`
  flex-direction: column;
`

export const AdvancedControls = styled("div")`
  margin-left: 8px;
`

export const StatTitleTypo = styled(Typography)`
  font-family: "M PLUS 1p";
  font-weight: 600;
  text-transform: uppercase;
`

export const StatContainer = styled("div")`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  flex-wrap: wrap;
  div {
    width: 2.5em;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 1.5em;
    }
    span {
      font-family: "M PLUS 1p";
      font-weight: 800;
      font-size: 75%;
      padding: 0.24em;
      color: #333333;
    }
  }
`

const WithInactiveTableRow = styled(TableRow)`
  &.inactive {
    color: #666666;
    .MuiTypography-colorTextPrimary {
      color: rgba(96, 96, 96, 0.67);
      text-decoration: line-through;
    }
    .MuiTableCell-body {
      color: rgba(96, 96, 96, 0.67);
    }
  }
`

const Player: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [currentTab, setCurrentTab] = useState(1)
  const [groupBy, setGroupBy] = useState<"category" | "version" | "level">(
    "category"
  )
  const [orderBy, setOrderBy] = useState<
    "default" | "level" | "score" | "combo" | "sync"
  >("default")
  const [orderByDesc, setOrderByDesc] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [difficultySet, setDifficultySet] = useState(0)
  const [includeInactive, setIncludeInactive] = useState(false)
  const params = useParams<{ nickname: string }>()
  const [editableResult] = useQuery({
    query: DxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname },
    pause: user == null,
  })
  const [recordResult, refetchRecord] = useQuery({
    query: DxIntlRecordWithScoresDocument,
    variables: { ...params },
  })
  const [songsResult] = useQuery({ query: DxIntlSongsDocument })
  const useDiffSetLayout = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "md")
  )
  const useSingleDiffLayout = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )
  const getHeader = (sparsedIndex: number): string =>
    groupBy === "category"
      ? categories[sparsedIndex] ?? ""
      : groupBy === "version"
      ? versions[sparsedIndex] ?? ""
      : `Lv ${levels[sparsedIndex]}`

  const handleRefresh = (): void => {
    refetchRecord({ requestPolicy: "network-only" })
  }
  const handleChangeGroupBy = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const { value } = event.target
    if (value !== "category" && value !== "version" && value !== "level") {
      return
    }
    setGroupBy(value)
    setCurrentTab(value === "category" ? 1 : 0)
    if (value === "level" && orderBy === "level") {
      setOrderBy("default")
    }
    window.scrollTo(0, 0)
  }
  const handleChangeTab = (event: React.ChangeEvent<{}>, val: number): void => {
    setCurrentTab(val)
  }
  const handleChangeDifficultySet = (
    event: React.ChangeEvent<{}>,
    val: number
  ): void => {
    setDifficultySet(val)
  }
  const handleChangeDifficulty = (
    event: React.ChangeEvent<{}>,
    val: number
  ): void => {
    setDifficulty(val)
  }
  const handleChangeOrderBy = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const { value } = event.target
    switch (value) {
      case "default":
      case "level":
      case "score":
      case "combo":
      case "sync":
        setOrderBy(value)
        break
      default:
    }
  }

  const handleChangeIncludeInactive = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIncludeInactive(event.target.checked)
  }

  if (recordResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }
  const songs = songsResult.data.dx_intl_songs
  const player = recordResult.data.dx_intl_players[0]
  const record = player.dx_intl_record
  const scores = player.dx_intl_scores

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }

  // First use groupBy to group all song list
  const scoreMap = new Map(scores.map((score) => [getNoteHash(score), score]))
  const sortNote = (
    noteA: Pick<Dx_Intl_Notes, "song_id" | "deluxe" | "difficulty" | "level">,
    noteB: Pick<Dx_Intl_Notes, "song_id" | "deluxe" | "difficulty" | "level">
  ): number => {
    const factor = orderByDesc ? -1 : 1
    switch (orderBy) {
      case "level":
        return (
          (levels.indexOf(noteA.level) - levels.indexOf(noteB.level)) * factor
        )
      case "score":
        return (
          ((scoreMap.get(getNoteHash(noteA))?.score ?? -1) -
            (scoreMap.get(getNoteHash(noteB))?.score ?? -1)) *
          factor
        )
      case "combo":
        return (
          (comboFlags.indexOf(
            scoreMap.get(getNoteHash(noteA))?.combo_flag ?? ""
          ) -
            comboFlags.indexOf(
              scoreMap.get(getNoteHash(noteB))?.combo_flag ?? ""
            )) *
          factor
        )
      case "sync":
        return (
          (syncFlags.indexOf(
            scoreMap.get(getNoteHash(noteA))?.sync_flag ?? ""
          ) -
            syncFlags.indexOf(
              scoreMap.get(getNoteHash(noteB))?.sync_flag ?? ""
            )) *
          factor
        )
      default:
        return 0
    }
  }
  const sortNoteWithLevelDefault = (
    noteA: Pick<
      Dx_Intl_Notes,
      "song_id" | "deluxe" | "difficulty" | "level"
    > & {
      deluxe: boolean
    },
    noteB: Pick<
      Dx_Intl_Notes,
      "song_id" | "deluxe" | "difficulty" | "level"
    > & {
      deluxe: boolean
    }
  ): number => {
    if (noteA.difficulty !== noteB.difficulty) {
      return noteA.difficulty - noteB.difficulty
    }
    return (noteA.deluxe ? 1 : 0) - (noteB.deluxe ? 1 : 0)
  }

  const filterActiveVariant = (variant: { active: boolean }): boolean =>
    includeInactive || variant.active
  const groupedRows: Array<Array<FlattenedVariant | FlattenedNote>> =
    groupBy === "level"
      ? songs
          .reduce<FlattenedNote[]>(
            (accr, song) => [
              ...accr,
              ...song.dx_intl_variants
                .filter(filterActiveVariant)
                .reduce<FlattenedNote[]>(
                  (accrInner, variant) => [
                    ...accrInner,
                    ...variant.dx_intl_notes.map((note) => ({
                      song_id: song.id,
                      category: song.category,
                      title: song.title,
                      order: song.order,
                      deluxe: variant.deluxe,
                      version: variant.version,
                      active: variant.active,
                      ...note,
                    })),
                  ],
                  []
                ),
            ],
            []
          )
          .reduce<FlattenedNote[][]>((accr, curr) => {
            const levelIndex = levels.indexOf(curr.level)
            accr[levelIndex] = [...(accr[levelIndex] ?? []), curr]
            return accr
          }, [])
          .map((notes) =>
            orderBy === "default"
              ? orderByDesc
                ? notes.sort(sortNoteWithLevelDefault).reverse()
                : notes.sort(sortNoteWithLevelDefault)
              : notes.sort(sortNote)
          )
      : songs
          .reduce<FlattenedVariant[]>(
            (accr, song) => [
              ...accr,
              ...song.dx_intl_variants.map((variant) => ({
                song_id: song.id,
                category: song.category,
                title: song.title,
                order: song.order,
                ...variant,
              })),
            ],
            []
          )
          .filter(filterActiveVariant)
          .reduce<FlattenedVariant[][]>((accr, curr) => {
            const sortKey =
              groupBy === "category" ? curr.category : curr.version
            accr[sortKey] = [...(accr[sortKey] ?? []), curr]
            return accr
          }, [])
          .map((variants) =>
            orderBy === "default"
              ? orderByDesc
                ? variants.reverse()
                : variants
              : variants.sort((a, b) =>
                  sortNote(
                    {
                      song_id: a.song_id,
                      deluxe: a.deluxe,
                      ...(a.dx_intl_notes[difficulty] ?? {
                        difficulty: -1,
                        level: -1,
                      }),
                    },
                    {
                      song_id: b.song_id,
                      deluxe: b.deluxe,
                      ...(b.dx_intl_notes[difficulty] ?? {
                        difficulty: -1,
                        level: -1,
                      }),
                    }
                  )
                )
          )
  const currentTabRows = groupedRows[currentTab] ?? []
  const shownDifficulties = useSingleDiffLayout
    ? Array(difficulty).concat([difficulties[difficulty]])
    : useDiffSetLayout
    ? Array(2 * difficultySet).concat(
        difficulties.slice(2 * difficultySet, 2 * difficultySet + 3)
      )
    : [...difficulties]
  const getNoteScoreCell = (
    note: Pick<Dx_Intl_Notes, "song_id" | "deluxe" | "difficulty" | "level">
  ): JSX.Element => {
    const score = scoreMap.get(getNoteHash(note))
    return (
      <ScoreCell
        key={getNoteHash(note)}
        className={`difficulty-${note.difficulty}`}
      >
        <ScoreCellInner>
          <ScoreLevel className={groupBy === "level" ? "diff" : ""}>
            {groupBy === "level"
              ? difficulties[note.difficulty].substring(0, 3)
              : note.level}
          </ScoreLevel>
          {score != null ? (
            <>
              <ActualScore>{score.score.toFixed(4)}%</ActualScore>
              <FlagContainer>
                <ComboFlag flag={score.combo_flag} />
                <SyncFlag flag={score.sync_flag} />
              </FlagContainer>
            </>
          ) : (
            ""
          )}
        </ScoreCellInner>
      </ScoreCell>
    )
  }

  const currentTabRowsScores = currentTabRows.map((row) => {
    const innerNote =
      "difficulty" in row
        ? row
        : {
            song_id: row.song_id,
            deluxe: row.deluxe,
            ...row.dx_intl_notes[difficulty],
          }
    return scoreMap.get(getNoteHash(innerNote))
  })
  const scoreStats = arrangeScoreStats(currentTabRowsScores)
  const comboStats = arrangeComboStats(currentTabRowsScores)
  const syncStats = arrangeSyncStats(currentTabRowsScores)

  return (
    <>
      <Helmet>
        <title>{record.card_name} - maimai DX 成績單 - Otohime</title>
      </Helmet>
      <StyledCard>
        <CardContent>
          <Container>
            <div>
              <Record
                record={record}
                isPrivate={player.private}
                updatedAt={player.updated_at}
              />
            </div>
            <div>
              <ButtonGroup variant="contained">
                <Button color="secondary" onClick={handleRefresh}>
                  <RefreshIcon />
                </Button>
                <Button
                  component={RouterLink}
                  to={`/dxi/p/${params.nickname}/history`}
                  startIcon={<EventNoteIcon />}
                >
                  歷史
                </Button>
                {editableResult.error == null &&
                (editableResult.data?.dx_intl_players?.length ?? 0) > 0 ? (
                  <Button
                    component={RouterLink}
                    to={`/dxi/p/${params.nickname}/edit`}
                    startIcon={<EditIcon />}
                  >
                    編輯
                  </Button>
                ) : (
                  ""
                )}
              </ButtonGroup>
              <div className="order">
                <FormControl>
                  <InputLabel>頁籤</InputLabel>
                  <SizedSelect value={groupBy} onChange={handleChangeGroupBy}>
                    <MenuItem value="category">分類</MenuItem>
                    <MenuItem value="version">版本</MenuItem>
                    <MenuItem value="level">樂曲等級</MenuItem>
                  </SizedSelect>
                </FormControl>
                <FormControl>
                  <InputLabel>排序</InputLabel>
                  <SizedSelect value={orderBy} onChange={handleChangeOrderBy}>
                    <MenuItem value="default">預設順序</MenuItem>
                    {groupBy !== "level" ? (
                      <MenuItem value="level">樂曲等級</MenuItem>
                    ) : (
                      ""
                    )}
                    <MenuItem value="score">成績</MenuItem>
                    <MenuItem value="combo">Combo 標記</MenuItem>
                    <MenuItem value="sync">Sync 標記</MenuItem>
                  </SizedSelect>
                </FormControl>
                <Tooltip title="切換排序順序">
                  <IconButton onClick={() => setOrderByDesc(!orderByDesc)}>
                    {orderByDesc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Container>
        </CardContent>
      </StyledCard>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          統計與進階選項
        </AccordionSummary>
        <AdvancedControls>
          <FormControlLabel
            control={
              <Switch
                value={includeInactive}
                onChange={handleChangeIncludeInactive}
              />
            }
            label="包含刪除曲"
          />
        </AdvancedControls>
        <AccordionDetailsVertical>
          <StatTitleTypo variant="subtitle2">
            {getHeader(currentTab)}{" "}
            {groupBy !== "level" ? ` - ${difficulties[difficulty]}` : ""} (
            {
              currentTabRows.filter(
                (row) => "difficulty" in row || difficulty in row.dx_intl_notes
              ).length
            }
            )
          </StatTitleTypo>
          <StatContainer>
            {[...scoreStats.entries()].map(([k, v]) => (
              <div key={k}>
                <span>{k}</span> {v}
              </div>
            ))}
            {[...comboStats.entries()].map(([k, v]) => (
              <div key={k}>
                <ComboFlag flag={k} /> {v}
              </div>
            ))}
            {[...syncStats.entries()].map(([k, v]) => (
              <div key={k}>
                <SyncFlag flag={k} /> {v}
              </div>
            ))}
          </StatContainer>
        </AccordionDetailsVertical>
      </Accordion>
      <TabContainer>
        <StyledTabs
          value={currentTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {groupedRows.map((row, sparsedIndex) => (
            <Tab
              key={sparsedIndex}
              value={sparsedIndex}
              label={`
              ${getHeader(sparsedIndex)} (${row.length}) 
            `}
            />
          ))}
        </StyledTabs>
        {groupBy !== "level" ? (
          <>
            <Hidden smDown={true} lgUp={true} implementation="css">
              <DifficultySetTabs
                value={difficultySet}
                onChange={handleChangeDifficultySet}
                aria-label="Select Difficulty"
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label={`${difficulties[0]} - ${difficulties[2]}`} />
                <Tab label={`${difficulties[2]} - ${difficulties[4]}`} />
              </DifficultySetTabs>
            </Hidden>
            <Hidden mdUp={true} implementation="css">
              <DifficultyTabs
                value={difficulty}
                onChange={handleChangeDifficulty}
                variant="scrollable"
                scrollButtons="on"
                aria-label="Select Difficulty"
                indicatorColor="secondary"
                textColor="secondary"
              >
                {difficulties.map((difficulty) => (
                  <Tab key={difficulty} label={difficulty} />
                ))}
              </DifficultyTabs>
            </Hidden>
          </>
        ) : (
          ""
        )}
      </TabContainer>
      <ScoreTable lang="ja">
        <colgroup>
          <col />
          <col style={{ width: "3em" }} />
          {groupBy === "level" ? (
            <col style={{ width: "55%" }} />
          ) : (
            shownDifficulties.map((d, i) => (
              <col key={i} style={{ width: "12em" }} />
            ))
          )}
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell component="th" colSpan={2}>
              {getHeader(currentTab)} ({currentTabRows.length})
            </TableCell>
            {groupBy === "level" ? (
              <TableCell component="th">Score</TableCell>
            ) : (
              shownDifficulties.map((d, i) => (
                <HeaderCell
                  component="th"
                  className={`difficulty-${i}${
                    i === difficulty ? " selected" : ""
                  }`}
                  key={i}
                  onClick={() => setDifficulty(i)}
                >
                  {d}
                </HeaderCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentTabRows.map((row) => (
            <WithInactiveTableRow
              key={`${row.category}/${row.title}/${
                row.deluxe ? "true" : "false"
              }/${"difficulty" in row ? row.difficulty : ""}`}
              className={row.active ? "" : "inactive"}
            >
              <TableCell>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to={`/dxi/s/${row.song_id.substring(0, 8)}/${
                    row.deluxe ? "dx" : "std"
                  }/${"difficulty" in row ? row.difficulty : ""}`}
                >
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>
                <Variant deluxe={row.deluxe} />
              </TableCell>
              {"difficulty" in row
                ? getNoteScoreCell(row)
                : shownDifficulties
                    .map((d, i) =>
                      i in row.dx_intl_notes
                        ? getNoteScoreCell({
                            song_id: row.song_id,
                            deluxe: row.deluxe,
                            ...row.dx_intl_notes[i],
                          })
                        : ""
                    )
                    .filter((cell) => cell !== "")}
            </WithInactiveTableRow>
          ))}
        </TableBody>
      </ScoreTable>
    </>
  )
}
export default Player
