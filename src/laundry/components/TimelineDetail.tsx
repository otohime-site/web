import React, { FunctionComponent, useEffect } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
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
            <TableRow>
              <TableCell>
                {song.name}
                {' '}
                {difficulties[i]}
              </TableCell>
              <TableCell>{(beforeScore) ? <Score score={beforeScore} /> : ''}</TableCell>
              <TableCell>{(afterScore) ? <Score score={afterScore} /> : ''}</TableCell>
            </TableRow>
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
      <TableHead>
        <TableRow>
          <TableCell component='th'>What</TableCell>
          <TableCell component='th' style={{ width: '20em' }}>Before</TableCell>
          <TableCell component='th' style={{ width: '20em' }}>After</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Record</TableCell>
          <TableCell>{(beforeRecord) ? <Record record={beforeRecord} /> : ''}</TableCell>
          <TableCell>{(afterRecord) ? <Record record={afterRecord} /> : ''}</TableCell>
        </TableRow>
        {rows}
      </TableBody>
    </Table>
  )
}
export default TimelineDetailComponenet
