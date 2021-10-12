import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import EditIcon from "@mui/icons-material/Edit"
import EventNoteIcon from "@mui/icons-material/EventNote"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Alert,
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
  SelectChangeEvent,
} from "@mui/material"
import { green, orange, red, deepPurple, purple } from "@mui/material/colors"
import { lighten, styled } from "@mui/material/styles"
import { FunctionComponent, useState, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "urql"
import { useAuth } from "../auth"
import {
  DxIntlRecordWithScoresDocument,
  DxIntlSongsDocument,
  Dx_Intl_Notes,
  DxIntlPlayersEditableDocument,
} from "../generated/graphql"
import Record from "./Record"
import Variant from "./Variant"
import { ComboFlag, SyncFlag } from "./flags"
import {
  categories,
  versions,
  levels,
  difficulties,
  getNoteHash,
  prepareSongs,
  ScoreEntry,
  getRatingAndRanks,
  GROUP_BY,
  ORDER_BY,
  getRowGroups,
  arrangeSortedRows,
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
} from "./helper"

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

const TabContainer = styled("div")(
  ({ theme }) =>
    `
  margin-top: 8px;
  position: sticky;
  top: 48px;
  background: ${theme.palette.background.default};
  ${theme.breakpoints.up("md")} {
    display: flex;
    flex-direction: row;
  }
`
)

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

const DeluxeCell = styled(TableCell)`
  &.MuiTableCell-root {
    padding: 8px 0;
    text-align: center;
    vertical-align: middle;
    line-height: 0.875em;
  }
`

const ScoreCell = styled(TableCell)`
  &.difficulty-0 {
    border-bottom-color: ${green[100]};
    &.picked {
      background: ${lighten(green[50], 0.5)};
    }
  }
  &.difficulty-1 {
    border-bottom-color: ${orange[100]};
    &.picked {
      background: ${lighten(orange[50], 0.5)};
    }
  }
  &.difficulty-2 {
    border-bottom-color: ${red[100]};
    &.picked {
      background: ${lighten(red[50], 0.5)};
    }
  }
  &.difficulty-3 {
    border-bottom-color: ${deepPurple[100]};
    &.picked {
      background: ${lighten(deepPurple[50], 0.5)};
    }
  }
  &.difficulty-4 {
    border-bottom-color: ${purple[100]};
    &.picked {
      background: ${lighten(purple[50], 0.5)};
    }
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
  width: 2.2em;
  font-size: 80%;
  text-align: right;
  text-transform: uppercase;

  &.non-plus {
    padding-right: 1.04em;
  }
  &.plus {
    padding-right: 0.3em;
  }
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
  text-align: right;
  font-size: 0.7em;
  img {
    vertical-align: middle;
  }
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
      font-weight: 700;
      font-size: 90%;
      line-height: 21px;
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
  const [user, loading] = useAuth()
  const [currentTab, setCurrentTab] = useState(1)
  const [groupBy, setGroupBy] = useState<GROUP_BY>("category")
  const [orderBy, setOrderBy] = useState<ORDER_BY>("default")
  const [orderByDesc, setOrderByDesc] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [difficultySet, setDifficultySet] = useState(0)
  const [includeInactive, setIncludeInactive] = useState(false)
  const params = useParams<{ nickname: string }>()
  const [editableResult] = useQuery({
    query: DxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname },
    pause: loading || user == null,
  })
  const [recordResult] = useQuery({
    query: DxIntlRecordWithScoresDocument,
    variables: { ...params },
    pause: loading,
  })
  const [songsResult] = useQuery({ query: DxIntlSongsDocument })

  // Arrange variants
  const { variantEntries, internalLvMap } = useMemo((): ReturnType<
    typeof prepareSongs
  > => {
    if (songsResult.error != null || songsResult.data == null) {
      return {
        variantEntries: [],
        internalLvMap: new Map(),
      }
    }
    return prepareSongs(songsResult.data.dx_intl_songs)
  }, [songsResult])

  // Arrange score and rating value/ranks
  const scoreMap: Map<string, ScoreEntry> = useMemo(() => {
    if (recordResult.error != null || recordResult.data == null) {
      return new Map()
    }
    const scores = recordResult.data.dx_intl_players[0].dx_intl_scores
    return new Map(scores.map((score) => [getNoteHash(score), score]))
  }, [recordResult])

  const { ratingMap, newRanks, oldRanks } = useMemo(() => {
    return getRatingAndRanks({ scoreMap, internalLvMap })
  }, [scoreMap, internalLvMap])

  const groupedRows = useMemo(() => {
    return getRowGroups({
      variantEntries,
      newRanks,
      oldRanks,
      groupBy,
      includeInactive,
    })
  }, [variantEntries, newRanks, oldRanks, groupBy, includeInactive])
  console.log(groupedRows)
  console.log(currentTab)

  const { sortedRows, scoreStats, comboStats, syncStats } = useMemo(() => {
    const index =
      groupBy === "category" || groupBy === "version" ? difficulty : 0
    const rows = groupedRows[currentTab] ?? []
    return arrangeSortedRows({
      rows,
      index,
      orderBy,
      orderByDesc,
      scoreMap,
      ratingMap,
    })
  }, [
    groupedRows,
    currentTab,
    groupBy,
    difficulty,
    orderBy,
    orderByDesc,
    scoreMap,
    ratingMap,
  ])

  const useDiffSetLayout = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "lg")
  )
  const useSingleDiffLayout = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  )
  const getHeader = (sparsedIndex: number): string => {
    switch (groupBy) {
      case "category":
        return categories[sparsedIndex] ?? ""
      case "version":
        return versions[sparsedIndex] ?? ""
      case "level":
        return `Lv ${levels[sparsedIndex]}`
      case "rating_ranks":
        return sparsedIndex === 0 ? "新曲" : "舊曲"
    }
  }

  const handleChangeGroupBy = (event: SelectChangeEvent<unknown>): void => {
    const { value } = event.target
    if (
      value !== "category" &&
      value !== "version" &&
      value !== "level" &&
      value !== "rating_ranks"
    ) {
      return
    }
    setGroupBy(value)
    setCurrentTab(value === "category" ? 1 : 0)
    if (
      (value === "level" || value === "rating_ranks") &&
      orderBy === "level"
    ) {
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
  const handleChangeOrderBy = (event: SelectChangeEvent<unknown>): void => {
    const { value } = event.target
    switch (value) {
      case "default":
      case "level":
      case "internalLv":
      case "score":
      case "rating":
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
  const player = recordResult.data.dx_intl_players[0]
  const record = player.dx_intl_record

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }
  const shownDifficulties = useSingleDiffLayout
    ? Array(difficulty).concat([difficulties[difficulty]])
    : useDiffSetLayout
    ? Array(2 * difficultySet).concat(
        difficulties.slice(2 * difficultySet, 2 * difficultySet + 3)
      )
    : [...difficulties]
  const getNoteScoreCell = (
    note: Pick<
      Dx_Intl_Notes,
      "song_id" | "deluxe" | "difficulty" | "level" | "internal_lv"
    >
  ): JSX.Element => {
    const hash = getNoteHash(note)
    const score = scoreMap.get(hash)
    const newRank = newRanks.get(hash)
    const oldRank = oldRanks.get(hash)
    const picked =
      (newRank != null && newRank <= RATING_NEW_COUNT) ||
      (oldRank != null && oldRank <= RATING_OLD_COUNT)
    return (
      <ScoreCell
        key={getNoteHash(note)}
        className={`difficulty-${note.difficulty}${picked ? " picked" : ""}`}
      >
        <ScoreCellInner>
          <ScoreLevel
            className={
              groupBy === "level"
                ? "diff"
                : !note.level.includes("+")
                ? "non-plus"
                : note.internal_lv != null
                ? ""
                : "plus"
            }
          >
            {groupBy === "level"
              ? difficulties[note.difficulty].substring(0, 3)
              : note.internal_lv != null
              ? note.internal_lv.toFixed(1)
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
              <ButtonGroup variant="contained" color="secondary">
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
                <FormControl variant="standard">
                  <InputLabel id="group-by-input-label">頁籤</InputLabel>
                  <SizedSelect
                    labelId="group-by-input-label"
                    value={groupBy}
                    onChange={handleChangeGroupBy}
                  >
                    <MenuItem value="category">分類</MenuItem>
                    <MenuItem value="version">版本</MenuItem>
                    <MenuItem value="level">樂曲等級</MenuItem>
                    <MenuItem value="rating_ranks">Rating 組成</MenuItem>
                  </SizedSelect>
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel id="order-by-input-label">排序</InputLabel>
                  <SizedSelect
                    labelId="order-by-input-label"
                    value={orderBy}
                    onChange={handleChangeOrderBy}
                  >
                    <MenuItem value="default">預設順序</MenuItem>
                    {groupBy !== "level" ? (
                      <MenuItem value="level">樂曲等級</MenuItem>
                    ) : (
                      ""
                    )}
                    <MenuItem value="internal_lv">內部等級</MenuItem>
                    <MenuItem value="score">成績</MenuItem>
                    <MenuItem value="rating">Rating 分數</MenuItem>
                    <MenuItem value="combo">Combo 標記</MenuItem>
                    <MenuItem value="sync">Sync 標記</MenuItem>
                  </SizedSelect>
                </FormControl>
                <Tooltip title="切換排序順序">
                  <IconButton
                    onClick={() => setOrderByDesc(!orderByDesc)}
                    size="large"
                  >
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
          <FormControlLabel
            control={
              <Switch
                value={includeInactive}
                onChange={handleChangeIncludeInactive}
              />
            }
            label="總是顯示內部等級"
          />
        </AdvancedControls>
        <AccordionDetailsVertical>
          <StatTitleTypo variant="subtitle2">
            {getHeader(currentTab)}{" "}
            {groupBy !== "level" && groupBy !== "rating_ranks"
              ? ` - ${difficulties[difficulty]}`
              : ""}{" "}
            (
            {
              sortedRows.filter(
                (row) =>
                  (groupBy !== "level" && groupBy !== "rating_ranks") ||
                  difficulty in row.notes
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
          scrollButtons="auto"
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
        {groupBy === "category" || groupBy === "version" ? (
          <>
            <Hidden mdDown={true} lgUp={true} implementation="css">
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
                scrollButtons="auto"
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
          <col style={{ width: "2.7em" }} />
          {groupBy !== "category" && groupBy !== "version" ? (
            <col style={{ width: "55%" }} />
          ) : (
            shownDifficulties.map((d, i) => (
              <col key={i} style={{ width: "11em" }} />
            ))
          )}
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell component="th" colSpan={2}>
              {getHeader(currentTab)} ({sortedRows.length})
            </TableCell>
            {groupBy !== "category" && groupBy !== "version" ? (
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
          {sortedRows.map((row) => (
            <WithInactiveTableRow
              key={`${row.category}/${row.title}/${
                row.deluxe ? "true" : "false"
              }/${row.notes.length === 1 ? row.notes[0].difficulty : ""}`}
              className={row.active ? "" : "inactive"}
            >
              <TableCell>
                <Link
                  underline="hover"
                  color="textPrimary"
                  component={RouterLink}
                  to={`/dxi/s/${row.song_id.substring(0, 8)}/${
                    row.deluxe ? "dx" : "std"
                  }/${row.notes.length === 1 ? row.notes[0].difficulty : ""}`}
                >
                  {row.title}
                </Link>
              </TableCell>
              <DeluxeCell>
                <Variant deluxe={row.deluxe} />
              </DeluxeCell>
              {(row.notes.length === 1 ? ["all"] : shownDifficulties)
                .map((d, i) =>
                  i in row.notes
                    ? getNoteScoreCell({
                        song_id: row.song_id,
                        deluxe: row.deluxe,
                        ...row.notes[i],
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
