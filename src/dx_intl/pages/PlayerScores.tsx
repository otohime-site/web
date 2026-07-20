import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import { Select, createListCollection } from "@ark-ui/react/select"
import { Toggle } from "@ark-ui/react/toggle"
import clsx from "clsx"
import saveAs from "file-saver"
import { createParser, parseAsJson, useQueryStates } from "nuqs"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
import IconFolder from "~icons/mdi/folder"
import IconSortVariant from "~icons/mdi/sort-variant"
import IconUpdate from "~icons/mdi/update"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
import { SelectContainer } from "../../common/components/ui/SelectContainer"
import { Switch } from "../../common/components/ui/Switch"
import { formatDateTime, formatRelative } from "../../common/utils/datetime"
import { useTable } from "../../common/utils/table"
import AdvancedFilter from "../components/AdvancedFilter"
import { ComboFlag, SyncFlag } from "../components/Flags"
import Folders, { DifficultyFolders } from "../components/Folders"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import { ScoreTableEntry, getScoreStats } from "../models/aggregation"
import {
  RANK_SCORES,
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
  categories,
  comboFlags,
  difficulties,
  levelCompareKey,
  levels,
  syncFlags,
  versions,
} from "../models/constants"
import {
  Condition,
  ConditionKey,
  DEFAULT_FILTER,
  EMPTY_FILTER,
  INTERNAL_LV_MAX,
  INTERNAL_LV_MIN,
  ScoreFilter,
  ValuesConditionKey,
  filterEntry,
  filterEntryConditions,
  getConditionsTitle,
  getFilterTitle,
  isEffectiveCondition,
  valueOptions,
} from "../models/filter"
import playerClasses from "./Player.module.css"
import classes from "./PlayerScores.module.css"

type FolderQuery =
  | "rating-new"
  | "rating-old"
  | "filters"
  | "all"
  | `category-${number}`
  | `version-${number}`
  | `level-${number}`

type FolderDifficulty = number | "all"

type Ordering =
  | "index"
  | "level"
  | "internal_lv"
  | "score"
  | "rating"
  | "combo_flag"
  | "sync_flag"
  | "sss_rate"
  | "fc_rate"
  | "ap_rate"

const DEFAULT_FOLDER: FolderQuery = "rating-new"
const DEFAULT_FOLDER_DIFFICULTY = difficulties.indexOf("Expert")

const isFolderValue = (value: string): value is FolderQuery => {
  if (
    value === "rating-new" ||
    value === "rating-old" ||
    value === "filters" ||
    value === "all"
  ) {
    return true
  }
  const match = /^(category|version|level)-(\d+)$/.exec(value)
  if (match == null) return false
  const index = Number(match[2])
  switch (match[1]) {
    case "category":
      return valueOptions.category.some((option) => option.value === index)
    case "version":
      return index >= 0 && index < versions.length
    case "level":
      return index >= 0 && index < levels.length
    default:
      return false
  }
}

const folderParser = createParser<FolderQuery>({
  // Keep old shared links working; the effect in PlayerScores rewrites the
  // legacy spelling to the canonical folder=filters value.
  parse: (value) =>
    value === "advance" ? "filters" : isFolderValue(value) ? value : null,
  serialize: String,
}).withDefault(DEFAULT_FOLDER)

const folderDifficultyParser = createParser<FolderDifficulty>({
  parse: (value) => {
    if (value === "all") return value
    if (!/^\d+$/.test(value)) return null
    const difficulty = Number(value)
    return Number.isInteger(difficulty) &&
      difficulty >= 0 &&
      difficulty < difficulties.length
      ? difficulty
      : null
  },
  serialize: String,
}).withDefault(DEFAULT_FOLDER_DIFFICULTY)

const conditionKeys = new Set<ConditionKey>([
  "level",
  "internal_lv",
  "category",
  "version",
  "deluxe",
  "difficulty",
  "combo_flag",
  "sync_flag",
])

