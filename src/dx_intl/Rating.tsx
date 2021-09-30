import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import Blue from "./ratings/blue.svg"
import Bronze from "./ratings/bronze.svg"
import Gold from "./ratings/gold.svg"
import Green from "./ratings/green.svg"
import Normal from "./ratings/normal.svg"
import Orange from "./ratings/orange.svg"
import Platinum from "./ratings/platinum.svg"
import Purple from "./ratings/purple.svg"
import Rainbow from "./ratings/rainbow.svg"
import Red from "./ratings/red.svg"
import Silver from "./ratings/silver.svg"

const getRatingImage = (rating: number, legacy: boolean): any => {
  if (legacy) {
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
  }
  switch (true) {
    case rating < 1000:
      return Normal
    case rating < 2000:
      return Blue
    case rating < 4000:
      return Green
    case rating < 7000:
      return Orange
    case rating < 10000:
      return Red
    case rating < 12000:
      return Purple
    case rating < 13000:
      return Bronze
    case rating < 14000:
      return Silver
    case rating < 14500:
      return Gold
    case rating < 15000:
      return Platinum
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
  legacy: boolean
}> = ({ rating, legacy }) => (
  <RatingContainer
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    style={{ backgroundImage: `url(${getRatingImage(rating, legacy)}` }}
  >
    {rating}
  </RatingContainer>
)

export default Rating
