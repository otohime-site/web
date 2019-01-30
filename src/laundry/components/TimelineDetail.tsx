import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { getTimelineDetail, getSongs } from '../actions'
import { difficulties } from '../consts'
import Record from './Record'
import Score from './Score'

class TimelineDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ nickname: PropTypes.string, time: PropTypes.string })
    }).isRequired,
    dGetTimelineDetail: PropTypes.func.isRequired,
    dGetSongs: PropTypes.func.isRequired,
    timelineDetailRecords: PropTypes.arrayOf(PropTypes.shape({
      card_name: PropTypes.string,
      class: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
      max_rating: PropTypes.number
    })),
    timelineDetailScores: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      flag: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })))),
    songs: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
  }

  static defaultProps = {
    songs: [],
    timelineDetailRecords: [],
    timelineDetailScores: {}
  }

  componentDidMount = async () => {
    const {
      songs, match,
      dGetSongs, dGetTimelineDetail
    } = this.props
    if (songs.length === 0) {
      dGetSongs()
    }
    dGetTimelineDetail(match.params.nickname, match.params.time)
  }

  componentDidUpdate (prevProps) {
    const {
      match, dGetTimelineDetail
    } = this.props
    if (prevProps.match !== match) {
      dGetTimelineDetail(match.params.nickname, match.params.time)
    }
  }

  render () {
    const {
      songs, timelineDetailRecords, timelineDetailScores
    } = this.props
    const beforeRecord = timelineDetailRecords[0]
    const afterRecord = timelineDetailRecords[1]
    console.log(timelineDetailScores) // eslint-disable-line no-console
    const rows = songs.map((song) => {
      const scoresOutput = []
      console.log(timelineDetailScores[song.id]) // eslint-disable-line no-console
      if (timelineDetailScores[song.id]) {
        const scores = timelineDetailScores[song.id]
        for (let i = 0; i < scores.length; i += 1) {
          if (scores[i]) {
            const beforeScore = scores[i][0]
            const afterScore = scores[i][1]
            scoresOutput.push((
              <tr>
                <td>
                  {song.name}
                  {' '}
                  {difficulties[i]}
                </td>
                <td>{(beforeScore) ? <Score score={beforeScore} /> : ''}</td>
                <td>{(afterScore) ? <Score score={afterScore} /> : ''}</td>
              </tr>
            ))
          }
        }
      }
      return (
        scoresOutput
      )
    })
    return (
      <Table lang='ja'>
        <thead>
          <tr>
            <th>What</th>
            <th style={{ width: '20em' }}>Before</th>
            <th style={{ width: '20em' }}>After</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Record</td>
            <td>{(beforeRecord) ? <Record record={beforeRecord} /> : ''}</td>
            <td>{(afterRecord) ? <Record record={afterRecord} /> : ''}</td>
          </tr>
          {rows}
        </tbody>
      </Table>
    )
  }
}
const mapStateToProps = state => ({
  timelineDetailRecords: state.laundry.timelineDetailRecords,
  timelineDetailScores: state.laundry.timelineDetailScores,
  songs: state.laundry.songs
})

const mapDispatchToProps = dispatch => ({
  dGetTimelineDetail: (nickname, time) => {
    dispatch(getTimelineDetail.request({ nickname, time }))
  },
  dGetSongs: () => {
    dispatch(getSongs.request())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TimelineDetail)
