import React, { FunctionComponent } from 'react'
import Class from './Class'
import { Record } from '../types'

interface RecordProps {
  record: Record
}

const RecordComponent: FunctionComponent<RecordProps> = ({ record }) => {
  if (!record.card_name) {
    return <div className='player-record' />
  }
  return (
    <div className='player-record' lang='ja'>
      <p className='player-name'>{record.card_name}</p>
      <Class rawClass={record.class} />
      <p className='player-title'>{record.title}</p>
      <p className='player-rating'>
        Rating
        {' '}
        {record.rating.toFixed(2)}
        {' '}
        (Max
        {record.max_rating.toFixed(2)}
        )
      </p>
    </div>
  )
}
export default RecordComponent