const isCondition = (value: unknown): value is Condition => {
  if (value == null || typeof value !== "object" || !("key" in value)) {
    return false
  }
  const key = value.key
  if (typeof key !== "string" || !conditionKeys.has(key as ConditionKey)) {
    return false
  }
  if (key === "level" || key === "internal_lv") {
    if (!("range" in value) || !Array.isArray(value.range)) return false
    if (
      value.range.length !== 2 ||
      !value.range.every(
        (bound) => typeof bound === "number" && Number.isFinite(bound),
      ) ||
      value.range[0] > value.range[1]
    ) {
      return false
    }
    return key === "level"
      ? value.range.every(
          (bound) =>
            Number.isInteger(bound) && bound >= 0 && bound < levels.length,
        )
      : value.range[0] >= INTERNAL_LV_MIN && value.range[1] <= INTERNAL_LV_MAX
  }
  if (!("values" in value) || !Array.isArray(value.values)) return false
  const validValues = new Set(
    valueOptions[key as ValuesConditionKey].map((option) => option.value),
  )
  return value.values.every(
    (item) => typeof item === "number" && validValues.has(item),
  )
}

const conditionsParser = parseAsJson<Condition[]>((value) =>
  Array.isArray(value) && value.every(isCondition) ? value : null,
).withDefault([])

const scoreQueryParsers = {
  folder: folderParser,
  filter: conditionsParser,
  difficulty: folderDifficultyParser,
}

const orderingCollection = createListCollection({
  items: [
    { group: "譜面", value: "index", label: "預設" },
    { group: "譜面", value: "level", label: "樂曲等級" },
    { group: "譜面", value: "internal_lv", label: "譜面定數" },
    { group: "成績單", value: "score", label: "成績" },
    { group: "成績單", value: "rating", label: "Rating 分數" },
    { group: "成績單", value: "combo_flag", label: "Combo 標記" },
    { group: "成績單", value: "sync_flag", label: "Sync 標記" },
    { group: "玩家統計", value: "sss_rate", label: "SSS Rate" },
    { group: "玩家統計", value: "fc_rate", label: "FC Rate" },
    { group: "玩家統計", value: "ap_rate", label: "AP Rate" },
  ],
  groupBy: (item) => item.group,
})

