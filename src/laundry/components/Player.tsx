import styled from 'styled-components'
import React, { FunctionComponent, useEffect, useState, useRef, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRouter from 'use-react-router'
import { WindowScroller, Table, AutoSizer, Column, TableCellRenderer, TableCellDataGetter, TableHeaderRenderer } from 'react-virtualized'
import { createMuiTheme, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem,
         TableCell, Grid, Hidden, Card, CardContent,
         Tooltip, Tabs, Tab, useMediaQuery } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { indigo, blue, green, orange, red, deepPurple, purple } from '@material-ui/core/colors'
import HistoryIcon from '@material-ui/icons/History'
import { AdapterLink } from '../../utils'
import ScoreComponent from './Score'
import RecordComponent from './Record'
import {
  getPlayer, getSongs, setSort, getMe
} from '../actions'
import './Player.css'
import 'react-virtualized/styles.css'
import { RootState } from '../../reducers'
import { Sort, Song, Score } from '../types'
import { difficulties } from '../consts'
import { fromEvent, Subject } from 'rxjs'
import { takeUntil, sampleTime } from 'rxjs/operators'

const laundryTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange
  },
  typography: {
    fontFamily: '"M PLUS Rounded 1c", "Roboto", "Helvetica", "Arial", sans-serif'
  }
})

const SortFormControl = styled(FormControl)`
  width: 10rem;
`

const PlayerCard = styled(Card)`
  margin-top: ${props => props.theme.spacing(2)}px;
  margin-bottom: ${props => props.theme.spacing(2)}px;
`
const PlayerCardContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: ${props => props.theme.spacing(1)}px;

  &:last-child {
    padding: ${props => props.theme.spacing(1)}px;
  }

  & > * {
    margin-right: ${props => props.theme.spacing(4)}px;
  }
`
const StickyDiffculty = styled('div')`
  background: ${props => props.theme.palette.background.default};
  position: sticky;
  position: -webkit-sticky;
  top: 48px;
  z-index: 1001;
  margin-bottom: ${props => props.theme.spacing(1)}px;
`

const Section = styled('div')`
  position: relative;
  margin-bottom: 48px;
`

const SpanAnchor = styled('span')`
  position: absolute;
  top: -148px;
  ${props => props.theme.breakpoints.up('md')} {
    top: -100px;
  }
`

const FlexCellTable = styled(Table)`
  .flex-cell {
    margin: 0;
    display: flex;
    flex-direction: row;
  }
  .flex-cell:first-of-type {
    margin: 0;
  }
`
const HeaderCell = styled(TableCell)`
  flex: 1;
  .name & {
    font-weight: bold;
  }
  .difficulty-0 & {
    color: ${blue[700]};
  }
  .difficulty-1 & {
    color: ${green[700]};
  }
  .difficulty-2 & {
    color: ${orange[700]};
  }
  .difficulty-3 & {
    color: ${red[700]};
  }
  .difficulty-4 & {
    color: ${deepPurple[700]};
  }
  .difficulty-5 & {
    color: ${purple[700]};
  }
