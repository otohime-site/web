import Blue from "../images/ratings/blue.svg"
import Bronze from "../images/ratings/bronze.svg"
import Gold from "../images/ratings/gold.svg"
import Green from "../images/ratings/green.svg"
import Normal from "../images/ratings/normal.svg"
import Orange from "../images/ratings/orange.svg"
import Platinum from "../images/ratings/platinum.svg"
import Purple from "../images/ratings/purple.svg"
import Rainbow from "../images/ratings/rainbow.svg"
import Red from "../images/ratings/red.svg"
import Silver from "../images/ratings/silver.svg"
import classes from "./Rating.module.css"

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

const Rating = ({ rating, legacy }: { rating: number; legacy: boolean }) => (
  <div
    className={classes.rating}
    style={{ backgroundImage: `url(${getRatingImage(rating, legacy)}` }}
  >
    {rating}
  </div>
)

export default Rating
