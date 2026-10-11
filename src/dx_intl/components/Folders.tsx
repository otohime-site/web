import { ToggleGroup } from "@ark-ui/react/toggle-group"
import { useMemo } from "react"
import {
  type Difficulty,
  difficultyShortNames,
  displayVersionTitle,
  levels,
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
  versions,
} from "../models/constants"
import {
  EMPTY_FILTER,
  FolderEntry,
  ScoreFilter,
  valueOptions,
} from "../models/filter"
import styles from "./Folders.module.css"

type ArrayFolderKey = "category" | "version" | "level"

interface FolderOption {
  value: string
  label: string
  title?: string
  tag?: string
  className?: string
}

// Single-select folder toggles. Values are strings; callers map to/from
// their own domain.
const FolderGroup = ({
  values,
  options,
  onChange,
  className,
}: {
  values: string[]
  options: FolderOption[]
  onChange: (values: string[]) => void
  className?: string
}) => (
  <ToggleGroup.Root
    className={`${styles.group} ${className ?? ""}`}
    deselectable={false}
    value={values}
    onValueChange={({ value }) => onChange(value)}
  >
    {options.map((option) => (
      <ToggleGroup.Item
        key={option.value}
        value={option.value}
        className={option.className}
      >
        <span className={styles.label}>{option.label}</span>
        {option.title != null || option.tag != null ? (
          <span className={styles.meta}>
            {option.title != null ? (
              <span className={styles.versionTitle}>{option.title}</span>
            ) : null}
            {option.tag != null ? (
              <span className={styles.tag}>{option.tag}</span>
            ) : null}
          </span>
        ) : null}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
)

// Difficulty chips shared with the scores page. The chosen difficulty
// still drives the category/version counts inside the folder dialog.
export const DifficultyFolders = ({
  difficulty,
  onDifficultyChange,
  className,
}: {
  difficulty: number | null
  onDifficultyChange: (difficulty: number | null) => void
  className?: string
}) => {
  const difficultyValues = difficulty == null ? ["all"] : [`${difficulty}`]
  const difficultyOptions: FolderOption[] = [
    { value: "all", label: "全部", className: styles["difficulty-all"] },
    ...difficultyShortNames.map((label, value) => ({
      value: `${value}`,
      label,
      className: styles[`difficulty-${value as Difficulty}`],
    })),
  ]
  const changeDifficulty = (values: string[]) => {
    const next = values[0] ?? "all"
    onDifficultyChange(next === "all" ? null : parseInt(next, 10))
  }
  return (
    <FolderGroup
      values={difficultyValues}
      options={difficultyOptions}
      onChange={changeDifficulty}
      className={`${styles.difficultyGroup} ${className ?? ""}`}
    />
  )
}

const Folders = <Entry extends FolderEntry>({
  entries,
  filter,
  difficulty,
  maxVersion,
  ratingFolders = true,
  getCountKey,
  onFilterChange,
}: {
  entries: Entry[]
  filter: ScoreFilter
  difficulty: number | null
  maxVersion: number
  ratingFolders?: boolean
  // Folders count charts by default. Entries sharing a key count once, e.g.
  // to count songs rather than charts.
  getCountKey?: (entry: Entry) => string
  onFilterChange: (filter: ScoreFilter) => void
}) => {
  // Category/version counts follow the selected difficulty. A null
  // difficulty means every chart, exposed as the "all" option.
  // Level folders always count every difficulty.
  // Rating is single-select: true→新曲, false→舊曲, none→不限 (no rating filter).
  // The rating folders list rating_listed entries only, capped at twice the
  // rating composition counts.
  const { categoryOptions, versionOptions, levelOptions, ratingOptions } =
    useMemo(() => {
      const categoryKeys = new Map<number, Set<string | number>>(
        valueOptions.category.map(({ value }) => [value, new Set()]),
      )
      const newKeySets = (length: number) =>
        Array.from({ length }, () => new Set<string | number>())
      const versionKeys = newKeySets(versions.length)
      const levelKeys = newKeySets(levels.length)
      const ratingKeys = newKeySets(2) // [old, latest]
      entries.forEach((entry, index) => {
        const key = getCountKey?.(entry) ?? index
        const levelIndex = levels.indexOf(entry.level)
        if (levelIndex >= 0) levelKeys[levelIndex].add(key)
        // Preserve the existing Master-based rating folder totals.
        if (entry.difficulty === 3 && entry.rating_latest != null)
          ratingKeys[entry.rating_latest ? 1 : 0].add(key)
        if (difficulty != null && entry.difficulty !== difficulty) return
        categoryKeys.get(entry.category)?.add(key)
        versionKeys[entry.version]?.add(key)
      })
      const categoryCounts = new Map(
        [...categoryKeys].map(([value, keys]) => [value, keys.size]),
      )
      const versionCounts = versionKeys.map((keys) => keys.size)
      const levelCounts = levelKeys.map((keys) => keys.size)
      const ratingCounts = ratingKeys.map((keys) => keys.size)
      return {
        categoryOptions: valueOptions.category.map(({ value, label }) => ({
          value: `${value}`,
          label,
          tag: `${categoryCounts.get(value)}`,
        })),
        // Versions are a static list that runs ahead of the song data
        // during major version updates; hide the not-yet-released ones.
        versionOptions: valueOptions.version
          .filter(({ value }) => value <= maxVersion)
          .map(({ value, label }) => ({
            value: `${value}`,
            label,
            title: displayVersionTitle(value),
            tag: `${versionCounts[value]}`,
          })),
        levelOptions: levels.map((level, index) => ({
          value: `${index}`,
          label: `Lv ${level}`,
          tag: `${levelCounts[index]}`,
        })),
        ratingOptions: [
          {
            value: "true",
            label: "新曲",
            tag: `${Math.min(ratingCounts[1], RATING_NEW_COUNT * 2)}`,
          },
          {
            value: "false",
            label: "舊曲",
            tag: `${Math.min(ratingCounts[0], RATING_OLD_COUNT * 2)}`,
          },
        ],
      }
    }, [entries, difficulty, maxVersion, getCountKey])

  const changeDimension = (key: ArrayFolderKey) => (values: string[]) => {
    const nums = values.map((v) => parseInt(v, 10))
    // Category/version folders retain the explicit difficulty choice.
    const difficultyFilter =
      (key === "category" || key === "version") && difficulty != null
        ? [difficulty]
        : []
    if (nums.length === 0) {
      onFilterChange(EMPTY_FILTER)
      return
    }
    // Otherwise keep a single condition, like switching folders.
    onFilterChange({
      ...EMPTY_FILTER,
      [key]: nums,
      difficulty: difficultyFilter,
    })
  }
  const ratingValues =
    filter.rating_latest != null ? [`${filter.rating_latest}`] : []
  const changeRating = (values: string[]) => {
    const next = values[0]
    const rating_latest = next == null ? null : next === "true"
    onFilterChange({ ...EMPTY_FILTER, rating_latest })
  }

  return (
    <div className={styles.folders}>
      {ratingFolders ? (
        <>
          <h4>Rating 組成</h4>
          <FolderGroup
            values={ratingValues}
            options={ratingOptions}
            onChange={changeRating}
            className={styles.ratingGroup}
          />
        </>
      ) : null}
      <h4>分類</h4>
      <FolderGroup
        values={filter.category.map((v) => `${v}`)}
        options={categoryOptions}
        onChange={changeDimension("category")}
      />
      <h4>版本</h4>
      <FolderGroup
        values={filter.version.map((v) => `${v}`)}
        options={versionOptions}
        onChange={changeDimension("version")}
      />
      <h4>等級</h4>
      <FolderGroup
        values={filter.level.map((v) => `${v}`)}
        options={levelOptions}
        onChange={changeDimension("level")}
        className={styles.levelGroup}
      />
    </div>
  )
}

export default Folders
