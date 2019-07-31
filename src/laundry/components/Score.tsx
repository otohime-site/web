import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import Flags from './Flags'
import { Score } from '../types'

interface ScoreProps {
  score: Score
}

const StyledScore = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const ScoreValue = styled('span')`
  width: 4.3em;
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
