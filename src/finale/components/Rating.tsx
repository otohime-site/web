import clsx from "clsx"
import classes from "./Rating.module.css"

const getRatingClass = (rating: number) => {
  switch (true) {
    case rating < 2:
      return "normal" as const
    case rating < 4:
      return "blue" as const
    case rating < 7:
      return "green" as const
    case rating < 10:
      return "orange" as const
    case rating < 12:
      return "red" as const
    case rating < 13:
      return "purple" as const
    case rating < 14:
      return "bronze" as const
    case rating < 14.5:
      return "silver" as const
    case rating < 15:
      return "gold" as const
    case isFinite(rating):
      return "rainbow" as const
  }
  return "normal" as const
}

const Rating = ({ rating }: { rating: number }) => (
  <div className={clsx(classes.rating, classes[getRatingClass(rating)])}>
    <span>Rating</span>
    {rating.toFixed(2)}
  </div>
)

export default Rating
