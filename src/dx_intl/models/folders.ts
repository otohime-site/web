import { levels, versions } from "./constants"
import {
  DEFAULT_FILTER,
  EMPTY_FILTER,
  ScoreFilter,
  valueOptions,
} from "./filter"

// Folder URL values (`?folder=`), shared by the pages listing folders.
export type FolderQuery =
  | "rating-new"
  | "rating-old"
  | "filters"
  | "all"
  | `category-${number}`
  | `version-${number}`
  | `level${LevelQueryFragment}`

type LevelQueryFragment<Level extends string = (typeof levels)[number]> =
  Level extends `${infer Value}+` ? `${Value}p` : Level

export const getLevelQueryFragment = (
  level: (typeof levels)[number],
): LevelQueryFragment =>
  (level.endsWith("+") ? `${level.slice(0, -1)}p` : level) as LevelQueryFragment

export const getLevelIndex = (fragment: string): number =>
  levels.findIndex((level) => getLevelQueryFragment(level) === fragment)

export const isFolderValue = (value: string): value is FolderQuery => {
  if (
    value === "rating-new" ||
    value === "rating-old" ||
    value === "filters" ||
    value === "all"
  ) {
    return true
  }
  if (value.startsWith("level")) {
    return levels.some(
      (level) => value === `level${getLevelQueryFragment(level)}`,
    )
  }
  const match = /^(category|version)-(\d+)$/.exec(value)
  if (match == null) return false
  const index = Number(match[2])
  switch (match[1]) {
    case "category":
      return valueOptions.category.some((option) => option.value === index)
    case "version":
      return index >= 0 && index < versions.length
    default:
      return false
  }
}

export const getFolderFilter = (
  folder: FolderQuery,
  difficulty: number | null,
): ScoreFilter => {
  if (folder === "rating-new") return DEFAULT_FILTER
  if (folder === "rating-old") {
    return { ...EMPTY_FILTER, rating_latest: false }
  }
  if (folder.startsWith("level")) {
    const index = getLevelIndex(folder.slice("level".length))
    return { ...EMPTY_FILTER, level: index < 0 ? [] : [index] }
  }
  const match = /^(category|version)-(\d+)$/.exec(folder)
  if (match == null) return EMPTY_FILTER
  const value = Number(match[2])
  const difficultyFilter =
    (match[1] === "category" || match[1] === "version") && difficulty != null
      ? [difficulty]
      : []
  return {
    ...EMPTY_FILTER,
    [match[1]]: [value],
    difficulty: difficultyFilter,
  }
}

// `fallback` is used when the filter has no folder dimension set.
export const getFolderQuery = (
  filter: ScoreFilter,
  fallback: FolderQuery,
): FolderQuery => {
  if (filter.rating_latest != null) {
    return filter.rating_latest ? "rating-new" : "rating-old"
  }
  if (filter.category.length > 0) return `category-${filter.category[0]}`
  if (filter.version.length > 0) return `version-${filter.version[0]}`
  if (filter.level.length > 0) {
    const level = levels[filter.level[0]]
    return level == null ? fallback : `level${getLevelQueryFragment(level)}`
  }
  return fallback
}
