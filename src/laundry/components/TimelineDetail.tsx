import React, { FunctionComponent, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import { getTimelineDetail, getSongs } from '../actions'
import { difficulties } from '../consts'
import Record from './Record'
import Score from './Score'
import useRouter from 'use-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../reducers'

const TimelineDetailComponenet: FunctionComponent = () => {
  const { match } = useRouter<{ nickname: string, time: string }>()
  const timelineDetailRecords = useSelector((state: RootState) => state.laundry.timelineDetailRecords)
  const timelineDetailScores = useSelector((state: RootState) => state.laundry.timelineDetailScores)
  const songs = useSelector((state: RootState) => state.laundry.songs)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!songs || songs.length === 0) {
      dispatch(getSongs.request())
    }
    dispatch(getTimelineDetail.request({
      nickname: match.params.nickname,
      time: match.params.time
    }))
  }, [match.params.nickname, match.params.time])

  if (!songs || !timelineDetailRecords || !timelineDetailScores) {
    return <></>
  }

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
export default TimelineDetailComponenet