const getFolderFilter = (
  folder: FolderQuery,
  difficulty: number | null,
): ScoreFilter => {
  if (folder === "rating-new") return DEFAULT_FILTER
  if (folder === "rating-old") {
    return { ...EMPTY_FILTER, rating_latest: false }
  }
  const match = /^(category|version|level)-(\d+)$/.exec(folder)
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

const getFolderQuery = (filter: ScoreFilter): FolderQuery => {
  if (filter.rating_latest != null) {
    return filter.rating_latest ? "rating-new" : "rating-old"
  }
  if (filter.category.length > 0) return `category-${filter.category[0]}`
  if (filter.version.length > 0) return `version-${filter.version[0]}`
  if (filter.level.length > 0) return `level-${filter.level[0]}`
  return DEFAULT_FOLDER
}

interface PlayerScoresProps {
  allEntries: ScoreTableEntry[]
  afterCircle: boolean
  nickname: string
  updatedAt?: string | null
  toolbarContainer: HTMLDivElement | null
}

const PlayerScores = memo(function PlayerScores({
  allEntries,
  afterCircle,
  nickname,
  updatedAt,
  toolbarContainer,
}: PlayerScoresProps) {
  const [scoreQuery, setScoreQuery] = useQueryStates(scoreQueryParsers)
  const { folder, filter: conditions, difficulty: difficultyQuery } = scoreQuery
  const advanced = folder === "filters" || folder === "all"
  const showAll = folder === "all"
  const folderDifficulty = difficultyQuery === "all" ? null : difficultyQuery
  const filter = useMemo(
    () => getFolderFilter(folder, folderDifficulty),
    [folder, folderDifficulty],
  )

  const [ordering, setOrdering] = useState<Ordering>("index")
  const [orderingDesc, setOrderingDesc] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [showCover, setShowCover] = useState(true)
  const [allSongs, setAllSongs] = useState(false)
  const [expandedHash, setExpandedHash] = useState<string | null>(null)

  // Old or hand-edited URLs can combine mutually exclusive states. Remove
  // stale conditions so normal folders and folder=all stay deterministic.
  useEffect(() => {
    if ((!advanced || showAll) && conditions.length > 0) {
      void setScoreQuery({ filter: null }, { history: "replace" })
    }
  }, [advanced, conditions.length, setScoreQuery, showAll])

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("folder") === "advance"
    ) {
      void setScoreQuery({ folder: "filters" }, { history: "replace" })
    }
  }, [setScoreQuery])

  const hasEffectiveConditions = conditions.some(isEffectiveCondition)
  const conditionsActive = hasEffectiveConditions || showAll
  const ratingFolder = !advanced && filter.rating_latest != null
  const ratingCount = ratingFolder
    ? filter.rating_latest
      ? RATING_NEW_COUNT
      : RATING_OLD_COUNT
    : null
  const difficultyFolderActive =
    !advanced && (filter.category.length > 0 || filter.version.length > 0)

  const folderEntries = useMemo(
    () => allEntries.filter((entry) => includeInactive || entry.active),
    [allEntries, includeInactive],
  )
  const filterFn = useCallback(
    (entry: ScoreTableEntry) =>
      advanced
        ? showAll ||
          (conditionsActive && filterEntryConditions(entry, conditions))
        : filterEntry(entry, filter),
    [advanced, conditions, conditionsActive, filter, showAll],
  )
  const levelFiltered = advanced
    ? conditions.some(
        (condition) =>
          condition.key === "level" || condition.key === "internal_lv",
      )
    : filter.level.length > 0
  const tableOrdering = useMemo<
    Array<{ key: keyof ScoreTableEntry; desc: boolean }>
  >(
    () =>
      ratingFolder
        ? [
            { key: "old_rank", desc: false },
            { key: "new_rank", desc: false },
          ]
        : [{ key: ordering, desc: orderingDesc }],
    [ordering, orderingDesc, ratingFolder],
  )
  const sortingFns = useMemo(
    () => ({
      index: (a: ScoreTableEntry, b: ScoreTableEntry) => {
        if (levelFiltered) {
          const internalLvA = a.internal_lv ?? levelCompareKey[a.level]
          const internalLvB = b.internal_lv ?? levelCompareKey[b.level]
          return internalLvA !== internalLvB
            ? internalLvA - internalLvB
            : a.index !== b.index
              ? a.index - b.index
              : a.difficulty - b.difficulty
        }
        return a.index - b.index
      },
      level: (a: ScoreTableEntry, b: ScoreTableEntry) =>
        levels.indexOf(a.level) - levels.indexOf(b.level),
      internal_lv: (a: ScoreTableEntry, b: ScoreTableEntry) =>
        (a.internal_lv ?? levelCompareKey[a.level]) -
        (b.internal_lv ?? levelCompareKey[b.level]),
    }),
    [levelFiltered],
  )
  const table = useTable({
    data: allEntries,
    ordering: tableOrdering,
    includeInactive,
    sortingFns,
    filterFn,
  })

  const filterTitle = advanced
    ? showAll
      ? "全曲"
      : conditionsActive
        ? getConditionsTitle(conditions)
        : "未指定條件"
    : getFilterTitle(filter)
  const statsUseAllSongs = showAll || allSongs
  const statsEntries = useMemo(
    () =>
      (statsUseAllSongs ? allEntries : table.entries).filter(
        (entry) => includeInactive || entry.active,
      ),
    [allEntries, includeInactive, statsUseAllSongs, table.entries],
  )
  const stats = useMemo(() => getScoreStats(statsEntries), [statsEntries])

  const clearConditionsConfirmed = useCallback(
    (message: string) => conditions.length === 0 || window.confirm(message),
    [conditions.length],
  )
  const handleAdvancedChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        void setScoreQuery({ folder: "filters" })
        return
      }
      if (
        !clearConditionsConfirmed(
          "切換回資料夾模式會清除所有進階篩選條件，確定繼續嗎？",
        )
      ) {
        return
      }
      void setScoreQuery({ folder: null, filter: null, difficulty: null })
    },
    [clearConditionsConfirmed, setScoreQuery],
  )
  const handleShowAllChange = useCallback(
    (checked: boolean) => {
      if (!checked) {
        void setScoreQuery({ folder: "filters" })
        return
      }
      if (
        !clearConditionsConfirmed(
          "顯示全部譜面會清除所有進階篩選條件，確定繼續嗎？",
        )
      ) {
        return
      }
      void setScoreQuery({ folder: "all", filter: null, difficulty: null })
    },
    [clearConditionsConfirmed, setScoreQuery],
  )
  const handleConditionsChange = useCallback(
    (nextConditions: Condition[]) => {
      void setScoreQuery({
        folder: "filters",
        filter: nextConditions.length > 0 ? nextConditions : null,
      })
    },
    [setScoreQuery],
  )
  const handleFolderChange = useCallback(
    (nextFilter: ScoreFilter) => {
      void setScoreQuery({
        folder: getFolderQuery(nextFilter),
        filter: null,
      })
    },
    [setScoreQuery],
  )
  const handleFolderDifficultyChange = useCallback(
    (difficulty: number | null) => {
      void setScoreQuery({ difficulty: difficulty ?? "all" })
    },
    [setScoreQuery],
  )
  const handleNoteToggle = useCallback((hash: string) => {
    setExpandedHash((current) => (current === hash ? null : hash))
  }, [])

  const downloadCSV = useCallback(async (): Promise<void> => {
    const papa = await import("papaparse")
    const updatedAtStr =
      updatedAt != null ? new Date(updatedAt).toISOString().split("T")[0] : ""
    const filename = `${nickname} - ${updatedAtStr}.csv`
    const data = allEntries.map((entry) => ({
      category: entry.category,
      category_repr: categories[entry.category] ?? "",
      order: entry.order,
      title: entry.title,
      deluxe: entry.deluxe ? "DX" : "STD",
      active: entry.active ? "Y" : "N",
      version: entry.version,
      version_repr: versions[entry.version] ?? "",
      difficulty: entry.difficulty,
      difficulty_repr: difficulties[entry.difficulty] ?? "",
      level: entry.level,
      internal_lv:
        entry.internal_lv != null ? entry.internal_lv.toFixed(1) : "",
      score: entry.score != null ? entry.score.toFixed(4) : "",
      combo_flag: comboFlags[entry.combo_flag],
      sync_flag: syncFlags[entry.sync_flag],
      rating: entry.rating.toString(),
    }))
    const csvText = papa.unparse(data)
    saveAs(
      new Blob([String.fromCharCode(0xfeff), csvText], {
        type: "text/csv; charset=utf-8",
      }),
      filename,
    )
  }, [allEntries, nickname, updatedAt])

  const toolbar = (
    <>
      <Dialog.Root lazyMount unmountOnExit>
        <Dialog.Trigger asChild>
          <button className={playerClasses["folders-trigger"]}>
            <IconFolder />
            <span className={playerClasses["filter-label"]}>篩選</span>
            <span
              className={playerClasses["filter-summary"]}
              title={filterTitle}
            >
              {filterTitle}
            </span>
            <span className={playerClasses["filter-count"]}>
              {table.entries.length} 譜面
            </span>
          </button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className={playerClasses["folders-dialog"]}>
              <div className={playerClasses["folders-dialog-header"]}>
                <Dialog.Title>
                  {advanced ? "進階篩選" : "資料夾篩選"}
                </Dialog.Title>
                <Switch
                  checked={advanced}
                  onCheckedChange={({ checked }) =>
                    handleAdvancedChange(checked)
                  }
                >
                  進階模式
                </Switch>
                <Dialog.CloseTrigger asChild>
                  <button aria-label="關閉">
                    <IconClose />
                  </button>
                </Dialog.CloseTrigger>
              </div>
              {advanced ? (
                <AdvancedFilter
                  conditions={conditions}
                  hasEffectiveConditions={hasEffectiveConditions}
                  showAll={showAll}
                  onConditionsChange={handleConditionsChange}
                  onShowAllChange={handleShowAllChange}
                />
              ) : (
                <Folders
                  entries={folderEntries}
                  filter={filter}
                  difficulty={folderDifficulty}
                  onFilterChange={handleFolderChange}
                />
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <div className={playerClasses["sort-control"]}>
        <IconSortVariant className={playerClasses["sort-icon"]} />
        <SelectContainer
          label="排序"
          collection={orderingCollection}
          value={[ordering]}
          onValueChange={(event) =>
            setOrdering(event.items[0].value as Ordering)
          }
        >
          {orderingCollection.group().map(([type, group]) => (
            <Select.ItemGroup key={type}>
              <Select.ItemGroupLabel>{type}</Select.ItemGroupLabel>
              {group.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          ))}
        </SelectContainer>
        <Toggle.Root
          className={playerClasses["sort-direction"]}
          pressed={orderingDesc}
          onPressedChange={setOrderingDesc}
          aria-label={`排序方向：${orderingDesc ? "降冪" : "升冪"}`}
          title={orderingDesc ? "目前為降冪排序" : "目前為升冪排序"}
        >
          {orderingDesc ? <IconArrowDown /> : <IconArrowUp />}
          <span>{orderingDesc ? "降冪" : "升冪"}</span>
        </Toggle.Root>
      </div>
      <div
        className={`${playerClasses["toolbar-actions"]} ${playerClasses["hide-condensed"]}`}
      >
        <span className={playerClasses["updated-at"]}>
          <IconUpdate />
          {updatedAt != null ? (
            <time
              dateTime={updatedAt}
              title={formatDateTime(new Date(updatedAt))}
            >
              {formatRelative(new Date(updatedAt))}更新
            </time>
          ) : (
            "尚未更新"
          )}
        </span>
        <button className={playerClasses["csv-button"]} onClick={downloadCSV}>
          <IconFileDownload /> 下載 CSV
        </button>
      </div>
    </>
  )

  return (
    <>
      {toolbarContainer == null
        ? null
        : createPortal(toolbar, toolbarContainer)}
      <div
        className={clsx(
          layoutClasses["player-container"],
          classes["scores-layout"],
        )}
      >
        <div>
          <div className={classes["view-settings"]}>
            <Switch
              checked={includeInactive}
              onCheckedChange={({ checked }) => setIncludeInactive(checked)}
            >
              顯示已刪除樂曲
            </Switch>
            <Switch
              checked={showCover}
              onCheckedChange={({ checked }) => setShowCover(checked)}
            >
              顯示封面
            </Switch>
          </div>
          {difficultyFolderActive ? (
            <section
              aria-label="分類／版本難易度"
              className={classes["difficulty-folders"]}
            >
              <DifficultyFolders
                difficulty={folderDifficulty}
                onDifficultyChange={handleFolderDifficultyChange}
              />
            </section>
          ) : ratingCount != null ? (
            <section
              aria-label="Rating 組成說明"
              className={classes["rating-notice"]}
            >
              <Alert severity="info">
                採計前 {ratingCount} / 顯示前 {ratingCount * 2}
              </Alert>
            </section>
          ) : null}
          <section
            aria-labelledby="player-score-stats-title"
            className={classes["score-stats-block"]}
          >
            <div className={classes["stats-header"]}>
              <strong id="player-score-stats-title">
                {statsUseAllSongs ? "全曲" : filterTitle} ({statsEntries.length}
                )
              </strong>
              {showAll ? null : (
                <Switch
                  checked={allSongs}
                  onCheckedChange={({ checked }) => setAllSongs(checked)}
                >
                  全曲統計
                </Switch>
              )}
            </div>
            <div className={classes["stats-groups"]}>
              <section className={classes["stats-group"]}>
                <h3>達成率</h3>
                <ul className={classes["stats-list"]}>
                  {stats.scoreStats.map((count, index) =>
                    index !== 1 && index !== 2 ? (
                      <li key={RANK_SCORES[index][1]}>
                        <span className={classes["rank-label"]}>
                          {RANK_SCORES[index][1]}
                        </span>
                        <span>{count}</span>
                      </li>
                    ) : null,
                  )}
                </ul>
              </section>
              <section className={classes["stats-group"]}>
                <h3>Combo</h3>
                <ul className={classes["stats-list"]}>
                  {stats.comboStats.map((count, index) =>
                    index !== 0 ? (
                      <li key={comboFlags[index]}>
                        <ComboFlag flag={comboFlags[index]} />
                        <span>{count}</span>
                      </li>
                    ) : null,
                  )}
                </ul>
              </section>
              <section className={classes["stats-group"]}>
                <h3>Sync</h3>
                <ul className={classes["stats-list"]}>
                  {stats.syncStats.map((count, index) =>
                    index !== 0 ? (
                      <li key={syncFlags[index]}>
                        <SyncFlag flag={syncFlags[index]} />
                        <span>{count}</span>
                      </li>
                    ) : null,
                  )}
                </ul>
              </section>
            </div>
          </section>
        </div>
        <div>
          <PlayerScoreTable
            table={table.entries}
            showCover={showCover}
            afterCircle={afterCircle}
            expandedHash={expandedHash}
            onNoteToggle={handleNoteToggle}
          />
        </div>
      </div>
    </>
  )
})

export default PlayerScores
