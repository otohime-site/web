import React, { FunctionComponent } from "react"
import Normal from "./ratings/normal.svg"
import Blue from "./ratings/blue.svg"
import Green from "./ratings/green.svg"
import Orange from "./ratings/orange.svg"
import Red from "./ratings/red.svg"
import Purple from "./ratings/purple.svg"
import Bronze from "./ratings/bronze.svg"
import Silver from "./ratings/silver.svg"
import Gold from "./ratings/gold.svg"
import Rainbow from "./ratings/rainbow.svg"
import styled from "@emotion/styled"


const getRatingImage = (rating: number): any => {
  switch (true) {
    case rating < 1000:
      return Normal
    case rating < 2000:
      return Blue
    case rating < 3000:
      return Green
    case rating < 4000:
      return Orange
    case rating < 5000:
      return Red
    case rating < 6000:
      return Purple
    case rating < 7000:
      return Bronze
    case rating < 8000:
      return Silver
    case rating < 8500:
      return Gold
    case isFinite(rating):
      return Rainbow
  }
  return Normal
}

const RatingContainer = styled("div")`
  width: 8em;
  height: 2em;
  background-size: cover;
  padding-top: 0.2em;
  padding-right: 0.22em;
  font-family: "M PLUS 1p";
  font-weight: 900;
  text-align: right;
  letter-spacing: 0.22em;
  color: #eecc66;
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