`

const SongCell = styled(TableCell)`
  &.with-english {
    padding-top: 6px;
    padding-bottom: 7px;
    .english-name {
      display: block;
    }
  }
  flex: 1;
  color: #666666;
  font-weight: bold;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .english-name {
    display: none;
    margin: 0;
    color: #999999;
    font-size: 75%;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const ScoreCell = styled(TableCell)`
  flex: 1;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &.difficulty-0 {
    border-bottom-color: ${blue[100]};
  }
  &.difficulty-1 {
    border-bottom-color: ${green[100]};
  }
  &.difficulty-2 {
    border-bottom-color: ${orange[100]};
  }
  &.difficulty-3 {
    border-bottom-color: ${red[100]};
  }
  &.difficulty-4 {
    border-bottom-color: ${deepPurple[100]};
  }
  &.difficulty-5 {
    border-bottom-color: ${purple[100]};
  }
`

const ScoreNote = styled('span')`
  color: #999999;
  width: 3.2em;
  font-size: 8px;
  text-transform: uppercase;
  .difficulty-0 & {
    color: ${blue[200]};
  }
  .difficulty-1 & {
    color: ${green[200]};
  }
  .difficulty-2 & {
    color: ${orange[200]};
  }
  .difficulty-3 & {
    color: ${red[200]};
  }
  .difficulty-4 & {
    color: ${deepPurple[200]};
  }
  .difficulty-5 & {
    color: ${purple[200]};
  }
`

const versions = new Map([
  [7, 'FiNALE'],
  [6.5, 'MiLK PLUS'],
  [6, 'MiLK'],
  [5.5, 'MURASAKi PLUS'],
  [5, 'MURASAKi'],
  [4.5, 'PiNK PLUS'],
  [4, 'PiNK'],
  [3.5, 'ORANGE PLUS'],
  [3, 'ORANGE'],
  [2.5, 'GreeN PLUS'],
  [2, 'GreeN'],
  [1.5, 'PLUS'],
  [1, 'maimai']
])

const levelSorter = (a: string, b: string) => (
  parseFloat(a.replace(/\+/, '.5')) - parseFloat(b.replace(/\+/, '.5'))
)

const sameLevelSongSorter = (a: SongWithDifficulty, b: SongWithDifficulty) => {
  const difficultyDiff = a.difficulty! - b.difficulty!
  if (difficultyDiff === 0) {
    return a.seq - b.seq
  } else {
    return difficultyDiff
  }
}

interface SongWithDifficulty extends Song {
  difficulty?: number
}

const virtualizedTableColumns = (sort: Sort, showDifficulties: number[], nameTitle: string) => {
  const columns = [(
    <Column
      label={nameTitle}
      width={160}
      flexGrow={2}
      headerRenderer={headerRenderer}
      cellRenderer={songRenderer}
      dataKey='song'
      className='flex-cell'
      headerClassName='flex-cell name'
    />
  )]
  if (sort !== 'level') {
    return [
      ...columns,
      showDifficulties.map((index) => (
        <Column
          key={`difficulty-${index}`}
          label={difficulties[index]}
          width={160}
          flexGrow={1}
          headerRenderer={headerRenderer}
          cellDataGetter={scoreDataGetter}
          cellRenderer={scoreRenderer(index)}
          dataKey='scores'
          className='flex-cell'
          headerClassName={`flex-cell difficulty-${index}`}
        />
      ))
    ]
  }
  return [
    ...columns, (
      <Column
        label='Score'
        width={160}
        flexGrow={1}
        headerRenderer={headerRenderer}
        cellDataGetter={scoreDataGetter}
        cellRenderer={scoreRenderer(-1)}
        dataKey='scores'
        className='flex-cell'
        headerClassName={`flex-cell`}
      />
    )
  ]
}

const scoreDataGetter: TableCellDataGetter = ({ rowData }) => (rowData)

const songRenderer: TableCellRenderer = ({ cellData }) => (
  <SongCell component='div' className={(cellData.english_name) ? 'with-english' : ''}>
    <Tooltip title={cellData.name}>
      <span>
        {cellData.name}
      </span>
    </Tooltip>
    <p className='english-name'>
      <Tooltip title={cellData.english_name}>
        <span>{cellData.english_name}</span>
      </Tooltip>
    </p>
  </SongCell>
)
const scoreRenderer: (index: number) => TableCellRenderer =
(index) => ({ cellData }) => {
  if (!cellData.scores) { return <></> }
  let score
  if (index < 0) {
    score = cellData.scores[cellData.song.difficulty]
  } else {
    score = cellData.scores[index]
  }
  if (!score) { return (<></>) }
  return (
    <ScoreCell component='div' variant='body' className={`difficulty-${score.difficulty}`}>
      <ScoreNote>
        {(index < 0) ? (difficulties[score.difficulty] || '').substring(0, 3) : cellData.song.levels[score.difficulty] || ''}
      </ScoreNote>
      <ScoreComponent score={score} />
    </ScoreCell>
  )
}

const headerRenderer: TableHeaderRenderer = ({ label, columnData }) => (
  <HeaderCell component='div' variant='head'>
    {label}
  </HeaderCell>
)

const PlayerComponent: FunctionComponent = () => {
  const { match } = useRouter<{ nickname: string }>()
  const record = useSelector((state: RootState) => state.laundry.record)
  const scores = useSelector((state: RootState) => state.laundry.scores)
  const songs = useSelector((state: RootState) => state.laundry.songs)
  const getPlayerResult = useSelector((state: RootState) => state.laundry.getPlayerResult)
  const sort = useSelector((state: RootState) => state.laundry.sort)
  // For smaller screen
  const [ difficulty, setDifficulty ] = useState(3)
  // For larger screen
  const [ difficultySet, setDifficultySet ] = useState(1)
  const largerThenMd = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  const [ activeFolder, setActiveFolder ] = useState(0)
  const folderRefs = useRef<React.RefObject<HTMLDivElement>[]>([])
  let showDifficulties = [difficulty]
  if (largerThenMd) {
    showDifficulties = (difficultySet > 0) ? [3, 4, 5] : [0, 1, 2]
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (!songs || songs.length === 0) {
      dispatch(getSongs.request())
    }
    dispatch(getMe.request())
    dispatch(getPlayer.request(match.params.nickname))
  }, [match.params.nickname])

  const changeSort = (e: React.ChangeEvent<{ value: unknown }>) => (
    dispatch(setSort(e.target.value as Sort))
  )
  const changeDifficulty = (e: React.ChangeEvent<{}>, newValue: number) => (
    setDifficulty(newValue)
  )
  const changeDifficultySet = (e: React.ChangeEvent<{}>, newValue: number) => (
    setDifficultySet(newValue)
  )
  const changeScrollSpy = () => {
    if (!folderRefs.current) {
      return
    }
    const offset = (largerThenMd) ? 101 : 149
    let active = 0
    for (let i = 0; i < folderRefs.current.length; i++) {
      const refWrapper = folderRefs.current[i]
      const ref = (refWrapper) ? refWrapper.current : undefined
      if (ref && ref.getBoundingClientRect().top < offset) {
        active = i
      }
    }
    setActiveFolder(active)
  }
  useEffect(() => {
    // Pool man's scrollspy...
    const mounted$ = new Subject<boolean>()
    fromEvent(window, 'scroll').pipe(
      takeUntil(mounted$),
      sampleTime(1000)
    ).subscribe(changeScrollSpy)
    return () => {
      mounted$.next(true)
      mounted$.complete()
    }
  }, [changeScrollSpy])

  if (getPlayerResult) {
    if (getPlayerResult.status === 'err') {
      if (getPlayerResult.err.code === 404) {
        return <div>玩家不存在。</div>
      }
      return <div>發生錯誤，請稍候再試。</div>
    } if (getPlayerResult.status !== 'ok') {
      return <CircularProgress />
    }
  } else {
    return <CircularProgress />
  }
  if (!songs || !scores || !record) {
    return <CircularProgress />
  }
  // Arrange song groups based on what grouping we want.
  let songGroups = songs.reduce((group, song) => {
    const { active, category, version, levels } = song
    if (!active) {
      return group
    }
    let groupKeys: string[] = []
    switch (sort) {
      case 'category':
        groupKeys = [ category ]
        break
      case 'version':
        groupKeys = [ `${version}` ]
        break
      case 'level':
        groupKeys = (levels) ? levels.filter(l => l).map(l => `${l}`) : []
    }
    groupKeys.forEach((groupKey, index) => {
      const songWithDifficulty = {
        ...song,
        ...((sort === 'level') ? { difficulty: index } : {})
      }
      if (!group.has(groupKey)) {
        group.set(groupKey, [songWithDifficulty])
      } else {
        group.get(groupKey)!.push(songWithDifficulty)
      }
    })
    return group
  }, new Map<string, SongWithDifficulty[]>()
  )

  // Sort the key if we are under level or version grouping.
  const songGroupKeys = [...songGroups.keys()]
  if (sort === 'level') {
    songGroupKeys.sort(levelSorter)
  } else if (sort === 'version') {
    songGroupKeys.sort()
  }

  const getTitle = (groupKey: string, count: number) => (
    ((sort === 'level') ? 'LEVEL ' : '') +
    ((sort === 'version') ? versions.get(parseFloat(groupKey)) : groupKey) +
    ` (${count})`
  )
  const tabs = songGroupKeys.map((groupKey, index) => {
    const songInGroup = songGroups.get(groupKey)!
    return (
      <Tab key={groupKey} component='a' href={`#section-${index}`} label={getTitle(groupKey, songInGroup.length)} />
    )
  })
  const result = songGroupKeys.map((groupKey, index) => {
    const songInGroup = songGroups.get(groupKey)!
    if (sort === 'level') {
      songInGroup.sort(sameLevelSongSorter)
    }
    const rowGetter = ({ index }: {index: number}) => {
      const song = songInGroup[index]
      return {
        song: song,
        scores: scores[song.id]
      }
    }
    folderRefs.current[index] = createRef<HTMLDivElement>()
    return (
      <Section ref={folderRefs.current[index]} key={groupKey}>
        <SpanAnchor id={`section-${index}`} />
        <WindowScroller scrollElement={window}>
          {/* tslint:disable-next-line:jsx-no-multiline-js */
            ({ height, registerChild, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight={true}>
                {/* tslint:disable-next-line:jsx-no-multiline-js */
                (({ width }) => (
                  <div ref={(rel: any) => registerChild(rel)}>
                    <FlexCellTable
                      autoHeight={true}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      headerHeight={50}
                      rowHeight={50}
                      rowCount={songInGroup.length}
                      rowGetter={rowGetter}
                      width={width}
                    >
                      {virtualizedTableColumns(sort, showDifficulties, getTitle(groupKey, songInGroup.length))}
                    </FlexCellTable>
                  </div>
                ))}
              </AutoSizer>
            )}
        </WindowScroller>
      </Section>
    )
  })
  return (
    <>
      <PlayerCard>
        <ThemeProvider theme={laundryTheme}>
          <PlayerCardContent>
            <RecordComponent record={record} />
          </PlayerCardContent>
        </ThemeProvider>
        <PlayerCardContent>
          <Button variant='contained' color='secondary' component={AdapterLink} to={`/mai/${match.params.nickname}/timeline`}>
            <HistoryIcon />
            歷史紀錄
          </Button>
          <SortFormControl>
            <InputLabel>排序依照：</InputLabel>
            <Select value={sort} onChange={changeSort}>
              <MenuItem value='category'>分類</MenuItem>
              <MenuItem value='version'>版本</MenuItem>
              <MenuItem value='level'>樂曲等級</MenuItem>
            </Select>
          </SortFormControl>
        </PlayerCardContent>
      </PlayerCard>
      <ThemeProvider theme={laundryTheme}>
        <StickyDiffculty>
          <Grid container={true}>
            <Grid item={true} xs={12} md={(sort === 'level') ? 12 : 8}>
              <Tabs
                value={activeFolder}
                aria-label='Select folder'
                variant='scrollable'
                scrollButtons='on'
                indicatorColor='primary'
                textColor='primary'
              >
                {tabs}
              </Tabs>
            </Grid>
            {(sort !== 'level') ?
            <Grid item={true} xs={12} md={4}>
              <Hidden mdUp={true} implementation='css'>
                <Tabs
                  value={difficulty}
                  onChange={changeDifficulty}
                  variant='scrollable'
                  scrollButtons='on'
                  aria-label='Select Difficulty'
                  indicatorColor='secondary'
                  textColor='secondary'
                >
                  {/* tslint:disable-next-line:jsx-no-multiline-js */}
                  {difficulties.map((d, i) => (
                    <Tab key={`difficulty-${i}`} label={d} />
                  ))}
                </Tabs>
              </Hidden>
              <Hidden smDown={true} implementation='css'>
                <Tabs
                  value={difficultySet}
                  onChange={changeDifficultySet}
                  variant='scrollable'
                  scrollButtons='on'
                  aria-label='Select Difficulty'
                  indicatorColor='secondary'
                  textColor='secondary'
                >
                  <Tab label={`${difficulties[0]}, ${difficulties[1]}, ${difficulties[2]}`} />
                  <Tab label={`${difficulties[3]}, ${difficulties[4]}, ${difficulties[5]}`} />
                </Tabs>
              </Hidden>
            </Grid>: ''}
          </Grid>
        </StickyDiffculty>
        {result}
      </ThemeProvider>
    </>
  )
}
export default PlayerComponent
