import { ToggleGroup } from "@ark-ui/react/toggle-group"
import { Switch } from "../../common/components/ui/Switch"
import { categories, levels, versions } from "../models/constants"
import { EMPTY_FILTER, ScoreFilter } from "../models/filter"
import styles from "./Folders.module.css"

type ArrayFolderKey = "category" | "version" | "level"

interface FolderOption {
  value: string
  label: string
}

// Single-select folders, or multi-select (OR-ed) toggles when `multiple`.
// Values are strings; callers map to/from their own domain.
const FolderGroup = ({
  multiple,
  values,
  options,
  onChange,
  className,
}: {
  multiple: boolean
  values: string[]
  options: FolderOption[]
  onChange: (values: string[]) => void
  className?: string
}) => (
  <ToggleGroup.Root
    multiple={multiple}
    className={`${styles.group} ${className ?? ""}`}
    value={values}
    onValueChange={({ value }) => {
      // Clearing the last chip is allowed and lands on the "all songs" view.
      onChange(value)
    }}
  >
    {options.map((option) => (
      <ToggleGroup.Item key={option.value} value={option.value}>
        {option.label}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
)

const categoryOptions = categories.flatMap((category, index) =>
  category != null ? [{ value: `${index}`, label: category }] : [],
)
const versionOptions = versions.map((version, index) => ({
  value: `${index}`,
  label: version,
}))
const levelOptions = levels.map((level, index) => ({
  value: `${index}`,
  label: level,
}))

const Folders = ({
  filter,
  advanced,
  onFilterChange,
  onAdvancedChange,
}: {
  filter: ScoreFilter
  advanced: boolean
  onFilterChange: (filter: ScoreFilter) => void
  onAdvancedChange: (advanced: boolean) => void
}) => {
  const changeDimension = (key: ArrayFolderKey) => (values: string[]) => {
    const nums = values.map((v) => parseInt(v, 10))
    if (advanced) {
      onFilterChange({ ...filter, [key]: nums })
      return
    }
    // Folder mode: clearing the folder lands on the empty "all songs" filter.
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
  // Rating is single-select: true→新曲, false→舊曲, none→不限 (no rating filter).
  const ratingOptions = [
    { value: "true", label: "新曲" },
    { value: "false", label: "舊曲" },
  ]
  const ratingValues =
    filter.rating_latest != null ? [`${filter.rating_latest}`] : []
  const changeRating = (values: string[]) => {
    const next = values[0]
    const rating_latest = next == null ? null : next === "true"
    onFilterChange(
      advanced
        ? { ...filter, rating_latest }
        : { ...EMPTY_FILTER, rating_latest },
    )
  }
  const heading = (label: string, key: ArrayFolderKey | "rating_latest") => (
    <h4>
      {label}
      {advanced ? (
        <button
          onClick={() =>
            onFilterChange({
              ...filter,
              [key]: key === "rating_latest" ? null : [],
            })
          }
        >
          清除
        </button>
      ) : null}
    </h4>
  )

  return (
    <div className={styles.folders}>
      {heading("Rating 組成", "rating_latest")}
      <FolderGroup
        multiple={false}
        values={ratingValues}
        options={ratingOptions}
        onChange={changeRating}
        className={styles.ratingGroup}
      />
      {heading("分類", "category")}
      <FolderGroup
        multiple={advanced}
        values={filter.category.map((v) => `${v}`)}
        options={categoryOptions}
        onChange={changeDimension("category")}
      />
      {heading("版本", "version")}
      <FolderGroup
        multiple={advanced}
        values={filter.version.map((v) => `${v}`)}
        options={versionOptions}
        onChange={changeDimension("version")}
      />
      {heading("等級", "level")}
      <FolderGroup
        multiple={advanced}
        values={filter.level.map((v) => `${v}`)}
        options={levelOptions}
        onChange={changeDimension("level")}
        className={styles.levelGroup}
      />
      <h4>進階篩選</h4>
      <Switch
        checked={advanced}
        onCheckedChange={({ checked }) => onAdvancedChange(checked)}
      >
        組合多個條件
      </Switch>
    </div>
  )
}

export default Folders
