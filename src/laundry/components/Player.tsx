import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { Link } from 'react-router-dom'
import useRouter from 'use-react-router'
import { Label, Checkbox, Loader, Table, Button, Dropdown, CheckboxProps, DropdownProps } from 'semantic-ui-react'
import Score from './Score'
import Record from './Record'
import {
  getPlayer, getSongs, setShowDifficulties, setSort, getMe
} from '../actions'
import './Player.css'
import { RootState } from '../../reducers'
import { Sort } from '../types'

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
  if (!songs || !scores || !record) {
    return <Loader active={true} />
  }
  const tbodies = []
  let songGroups = new Map()
  // Assume sortBy to be 'category' for unexpected values.
  for (let i = 0; i < songs.length; i += 1) {
    const song = songs[i]
    const { active, category, version } = song
    let groupKey = category
    if (sort === 'version') {
      groupKey = version
    }
    if (!songGroups.has(groupKey)) {
      songGroups.set(groupKey, [])
    }
    if (active) {
      songGroups.get(groupKey).push(song)
    }
  }
  if (sort === 'version') {
    songGroups = new Map([...songGroups.entries()].sort())
  }
  // Render song groups as <tbody>s.
  songGroups.forEach((songsInGroup, groupKey) => {
    const rows = []
    rows.push((// eslint-disable-next-line react/no-array-index-key
      <tr key={groupKey}>
        <th><Label size='large' ribbon={true}>{(sort === 'version') ? versions.get(groupKey) : groupKey}</Label></th>
        <th className='score difficulty-0'>Easy</th>
        <th className='score difficulty-1'>Basic</th>
        <th className='score difficulty-2'>Advanced</th>
        <th className='score difficulty-3'>Expert</th>
        <th className='score difficulty-4'>Master</th>
        <th className='score difficulty-5'>Re:Master</th>
      </tr>
    ))
    songsInGroup.forEach((song) => {
      const scoresOutput = []
      if (scores && scores[song.id]) {
        const scoresOfSong = scores[song.id]
        for (let j = 0; j < scoresOfSong.length; j += 1) {
          if (scoresOfSong[j]) {
            const score = scoresOfSong[j]
            let className = `score difficulty-${j}`
            if (score.score === 0) {
              className += ' score-zero'
            }
            scoresOutput.push((
              <td
                className={className}
                key={`difficulty-${j}`}
              >
                <span className='level'>{(song.levels) ? song.levels[j] : ''}</span>
                <Score score={score} />
              </td>
            ))
          } else {
            scoresOutput.push((<td key={`difficulty-${j}`} />))
          }
        }
      }
      rows.push((
        <tr key={song.id}>
          <td className='song-name'>
            {song.name}
            {(song.english_name) ? <p className='english-name'>{song.english_name}</p> : ''}
          </td>
          {scoresOutput}
        </tr>
      ))
    })
    tbodies.push((
      <tbody>
        {rows}
      </tbody>
    ))
  })
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
  return (
    <div>
      <Record record={record} />
      <div className='player-options'>
        <Button as={Link} to={`/mai/${match.params.nickname}/timeline`}>歷史紀錄</Button>
        排序：
          <Dropdown selection={true} options={sortDropdownOptions} defaultValue='category' onChange={changeSort} />
        <Checkbox toggle={true} label='顯示所有難易度' onChange={changeShowDifficulties} />
      </div>
      <Table className={(showDifficulties) ? 'player-scores' : 'player-scores hide-difficulties'} lang='ja'>
        {tbodies}
      </Table>
    </div>
  )
}

export default PlayerComponent
