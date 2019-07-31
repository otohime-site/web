import styled from 'styled-components'
import React, { FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRouter from 'use-react-router'
import { createMuiTheme, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
         CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
         Table, TableRow, TableCell, TableHead, TableBody, Typography, Card, CardContent } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { indigo, blue, green, orange, red, deepPurple, purple } from '@material-ui/core/colors'
import HistoryIcon from '@material-ui/icons/History'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { AdapterLink } from '../../utils'
import ScoreComponent from './Score'
import RecordComponent from './Record'
import {
  getPlayer, getSongs, setShowDifficulties, setSort, getMe
} from '../actions'
import './Player.css'
import { RootState } from '../../reducers'
import { Sort, Song, Score } from '../types'
import { difficulties } from '../consts'

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
const StyledExpansionPanel = styled(ExpansionPanel)`
`

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  flex-direction: row-reverse;
  padding: 0;
  &.Mui-expanded {
    min-height: 48px;
  }
  position: sticky;
  position: -webkit-sticky;
  top: 48px;
  background: white;
  & > div, & > div.Mui-expanded {
    margin: 0;
  }
`

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  margin-top: -48px;
  padding: 0;
`

const ScoreTable = styled(Table)`

  thead th {
    pointer-events: none;
    position: sticky;
    position: -webkit-sticky;
    z-index: 1000;
    top: 48px;
    height: 48px;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    font-weight: bold;
  }

  .song-name {
    height: 48px;
    color: #666666;
    font-weight: bold;
  }
  .english-name {
    color: #999999;
    font-size: 75%;
  }
  td.score {
    padding-right: 8px;
  }
  td.score:last-child {
    padding-right: 8px;
  }
  td.score {
    width: 8em;
    position: relative;
    padding-left: 2em;
  }
  td.score .level {
    position: absolute;
    top: 1.3em;
    left: 8px;
    font-size: 75%;
    color: #AAAAAA;
  }
  .difficulty-0 {
    background: ${blue[50]};
  }
  .difficulty-1 {
    background: ${green[50]};
  }
  .difficulty-2 {
    background: ${orange[50]};
  }
  .difficulty-3 {
    background: ${red[50]};
  }
  .difficulty-4 {
    background: ${deepPurple[50]};
  }
  .difficulty-5 {
    background: ${purple[50]};
  }


  &.hide-difficulties .difficulty-0,
  &.hide-difficulties .difficulty-1,
  &.hide-difficulties .difficulty-2 {
    display: none;
  }
  &.hide-difficulties .score {
    width: 12em;
  }
  .flags {
    display: block;
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

const tableHeader = (sort: Sort) => {
  if (sort === 'level') {
    return (
      <TableHead>
        <TableRow>
          <TableCell component='th' />
          <TableCell component='th' className='score'>Score</TableCell>
        </TableRow>
      </TableHead>
    )
  } else {
    const diffNodes = difficulties.map((d, i) => {
      return (
        <TableCell component='th' className={`score difficulty-${i}`} key={`difficulty-${i}`}>
          {d}
        </TableCell>
      )
    })
    return (
      <TableHead>
        <TableRow>
          <TableCell component='th' />
          {diffNodes}
        </TableRow>
      </TableHead>
    )
  }
}

const scoreCell = (score: Score, label: string, i: number) => {
  if (score) {
    let className = `score difficulty-${i}`
    if (score.score === 0) {
      className += ' score-zero'
    }
    return (
      <TableCell
        className={className}
        key={`difficulty-${i}`}
      >
        <span className='level'>{label}</span>
        <ScoreComponent score={score} />
      </TableCell>
    )

  } else {
    return (<TableCell key={`difficulty-${i}`} />)
  }
}

const tableRow = (song: SongWithDifficulty, scores: Score[] = [], sort: Sort) => {
  let scoreCols
  if (sort === 'level') {
    const difficulty = song.difficulty!
    scoreCols = [scoreCell(scores[difficulty], difficulties[difficulty], difficulty)]
  } else {
    scoreCols = scores.map((score, i) => (
      scoreCell(
        score, (song.levels) ? song.levels[i] || '' : '', i
      )
    ))
  }
  return (
    <TableRow key={song.id}>
      <TableCell className='song-name'>
        {song.name}
        {(song.english_name) ? <div className='english-name'>{song.english_name}</div> : ''}
      </TableCell>
      {scoreCols}
    </TableRow>
  )
}

const PlayerComponent: FunctionComponent = () => {
  const { match } = useRouter<{ nickname: string }>()
  const record = useSelector((state: RootState) => state.laundry.record)
  const scores = useSelector((state: RootState) => state.laundry.scores)
  const songs = useSelector((state: RootState) => state.laundry.songs)
  const getPlayerResult = useSelector((state: RootState) => state.laundry.getPlayerResult)
  const showDifficulties = useSelector((state: RootState) => state.laundry.showDifficulties)
  const sort = useSelector((state: RootState) => state.laundry.sort)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!songs || songs.length === 0) {
      dispatch(getSongs.request())
    }
    dispatch(getMe.request())
    dispatch(getPlayer.request(match.params.nickname))
  }, [match.params.nickname])

  const changeShowDifficulties = (e: React.ChangeEvent<HTMLInputElement>) => (
    dispatch(setShowDifficulties(!!e.target.checked))
  )
  const changeSort = (e: React.ChangeEvent<{ value: unknown }>) => (
    dispatch(setSort(e.target.value as Sort))
  )
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
  const tbodies: JSX.Element[] = []
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

  // Render song groups with scores.
  const result = songGroupKeys.map((groupKey) => {
    const songInGroup = songGroups.get(groupKey)!
    if (sort === 'level') {
      songInGroup.sort(sameLevelSongSorter)
    }
    const songRows = songInGroup.map(song => (
      tableRow(song, scores[song.id], sort)
    ))
    return (
      <StyledExpansionPanel key={groupKey} TransitionProps={{ timeout: 0 }}>
        <StyledExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {(sort === 'level') ? 'LEVEL ' : ''}
            {(sort === 'version') ? versions.get(parseFloat(groupKey)) : groupKey}
            {' '}({songRows.length})
          </Typography>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetails>
          <ScoreTable size='small' className={(showDifficulties || sort === 'level') ? `player-scores sort-${sort}` : `player-scores sort-${sort} hide-difficulties`} lang='ja'>
            {tableHeader(sort)}
            <TableBody>
              {songRows}
            </TableBody>
          </ScoreTable>
        </StyledExpansionPanelDetails>
      </StyledExpansionPanel>
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
          {/* tslint:disable-next-line:jsx-no-multiline-js */}
          {(sort !== 'level') ?
            /* tslint:disable-next-line:jsx-no-multiline-js */
            <FormControlLabel
              control={<Switch checked={showDifficulties} onChange={changeShowDifficulties} />}
              label='顯示所有難易度'
            /> : <></>}
        </PlayerCardContent>
      </PlayerCard>
      <ThemeProvider theme={laundryTheme}>
        {result}
      </ThemeProvider>
    </>
  )
}
export default PlayerComponent
