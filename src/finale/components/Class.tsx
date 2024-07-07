import clsx from "clsx"
import { classLevels, classNames } from "../models/constants"
import classes from "./Class.module.css"

const Class = ({ rawClass }: { rawClass: string }) => {
  const classParts = rawClass.split("_")
  const className = classNames[classParts[0]]
  const classLevel = classLevels[(classParts[1] as "08", "09", "10", "11")]
  return (
    <span
      className={clsx(classes["player-class"], classes[`class-${classLevel}`])}
    >
      {className}
    </span>
  )
}

export default Class
