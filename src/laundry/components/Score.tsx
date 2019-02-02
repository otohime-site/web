import React, { FunctionComponent } from 'react'
import Flags from './Flags'
import { Score } from '../types'

interface ScoreProps {
  score: Score
}

const ScoreComponent: FunctionComponent<ScoreProps> = ({ score }) => {
  return (
    <span>
      {(score.score > 0) ? `${score.score.toFixed(2)}%` : ''}
      {' '}
      <Flags rawFlags={score.flag} />
    </span>
  )
}

export default ScoreComponent
