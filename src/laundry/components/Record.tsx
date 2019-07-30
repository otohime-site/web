import React, { FunctionComponent } from 'react'
import Class from './Class'
import { Record } from '../types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const PlayerRecord = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const PlayerName = styled(Typography)`
  font-family: 'M PLUS Rounded 1c';
  font-weight: bold;
`
const PlayerDetail = styled(Typography)`
  font-family: 'M PLUS Rounded 1c';
  margin-left: ${props => props.theme.spacing(1)}px;
`

interface RecordProps {
  record: Record
}

const RecordComponent: FunctionComponent<RecordProps> = ({ record }) => {
  if (!record.card_name) {
    return <PlayerRecord />
  }
  return (
    <PlayerRecord lang='ja'>
      <PlayerName variant='h6' color='primary'>{record.card_name}</PlayerName>
      <Class rawClass={record.class} />
      <PlayerDetail>{record.title}</PlayerDetail>
      <PlayerDetail variant='body2'>
        Rating
        {' '}
        {record.rating.toFixed(2)}
        {' '}
        (Max
        {' ' + record.max_rating.toFixed(2)}
        )
      </PlayerDetail>
    </PlayerRecord>
  )
}
export default RecordComponent
