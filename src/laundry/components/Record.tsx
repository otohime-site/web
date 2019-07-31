import React, { FunctionComponent } from 'react'
import Class from './Class'
import { Record } from '../types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ShowChartIcon from '@material-ui/icons/ShowChart'

const PlayerRecord = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  & > div, & > p {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: ${props => props.theme.spacing(2)}px;
  }
`
const PlayerName = styled(Typography)`
  font-family: 'M PLUS Rounded 1c';
  font-weight: bold;
  margin-right: ${props => props.theme.spacing(2)}px;
`
const PlayerDetail = styled(Typography)`
  font-family: 'M PLUS Rounded 1c';
  margin-left: ${props => props.theme.spacing(1)}px;
  svg {
    width: 16px;
    height: 16px;
    margin-right: ${props => props.theme.spacing(1)}px;
  }
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
      <div>
        <PlayerName variant='h6' color='primary'>{record.card_name}</PlayerName>
        <Class rawClass={record.class} />
      </div>
      <PlayerDetail variant='body2'>
        <ChatBubbleOutlineIcon />
        {record.title}
      </PlayerDetail>
      <PlayerDetail variant='body2'>
        <ShowChartIcon />
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
