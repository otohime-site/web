import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import Flags from './Flags'
import { Score } from '../types'

interface ScoreProps {
  score: Score
}

const StyledScore = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
  align-items: center;
`
const ScoreValue = styled('span')`
  width: 6em;
  text-align: right;
`

const ScoreComponent: FunctionComponent<ScoreProps> = ({ score }) => {
  return (
    <StyledScore>
      <ScoreValue>{(score.score > 0) ? `${score.score.toFixed(2)}%` : ''}</ScoreValue>
      <Flags rawFlags={score.flag} />
    </StyledScore>
  )
}

export default ScoreComponent
