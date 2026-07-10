import { ScoreTableEntry } from "./aggregation"
import { categories, difficultyShortNames, levels, versions } from "./constants"

// Score table filter replacing the previous single-key grouping.
// In folder mode only one of the dimensions (besides difficulty) is set
// with a single value, which behaves like the previous folder tabs.
// Advanced mode allows combining all of them, with multiple values
// (OR-ed) inside each dimension. An empty array means no condition.
export interface ScoreFilter {
  rating_latest: boolean | null
  category: number[]
  version: number[]
  level: number[]
  difficulty: number[]
}

export const EMPTY_FILTER: ScoreFilter = {
  rating_latest: null,
  category: [],
  version: [],
  level: [],
  difficulty: [],
}

// Matches the previous default: the new songs rating folder
export const DEFAULT_FILTER: ScoreFilter = {
  ...EMPTY_FILTER,
  rating_latest: true,
}

// In folder mode the rating folders only list the rating candidates,
// while advanced mode treats it as a plain new/old songs condition.
export const filterEntry = (
  entry: ScoreTableEntry,
  filter: ScoreFilter,
  advanced: boolean,
): boolean =>
  (filter.rating_latest == null ||
    (entry.rating_latest === filter.rating_latest &&
      (advanced || entry.rating_listed))) &&
  (filter.category.length === 0 || filter.category.includes(entry.category)) &&
  (filter.version.length === 0 || filter.version.includes(entry.version)) &&
  (filter.level.length === 0 ||
    filter.level.includes(levels.indexOf(entry.level))) &&
  (filter.difficulty.length === 0 ||
    filter.difficulty.includes(entry.difficulty))

// Collapse an advanced filter into a single-folder one
export const toFolderFilter = (filter: ScoreFilter): ScoreFilter => {
  const folderDifficulty =
    filter.difficulty.length > 0 ? [filter.difficulty[0]] : [2]
  return filter.rating_latest != null
    ? { ...EMPTY_FILTER, rating_latest: filter.rating_latest }
    : filter.category.length > 0
      ? {
          ...EMPTY_FILTER,
          category: [filter.category[0]],
          difficulty: folderDifficulty,
        }
      : filter.version.length > 0
        ? {
            ...EMPTY_FILTER,
            version: [filter.version[0]],
            difficulty: folderDifficulty,
          }
        : filter.level.length > 0
          ? { ...EMPTY_FILTER, level: [filter.level[0]] }
          : DEFAULT_FILTER
}

// Single value shows its own name, multiple values are summarized
// to keep the title short
const getDimensionTitle = (
  values: number[],
  label: string,
  getName: (value: number) => string,
): string | null =>
  values.length === 0
    ? null
    : values.length === 1
      ? getName(values[0])
      : `${label} ×${values.length}`

export const getFilterTitle = (filter: ScoreFilter): string => {
  const parts = [
    filter.rating_latest == null
      ? null
      : filter.rating_latest
        ? "新曲"
        : "舊曲",
    getDimensionTitle(filter.category, "分類", (v) => categories[v] ?? ""),
    getDimensionTitle(filter.version, "版本", (v) => versions[v]),
    getDimensionTitle(filter.level, "等級", (v) => `Level ${levels[v]}`),
    getDimensionTitle(
      filter.difficulty,
      "難易度",
      (v) => difficultyShortNames[v],
    ),
  ].filter((part) => part != null)
  return parts.length > 0 ? parts.join("・") : "全曲"
}
