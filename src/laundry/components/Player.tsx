import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Label, Checkbox, Loader, Table, Button, Dropdown
} from 'semantic-ui-react'
import Score from './Score'
import Record from './Record'
import {
  getPlayer, getSongs, setShowDifficulties, setSort
} from '../actions'
import './Player.css'

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
class Player extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ nickname: PropTypes.string })
    }).isRequired,
    dGetPlayer: PropTypes.func.isRequired,
    dGetSongs: PropTypes.func.isRequired,
    dSetShowDifficulties: PropTypes.func.isRequired,
    dSetSort: PropTypes.func.isRequired,
    record: PropTypes.shape({
      card_name: PropTypes.string,
      class: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
      max_rating: PropTypes.number
    }),
    scores: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      flag: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    }))),
    songs: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      english_name: PropTypes.string,
      japan_only: PropTypes.bool,
      version: PropTypes.number
    })),
    sort: PropTypes.string,
    getPlayerResult: PropTypes.shape({
      status: PropTypes.string,
      err: PropTypes.instanceOf(Error)
    }),
    showDifficulties: PropTypes.bool
  }

  static defaultProps = {
    record: {},
    scores: {},
    songs: [],
    getPlayerResult: {},
    sort: 'category',
    showDifficulties: false
  }

  componentDidMount () {
    const {
      dGetSongs, dGetPlayer, songs, match
    } = this.props
    if (songs.length === 0) {
      dGetSongs()
    }
    dGetPlayer(match.params.nickname)
  }

  componentDidUpdate (prevProps) {
    const { match, dGetPlayer } = this.props
    if (prevProps.match !== match) {
      dGetPlayer(match.params.nickname)
    }
  }

  render () {
    const {
      match, sort, record, songs, scores,
      getPlayerResult, dSetSort, dSetShowDifficulties,
      showDifficulties
    } = this.props
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
        if (scores[song.id]) {
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
    if (getPlayerResult.status === 'err') {
      if (getPlayerResult.err.code === 404) {
        return <div>玩家不存在。</div>
      }
      return <div>發生錯誤，請稍候再試。</div>
    } if (getPlayerResult.status !== 'ok') {
      return <Loader active={true} />
    }
    return (
      <div>
        <Record record={record} />
        <div className='player-options'>
          <Button as={Link} to={`/mai/${match.params.nickname}/timeline`}>歷史紀錄</Button>
          排序：
          <Dropdown selection={true} options={sortDropdownOptions} defaultValue='category' onChange={dSetSort} />
          <Checkbox toggle={true} label='顯示所有難易度' onChange={dSetShowDifficulties} />
        </div>
        <Table className={(showDifficulties) ? 'player-scores' : 'player-scores hide-difficulties'} lang='ja'>
          {tbodies}
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  record: state.laundry.record,
  scores: state.laundry.scores,
  songs: state.laundry.songs,
  getPlayerResult: state.laundry.getPlayerResult,
  showDifficulties: state.laundry.showDifficulties,
  sort: state.laundry.sort
})

const mapDispatchToProps = dispatch => ({
  dGetPlayer: (nickname) => {
    dispatch(getPlayer(nickname))
  },
  dGetSongs: () => {
    dispatch(getSongs())
  },
  dSetShowDifficulties: (e, data) => (
    dispatch(setShowDifficulties(data.checked))
  ),
  dSetSort: (e, { value }) => (
    dispatch(setSort(value))
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
