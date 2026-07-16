import { ToggleGroup } from "@ark-ui/react/toggle-group"
import { Fragment } from "react"
import IconClose from "~icons/mdi/close"
import IconPlus from "~icons/mdi/plus"
import { Menu } from "../../common/components/ui/Menu"
import { Slider } from "../../common/components/ui/Slider"
import { Switch } from "../../common/components/ui/Switch"
import {
  categories,
  difficultyShortNames,
  levels,
  versions,
} from "../models/constants"
import {
  Condition,
  ConditionKey,
  INTERNAL_LV_MAX,
  INTERNAL_LV_MIN,
  ValuesConditionKey,
  comboFlagLabels,
  conditionLabels,
  defaultCondition,
  isEffectiveCondition,
  syncFlagLabels,
} from "../models/filter"
import styles from "./AdvancedFilter.module.css"

const conditionKeys = Object.keys(conditionLabels) as ConditionKey[]

const valueOptions: Record<
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

// Values inside a condition are OR-ed; nothing selected means no restriction.
const ValueChips = ({
  values,
  options,
  onChange,
}: {
  values: number[]
  options: Array<{ value: number; label: string }>
  onChange: (values: number[]) => void
}) => (
  <ToggleGroup.Root
    multiple
    className={styles.chips}
    value={values.map((value) => `${value}`)}
    onValueChange={({ value }) => {
      onChange(value.map((v) => parseInt(v, 10)))
    }}
  >
    {options.map((option) => (
      <ToggleGroup.Item key={option.value} value={`${option.value}`}>
        {option.label}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
)

const ConditionEditor = ({
  condition,
  onChange,
}: {
  condition: Condition
  onChange: (condition: Condition) => void
}) => {
  switch (condition.key) {
    case "level":
      return (
        <Slider
          min={0}
          max={levels.length - 1}
          step={1}
          value={condition.range}
          valueText={`${levels[condition.range[0]]} 〜 ${
            levels[condition.range[1]]
          }`}
          onValueChange={({ value }) => {
            onChange({ ...condition, range: [value[0], value[1]] })
          }}
        />
      )
    case "internal_lv":
      return (
        <>
          <Slider
            min={INTERNAL_LV_MIN}
            max={INTERNAL_LV_MAX}
            step={0.1}
            value={condition.range}
            valueText={`${condition.range[0].toFixed(1)} 〜 ${condition.range[1].toFixed(1)}`}
            onValueChange={({ value }) => {
              onChange({ ...condition, range: [value[0], value[1]] })
            }}
          />
          <p className={styles.note}>只會列出已知譜面定數的譜面。</p>
        </>
      )
    default:
      return (
        <ValueChips
          values={condition.values}
          options={valueOptions[condition.key]}
          onChange={(values) => {
            onChange({ ...condition, values })
          }}
        />
      )
  }
}

// Advanced search: conditions are picked into a to-do like list,
// with every listed condition AND-ed together. To avoid listing the
// whole table by accident, nothing shows until a condition takes
// effect or the show-all switch is explicitly turned on.
const AdvancedFilter = ({
  conditions,
  showAll,
  onConditionsChange,
  onShowAllChange,
}: {
  conditions: Condition[]
  showAll: boolean
  onConditionsChange: (conditions: Condition[]) => void
  onShowAllChange: (showAll: boolean) => void
}) => (
  <div className={styles.advanced}>
    {conditions.some(isEffectiveCondition) ? null : (
      <div className={styles.showAll}>
        <p className={styles.hint}>
          還沒有生效的條件。加入條件，或是直接顯示全部譜面：
        </p>
        <Switch
          checked={showAll}
          onCheckedChange={({ checked }) => onShowAllChange(checked)}
        >
          顯示全部譜面
        </Switch>
      </div>
    )}
    {conditions.length === 0 ? null : (
      <ul className={styles.list}>
        {conditions.map((condition, index) => (
          <Fragment key={condition.key}>
            {index > 0 ? (
              <li aria-hidden className={styles.and}>
                且
              </li>
            ) : null}
            <li className={styles.condition}>
              <div className={styles.head}>
                <span className={styles.name}>
                  {conditionLabels[condition.key]}
                </span>
                <button
                  aria-label={`移除${conditionLabels[condition.key]}條件`}
                  onClick={() => {
                    onConditionsChange(
                      conditions.filter((c) => c.key !== condition.key),
                    )
                  }}
                >
                  <IconClose />
                </button>
              </div>
              <ConditionEditor
                condition={condition}
                onChange={(changed) => {
                  onConditionsChange(
                    conditions.map((c) =>
                      c.key === condition.key ? changed : c,
                    ),
                  )
                }}
              />
            </li>
          </Fragment>
        ))}
      </ul>
    )}
    <Menu
      trigger={
        <span className={styles.addTrigger}>
          <IconPlus /> 加入條件
        </span>
      }
      items={conditionKeys.map((key) => ({
        value: key,
        label: conditionLabels[key],
        disabled: conditions.some((condition) => condition.key === key),
        onSelect: () => {
          onConditionsChange([...conditions, defaultCondition(key)])
        },
      }))}
    />
  </div>
)

export default AdvancedFilter
