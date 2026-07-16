import { ToggleGroup } from "@ark-ui/react/toggle-group"
import { useMemo } from "react"
import { ScoreTableEntry } from "../models/aggregation"
import {
  categories,
  levels,
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
  versions,
  versionTitles,
} from "../models/constants"
import { EMPTY_FILTER, ScoreFilter } from "../models/filter"
import styles from "./Folders.module.css"

type ArrayFolderKey = "category" | "version" | "level"

interface FolderOption {
  value: string
  label: string
  title?: string
  tag?: string
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
    value={values}
    onValueChange={({ value }) => {
      // Clearing the last chip is allowed and lands on the "all songs" view.
      onChange(value)
    }}
  >
    {options.map((option) => (
      <ToggleGroup.Item key={option.value} value={option.value}>
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

const Folders = ({
  entries,
  filter,
  onFilterChange,
}: {
  entries: ScoreTableEntry[]
  filter: ScoreFilter
  onFilterChange: (filter: ScoreFilter) => void
}) => {
  // Song counts per folder: Master charts for rating/category/version,
  // while level folders list every difficulty so all charts are counted.
  // Rating is single-select: true→新曲, false→舊曲, none→不限 (no rating filter).
  // The rating folders list rating_listed entries only, capped at twice the
  // rating composition counts.
  const { categoryOptions, versionOptions, levelOptions, ratingOptions } =
    useMemo(() => {
      const categoryCounts = new Array<number>(categories.length).fill(0)
      const versionCounts = new Array<number>(versions.length).fill(0)
      const levelCounts = new Array<number>(levels.length).fill(0)
      const ratingCounts = [0, 0] // [old, latest]
      for (const entry of entries) {
        const levelIndex = levels.indexOf(entry.level)
        if (levelIndex >= 0) levelCounts[levelIndex]++
        if (entry.difficulty !== 3) continue
        if (entry.category in categoryCounts) categoryCounts[entry.category]++
        if (entry.version in versionCounts) versionCounts[entry.version]++
        ratingCounts[entry.rating_latest ? 1 : 0]++
      }
      return {
        categoryOptions: categories.flatMap((category, index) =>
          category != null
            ? [
                {
                  value: `${index}`,
                  label: category,
                  tag: `${categoryCounts[index]}`,
                },
              ]
            : [],
        ),
        versionOptions: versions.map((version, index) => ({
          value: `${index}`,
          label: version,
          title:
            index === 0 ? versionTitles[1] : versionTitles[index] || undefined,
          tag: `${versionCounts[index]}`,
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
    }, [entries])

  const changeDimension = (key: ArrayFolderKey) => (values: string[]) => {
    const nums = values.map((v) => parseInt(v, 10))
    // Clearing the folder lands on the empty "all songs" filter.
    if (nums.length === 0) {
      onFilterChange(EMPTY_FILTER)
      return
    }
    // Otherwise keep a single condition, like switching folders.
    onFilterChange({
      ...EMPTY_FILTER,
      [key]: nums,
      difficulty:
        key === "level"
          ? []
          : filter.difficulty.length > 0
            ? [filter.difficulty[0]]
            : [2],
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
      <h4>Rating 組成</h4>
      <FolderGroup
        values={ratingValues}
        options={ratingOptions}
        onChange={changeRating}
        className={styles.ratingGroup}
      />
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
