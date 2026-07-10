import { RadioGroup } from "@ark-ui/react/radio-group"
import { ToggleGroup } from "@ark-ui/react/toggle-group"
import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { Switch } from "../../common/components/ui/Switch"
import { categories, levels, versions } from "../models/constants"
import { EMPTY_FILTER, ScoreFilter } from "../models/filter"
import styles from "./Folders.module.css"

// Radio value representing "no condition" in advanced mode
const ANY = "any"

type ArrayFolderKey = "category" | "version" | "level"

interface FolderOption {
  value: number
  label: string
}

// Single-select radio folders, or multi-select (OR-ed) toggles
// when the advanced mode is enabled
const FolderGroup = ({
  advanced,
  values,
  options,
  onChange,
}: {
  advanced: boolean
  values: number[]
  options: FolderOption[]
  onChange: (values: number[]) => void
}) =>
  advanced ? (
    <ToggleGroup.Root
      multiple
      className={styles.group}
      value={values.map((v) => `${v}`)}
      onValueChange={({ value }) => onChange(value.map((v) => parseInt(v, 10)))}
    >
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={`${option.value}`}>
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  ) : (
    <RadioGroup.Root
      className={styles.group}
      value={values.length > 0 ? `${values[0]}` : null}
      onValueChange={({ value }) => {
        if (value == null) return
        onChange([parseInt(value, 10)])
      }}
    >
      {options.map((option) => (
        <RadioGroupItem key={option.value} value={`${option.value}`}>
          {option.label}
        </RadioGroupItem>
      ))}
    </RadioGroup.Root>
  )

const categoryOptions = categories.flatMap((category, index) =>
  category != null ? [{ value: index, label: category }] : [],
)
const versionOptions = versions.map((version, index) => ({
  value: index,
  label: version,
}))
const levelOptions = levels.map((level, index) => ({
  value: index,
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
  const changeDimension = (key: ArrayFolderKey) => (values: number[]) => {
    if (advanced) {
      onFilterChange({ ...filter, [key]: values })
      return
    }
    // Folder mode: keep a single condition, like switching folders
    onFilterChange({
      ...EMPTY_FILTER,
      [key]: values,
      difficulty:
        key === "level"
          ? []
          : filter.difficulty.length > 0
            ? [filter.difficulty[0]]
            : [2],
    })
  }
  const changeRating = (value: boolean | null) => {
    onFilterChange(
      advanced
        ? { ...filter, rating_latest: value }
        : { ...EMPTY_FILTER, rating_latest: value },
    )
  }
  const heading = (label: string, key: ArrayFolderKey) => (
    <h4>
      {label}
      {advanced && filter[key].length > 0 ? (
        <button onClick={() => onFilterChange({ ...filter, [key]: [] })}>
          清除
        </button>
      ) : null}
    </h4>
  )

  return (
    <div className={styles.folders}>
      <h4>Rating 組成</h4>
      <RadioGroup.Root
        className={styles.group}
        value={
          filter.rating_latest != null
            ? `${filter.rating_latest}`
            : advanced
              ? ANY
              : null
        }
        onValueChange={({ value }) => {
          if (value == null) return
          changeRating(value === ANY ? null : value === "true")
        }}
      >
        {advanced ? <RadioGroupItem value={ANY}>不限</RadioGroupItem> : null}
        <RadioGroupItem value="true">新曲</RadioGroupItem>
        <RadioGroupItem value="false">舊曲</RadioGroupItem>
      </RadioGroup.Root>
      {heading("分類", "category")}
      <FolderGroup
        advanced={advanced}
        values={filter.category}
        options={categoryOptions}
        onChange={changeDimension("category")}
      />
      {heading("版本", "version")}
      <FolderGroup
        advanced={advanced}
        values={filter.version}
        options={versionOptions}
        onChange={changeDimension("version")}
      />
      {heading("等級", "level")}
      <FolderGroup
        advanced={advanced}
        values={filter.level}
        options={levelOptions}
        onChange={changeDimension("level")}
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
