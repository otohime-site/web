import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Link } from 'react-router-dom'
import useRouter from 'use-react-router'
import { Accordion, Label, Checkbox, Loader, Table, Button,
         Dropdown, CheckboxProps, DropdownProps } from 'semantic-ui-react'
import ScoreComponent from './Score'
import RecordComponent from './Record'
import {
  getPlayer, getSongs, setShowDifficulties, setSort, getMe
} from '../actions'
import './Player.css'
import { RootState } from '../../reducers'
import { Sort, Song, Score } from '../types'
import { difficulties } from '../consts'

const sortDropdownOptions = [
  {
    key: 'category',
    text: '分類',
    value: 'category'
  },
  {
    key: 'version',
    text: '版本',
    value: 'version'
  },
  {
    key: 'level',
    text: '樂曲等級',
    value: 'level'
  }
]
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
      <thead>
        <tr>
          <th />
          <th className='score'>Score</th>
        </tr>
      </thead>
    )
  } else {
    const diffNodes = difficulties.map((d, i) => {
      return (
        <th className={`score difficulty-${i}`} key={`difficulty-${i}`}>
          {d}
        </th>)
    })
    return (
      <thead>
        <tr>
          <th />
          {diffNodes}
        </tr>
      </thead>
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
      <td
        className={className}
        key={`difficulty-${i}`}
      >
        <span className='level'>{label}</span>
        <ScoreComponent score={score} />
      </td>
    )

  } else {
    return (<td key={`difficulty-${i}`} />)
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
    <tr key={song.id}>
      <td className='song-name'>
        {song.name}
        {(song.english_name) ? <p className='english-name'>{song.english_name}</p> : ''}
      </td>
      {scoreCols}
    </tr>
  )
}

const PlayerComponent: FunctionComponent = () => {
  const { match } = useRouter<{ nickname: string }>()
  const { record, scores, songs, getPlayerResult, showDifficulties, sort } = useMappedState(
    useCallback((state: RootState) => ({
      record: state.laundry.record,
      scores: state.laundry.scores,
      songs: state.laundry.songs,
      getPlayerResult: state.laundry.getPlayerResult,
      showDifficulties: state.laundry.showDifficulties,
      sort: state.laundry.sort
    }), [])
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (!songs || songs.length === 0) {
      dispatch(getSongs.request())
    }
    dispatch(getMe.request())
    dispatch(getPlayer.request(match.params.nickname))
  }, [match.params.nickname])

  const changeShowDifficulties = (e: React.FormEvent, data: CheckboxProps) => (
    dispatch(setShowDifficulties(!!data.checked))
  )
  const changeSort = (e: React.SyntheticEvent, { value }: DropdownProps) => (
    dispatch(setSort(value as Sort))
  )
  if (getPlayerResult) {
    if (getPlayerResult.status === 'err') {
      if (getPlayerResult.err.code === 404) {
        return <div>玩家不存在。</div>
      }
      return <div>發生錯誤，請稍候再試。</div>
    } if (getPlayerResult.status !== 'ok') {
      return <Loader active={true} />
    }
  } else {
    return <Loader active={true} />
  }
  if (!songs || !scores || !record) {
    return <Loader active={true} />
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
        groupKeys = levels.filter(l => l).map(l => `${l}`)
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
    return ({
      key: groupKey,
      title: { content: (
        <Label size='large' ribbon={true}>
          <i className='dropdown icon' />
          {(sort === 'level') ? 'LEVEL ' : ''}
          {(sort === 'version') ? versions.get(parseFloat(groupKey)) : groupKey}
          {' '}({songRows.length})
        </Label>
      )},
      content: { content: (
        <Table className={(showDifficulties || sort === 'level') ? `player-scores sort-${sort}` : `player-scores sort-${sort} hide-difficulties`} lang='ja'>
          {tableHeader(sort)}
          <Table.Body>
            {songRows}
          </Table.Body>
        </Table>
      )}
    })
  })
  return (
    <div>
      <RecordComponent record={record} />
      <div className='player-options'>
        <Button as={Link} to={`/mai/${match.params.nickname}/timeline`}>歷史紀錄</Button>
        排序：
          <Dropdown selection={true} options={sortDropdownOptions} defaultValue='category' onChange={changeSort} />
        {(sort !== 'level') ? <Checkbox toggle={true} label='顯示所有難易度' onChange={changeShowDifficulties} /> : <></>}
      </div>
      <Accordion panels={result} exclusive={false} fluid={true} />
    </div>
  )
}
export default PlayerComponent
