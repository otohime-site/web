import React, { FunctionComponent } from 'react'
import Normal from './ratings/normal.svg'
import styled from '../styled'

const getRatingImage = (rating: number): any => {
  return Normal
}

const RatingContainer = styled('div')`
  width: 8em;
  height: 2em;
  background-size: cover;
  padding-top: 0.2em;
  padding-right: 0.22em;
  font-family: 'M PLUS 1p';
  font-weight: 900;
  text-align: right;
  letter-spacing: 0.22em;
  color: #EECC66;
`

const Rating: FunctionComponent<{
  rating: number
}> = ({ rating }) => (
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  <RatingContainer style={{ backgroundImage: `url(${getRatingImage(rating)}` }}>
    {rating}
  </RatingContainer>
)

export default Rating
