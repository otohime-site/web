import clsx from "clsx"
import { type Difficulty } from "../models/constants"

export const getDifficultyClassName = (
  classes: Record<string, string>,
  entry: {
    difficulty: number
    internal_lv?: number | null
    level: string
  },
  className?: string,
) =>
  clsx(
    className ?? classes["col-difficulty"],
    classes[`difficulty-${entry.difficulty as Difficulty}`],
    entry.internal_lv
      ? ""
      : entry.level.includes("+")
        ? classes["plus"]
        : classes["non-plus"],
  )
