import { ScoreTableEntry } from "./aggregation"
import {
  categories,
  comboFlags,
  difficultyShortNames,
  levels,
  syncFlags,
  versions,
} from "./constants"

// Folder-mode filter: one of the dimensions (besides difficulty) is set
// with a single value, which behaves like the previous folder tabs.
// An empty array means no condition.
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

// The rating folders only list the rating candidates (rating_listed).
export const filterEntry = (
  entry: ScoreTableEntry,
  filter: ScoreFilter,
): boolean =>
  (filter.rating_latest == null ||
    (entry.rating_latest === filter.rating_latest && entry.rating_listed)) &&
  (filter.category.length === 0 || filter.category.includes(entry.category)) &&
  (filter.version.length === 0 || filter.version.includes(entry.version)) &&
  (filter.level.length === 0 ||
    filter.level.includes(levels.indexOf(entry.level))) &&
  (filter.difficulty.length === 0 ||
    filter.difficulty.includes(entry.difficulty))

// Advanced mode: a list of conditions AND-ed together.
// Range conditions hold [min, max] (level as indexes of `levels`,
// internal_lv as the raw chart constant). Values conditions hold values
// OR-ed inside the condition; an empty array matches everything,
// like a freshly added, not yet filled-in condition.
export type RangeConditionKey = "level" | "internal_lv"
export type ValuesConditionKey =
  "category" | "version" | "deluxe" | "difficulty" | "combo_flag" | "sync_flag"
export type ConditionKey = RangeConditionKey | ValuesConditionKey

export type Condition =
  | { key: RangeConditionKey; range: [number, number] }
  | { key: ValuesConditionKey; values: number[] }

export const INTERNAL_LV_MIN = 10
export const INTERNAL_LV_MAX = 15

export const conditionLabels: Record<ConditionKey, string> = {
  level: "等級",
  internal_lv: "譜面定數",
  category: "分類",
  version: "版本",
  deluxe: "譜面類型",
  difficulty: "難易度",
  combo_flag: "Combo 標記",
  sync_flag: "Sync 標記",
}

// Display labels derived from the canonical flag lists, so indexes
// always line up with entry.combo_flag / entry.sync_flag. The empty
// "not achieved yet" flag shows as 無.
export const comboFlagLabels = comboFlags.map((flag) =>
  flag === "" ? "無" : flag.toUpperCase(),
)
export const syncFlagLabels = syncFlags.map((flag) =>
  flag === "" ? "無" : flag === "s" ? "SYNC" : flag.toUpperCase(),
)

// The single source for each values dimension's {value, label} options,
// shared by the advanced-filter chips, the folder chips and the titles.
export const valueOptions: Record<
  ValuesConditionKey,
  Array<{ value: number; label: string }>
> = {
  category: categories.flatMap((category, index) =>
    category != null ? [{ value: index, label: category }] : [],
  ),
  version: versions.map((version, index) => ({ value: index, label: version })),
  deluxe: [
    { value: 0, label: "標準譜面" },
    { value: 1, label: "DX 譜面" },
  ],
  difficulty: difficultyShortNames.map((difficulty, index) => ({
    value: index,
    label: difficulty,
  })),
  combo_flag: comboFlagLabels.map((label, index) => ({ value: index, label })),
  sync_flag: syncFlagLabels.map((label, index) => ({ value: index, label })),
}

// Range conditions start on a narrow, already-effective band so a
// freshly added condition does not list the whole table.
export const defaultCondition = (key: ConditionKey): Condition =>
  key === "level"
    ? { key, range: [levels.indexOf("13"), levels.indexOf("14")] }
    : key === "internal_lv"
      ? { key, range: [13, 14] }
      : { key, values: [] }

// A full-range / nothing-picked condition does not restrict anything.
// Callers avoid listing the whole table until at least one condition
// takes effect.
export const isEffectiveCondition = (condition: Condition): boolean => {
  switch (condition.key) {
    case "level":
      return condition.range[0] > 0 || condition.range[1] < levels.length - 1
    case "internal_lv":
      return (
        condition.range[0] > INTERNAL_LV_MIN ||
        condition.range[1] < INTERNAL_LV_MAX
      )
    default:
      return condition.values.length > 0
  }
}

// Avoid floating point issues on the 0.1-stepped internal lv bounds
const INTERNAL_LV_EPSILON = 1e-6

const matchCondition = (
  entry: ScoreTableEntry,
  condition: Condition,
): boolean => {
  switch (condition.key) {
    case "level": {
      const index = levels.indexOf(entry.level)
      return index >= condition.range[0] && index <= condition.range[1]
    }
    case "internal_lv":
      // Only charts with a known constant can match
      return (
        entry.internal_lv != null &&
        entry.internal_lv >= condition.range[0] - INTERNAL_LV_EPSILON &&
        entry.internal_lv <= condition.range[1] + INTERNAL_LV_EPSILON
      )
    case "category":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.category)
      )
    case "version":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.version)
      )
    case "deluxe":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.deluxe ? 1 : 0)
      )
    case "difficulty":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.difficulty)
      )
    case "combo_flag":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.combo_flag)
      )
    case "sync_flag":
      return (
        condition.values.length === 0 ||
        condition.values.includes(entry.sync_flag)
      )
  }
}

export const filterEntryConditions = (
  entry: ScoreTableEntry,
  conditions: Condition[],
): boolean => conditions.every((condition) => matchCondition(entry, condition))

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

// A full range is a no-op condition and gets no title part
const getRangeTitle = (
  range: [number, number],
  fullRange: [number, number],
  label: string,
  getName: (value: number) => string,
): string | null =>
  range[0] === fullRange[0] && range[1] === fullRange[1]
    ? null
    : range[0] === range[1]
      ? `${label} ${getName(range[0])}`
      : `${label} ${getName(range[0])}〜${getName(range[1])}`

const optionLabel = (key: ValuesConditionKey, value: number): string =>
  valueOptions[key].find((option) => option.value === value)?.label ?? ""

const getConditionTitle = (condition: Condition): string | null => {
  switch (condition.key) {
    case "level":
      return getRangeTitle(
        condition.range,
        [0, levels.length - 1],
        "Lv",
        (v) => levels[v],
      )
    case "internal_lv":
      return getRangeTitle(
        condition.range,
        [INTERNAL_LV_MIN, INTERNAL_LV_MAX],
        "定數",
        (v) => v.toFixed(1),
      )
    // The flag names alone (無, FC, …) are ambiguous between the two
    // flag dimensions, so single values keep a Combo/Sync prefix.
    case "combo_flag":
      return getDimensionTitle(
        condition.values,
        "Combo",
        (v) => `Combo ${optionLabel(condition.key, v)}`,
      )
    case "sync_flag":
      return getDimensionTitle(
        condition.values,
        "Sync",
        (v) => `Sync ${optionLabel(condition.key, v)}`,
      )
    default:
      return getDimensionTitle(
        condition.values,
        conditionLabels[condition.key],
        (v) => optionLabel(condition.key, v),
      )
  }
}

export const getConditionsTitle = (conditions: Condition[]): string => {
  const parts = conditions.map(getConditionTitle).filter((part) => part != null)
  return parts.length > 0 ? parts.join("・") : "全曲"
}
