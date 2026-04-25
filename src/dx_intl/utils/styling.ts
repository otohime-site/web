import clsx from "clsx"

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
    classes[`difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4}`],
    entry.internal_lv
      ? ""
      : entry.level.includes("+")
        ? classes["plus"]
        : classes["non-plus"],
  )
