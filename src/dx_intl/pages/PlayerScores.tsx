import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import { Select, createListCollection } from "@ark-ui/react/select"
import { Toggle } from "@ark-ui/react/toggle"
import clsx from "clsx"
import saveAs from "file-saver"
import { createMultiParser, createParser, useQueryStates } from "nuqs"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { useQuery } from "urql"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
import IconFolder from "~icons/mdi/folder"
import IconImage from "~icons/mdi/image"
import IconSortVariant from "~icons/mdi/sort-variant"
import IconUpdate from "~icons/mdi/update"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
import { SelectContainer } from "../../common/components/ui/SelectContainer"
import { Switch } from "../../common/components/ui/Switch"
import { formatDateTime, formatRelative } from "../../common/utils/datetime"
import { useTable } from "../../common/utils/table"
import { graphql, readFragment } from "../../graphql"
import AdvancedFilter from "../components/AdvancedFilter"
import { ComboFlag, SyncFlag } from "../components/Flags"
import Folders, { DifficultyFolders } from "../components/Folders"
import PlayerRatingImage from "../components/PlayerRatingImage"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  flatSongsResult,
  getNoteHash,
  getRating,
  getScoreStats,
} from "../models/aggregation"
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
import { dxIntlScoresFields } from "../models/fragments"
import { dxIntlSongsDocument } from "../models/queries"
import playerClasses from "./Player.module.css"
import classes from "./PlayerScores.module.css"

type FolderQuery =
  | "rating-new"
  | "rating-old"
  | "filters"
  | "all"
  | `category-${number}`
  | `version-${number}`
  | `level${LevelQueryFragment}`

type LevelQueryFragment<Level extends string = (typeof levels)[number]> =
  Level extends `${infer Value}+` ? `${Value}p` : Level

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

const dxIntlScoresDocument = graphql(
  `
    query dxIntlScores($nickname: String!) {
      dx_intl_players(where: { nickname: { _eq: $nickname } }) {
        dx_intl_scores {
          ...dxIntlScoresFields
        }
      }
    }
  `,
  [dxIntlScoresFields],
)

const DEFAULT_FOLDER: FolderQuery = "rating-new"
const DEFAULT_FOLDER_DIFFICULTY = difficulties.indexOf("Expert")

const getLevelQueryFragment = (
  level: (typeof levels)[number],
): LevelQueryFragment =>
  (level.endsWith("+") ? `${level.slice(0, -1)}p` : level) as LevelQueryFragment

const getLevelIndex = (fragment: string): number =>
  levels.findIndex((level) => getLevelQueryFragment(level) === fragment)

const isFolderValue = (value: string): value is FolderQuery => {
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

const folderParser = createParser<FolderQuery>({
  parse: (value) => (isFolderValue(value) ? value : null),
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

const valueConditionPrefixes: Record<ValuesConditionKey, string> = {
  category: "category",
  version: "version",
  deluxe: "variant",
  difficulty: "difficulty",
  combo_flag: "combo",
  sync_flag: "sync",
}

const deluxeFragments = ["std", "dx"] as const
const difficultyFragments = ["bsc", "adv", "exp", "mas", "rem"] as const

const getConditionValueFragment = (
  key: ValuesConditionKey,
  value: number,
): string => {
  switch (key) {
    case "category":
    case "version":
      return `${value}`
    case "deluxe":
      return deluxeFragments[value] ?? ""
    case "difficulty":
      return difficultyFragments[value] ?? ""
    case "combo_flag": {
      const flag = comboFlags[value]
      return flag === "" ? "none" : (flag?.replace("+", "p") ?? "")
    }
    case "sync_flag": {
      const flag = syncFlags[value]
      return flag === ""
        ? "none"
        : flag === "s"
          ? "sync"
          : (flag?.replace("+", "p") ?? "")
    }
  }
}

const getConditionValue = (
  key: ValuesConditionKey,
  fragment: string,
): number | null =>
  valueOptions[key].find(
    ({ value }) => getConditionValueFragment(key, value) === fragment,
  )?.value ?? null

const serializeCondition = (condition: Condition): string => {
  switch (condition.key) {
    case "level":
      return `level-${getLevelQueryFragment(levels[condition.range[0]])}~${getLevelQueryFragment(levels[condition.range[1]])}`
    case "internal_lv":
      return `internal-lv-${condition.range[0].toFixed(1)}~${condition.range[1].toFixed(1)}`
    default: {
      const separator = condition.key === "category" ? "" : "."
      const values = condition.values
        .map((value) => getConditionValueFragment(condition.key, value))
        .join(separator)
      return `${valueConditionPrefixes[condition.key]}-${values}`
    }
  }
}

const parseRange = <T,>(
  value: string,
  parseBound: (bound: string) => T | null,
): [T, T] | null => {
  const bounds = value.split("~")
  if (bounds.length !== 2) return null
  const start = parseBound(bounds[0])
  const end = parseBound(bounds[1])
  return start == null || end == null ? null : [start, end]
}

const parseValuesCondition = (
  key: ValuesConditionKey,
  value: string,
): Condition | null => {
  const fragments =
    value === "" ? [] : key === "category" ? [...value] : value.split(".")
  const values = fragments.map((fragment) => getConditionValue(key, fragment))
  if (values.some((item) => item == null)) return null
  return { key, values: [...new Set(values as number[])] }
}

const parseCondition = (value: string): Condition | null => {
  if (value.startsWith("level-")) {
    const range = parseRange(value.slice("level-".length), (bound) => {
      const index = getLevelIndex(bound)
      return index < 0 ? null : index
    })
    return range == null || range[0] > range[1] ? null : { key: "level", range }
  }
  if (value.startsWith("internal-lv-")) {
    const range = parseRange(value.slice("internal-lv-".length), (bound) => {
      if (!/^\d+\.\d$/.test(bound)) return null
      const internalLevel = Number(bound)
      return internalLevel >= INTERNAL_LV_MIN &&
        internalLevel <= INTERNAL_LV_MAX
        ? internalLevel
        : null
    })
    return range == null || range[0] > range[1]
      ? null
      : { key: "internal_lv", range }
  }
  for (const [key, prefix] of Object.entries(valueConditionPrefixes) as Array<
    [ValuesConditionKey, string]
  >) {
    if (value.startsWith(`${prefix}-`)) {
      return parseValuesCondition(key, value.slice(prefix.length + 1))
    }
  }
  return null
}

// Advanced conditions use one readable, repeatable query parameter each:
// filter=level-9p~14&filter=category-2345.
const conditionsParser = createMultiParser<Condition[]>({
  parse: (values) => {
    const conditions = new Map<Condition["key"], Condition>()
    for (const value of values) {
      const condition = parseCondition(value)
      if (condition != null) conditions.set(condition.key, condition)
    }
    return conditions.size === 0 ? null : [...conditions.values()]
  },
  serialize: (conditions) => conditions.map(serializeCondition),
  eq: (a, b) =>
    a.length === b.length &&
    a.every(
      (condition, index) =>
        serializeCondition(condition) === serializeCondition(b[index]),
    ),
}).withDefault([])

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

const getFolderQuery = (filter: ScoreFilter): FolderQuery => {
  if (filter.rating_latest != null) {
    return filter.rating_latest ? "rating-new" : "rating-old"
  }
  if (filter.category.length > 0) return `category-${filter.category[0]}`
  if (filter.version.length > 0) return `version-${filter.version[0]}`
  if (filter.level.length > 0) {
    const level = levels[filter.level[0]]
    return level == null
      ? DEFAULT_FOLDER
      : `level${getLevelQueryFragment(level)}`
  }
  return DEFAULT_FOLDER
}

interface RatingImageInfo {
  cardName: string
  title: string
  trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
  isPrivate: boolean
  courseRank?: number | null
  classRank?: number | null
}

interface PlayerScoresProps {
  nickname: string
  updatedAt?: string | null
  toolbarContainer: HTMLDivElement | null
  // The rating image dialog is owner-only; only owners get the record
  // details needed to render it.
  ownsScoreTable: boolean
  ratingImage: RatingImageInfo
}

const PlayerScores = memo(function PlayerScores({
  nickname,
  updatedAt,
  toolbarContainer,
  ownsScoreTable,
  ratingImage,
}: PlayerScoresProps) {
  const [scoresResult] = useQuery({
    query: dxIntlScoresDocument,
    variables: { nickname },
  })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )
  // Used to get rating in a reliable way during major version updates.
  const maxVersion = useMemo(
    () => Math.max(...flattedEntries.map((entry) => entry.version)),
    [flattedEntries],
  )
  // CiRCLE had two rating differences:
  // * "Latest songs" includes songs from the most recent two versions.
  // * All Perfect adds 1 point to Rating.
  const afterCircle = useMemo(() => maxVersion >= 25, [maxVersion])
  const { scoreTable: allEntries, noteInconsistency } = useMemo(() => {
    if (scoresResult.data == null) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const scores =
      readFragment(
        dxIntlScoresFields,
        scoresResult.data.dx_intl_players[0]?.dx_intl_scores ?? [],
      ) ?? []
    const scoresMap = new Map(
      scores.map((score) => [getNoteHash(score), score]),
    )
    const scoreTable = flattedEntries.map<ScoreTableEntry>((entry, index) => {
      const score = scoresMap.get(entry.hash)
      scoresMap.delete(entry.hash)
      return {
        index,
        ...entry,
        score: score?.score,
        combo_flag: comboFlags.indexOf(score?.combo_flag ?? ""),
        sync_flag: syncFlags.indexOf(score?.sync_flag ?? ""),
        updated_at: score?.start,
        rating_latest: afterCircle
          ? entry.version >= maxVersion - 1
          : entry.version === maxVersion,
        rating: score?.score
          ? getRating(
              entry.internal_lv ?? ESTIMATED_INTERNAL_LV[entry.level],
              score.score,
              afterCircle &&
                (score.combo_flag === "ap" || score.combo_flag === "ap+"),
            )
          : 0,
        rating_listed: false,
        rating_used: false,
      }
    })
    const oldRanks = new Map(
      scoreTable
        .filter((entry) => !entry.rating_latest && entry.active)
        .sort((a, b) => b.rating - a.rating)
        .map((entry, index) => [entry.hash, index + 1]),
    )
    const newRanks = new Map(
      scoreTable
        .filter((entry) => entry.rating_latest && entry.active)
        .sort((a, b) => b.rating - a.rating)
        .map((entry, index) => [entry.hash, index + 1]),
    )
    scoreTable.forEach((entry) => {
      entry.old_rank = oldRanks.get(entry.hash)
      entry.new_rank = newRanks.get(entry.hash)
      entry.rating_listed =
        entry.rating > 0 &&
        ((entry.new_rank ?? Infinity) <= RATING_NEW_COUNT * 2 ||
          (entry.old_rank ?? Infinity) <= RATING_OLD_COUNT * 2)
      entry.rating_used =
        entry.rating > 0 &&
        ((entry.new_rank ?? Infinity) <= RATING_NEW_COUNT ||
          (entry.old_rank ?? Infinity) <= RATING_OLD_COUNT)
    })
    // Remaining scores indicate that the score and song data are out of sync.
    return { scoreTable, noteInconsistency: scoresMap.size > 0 }
  }, [afterCircle, flattedEntries, maxVersion, scoresResult.data])

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
  const [ratingImageOpen, setRatingImageOpen] = useState(false)

  // Old or hand-edited URLs can combine mutually exclusive states. Remove
  // stale conditions so normal folders and folder=all stay deterministic.
  useEffect(() => {
    if ((!advanced || showAll) && conditions.length > 0) {
      void setScoreQuery({ filter: null }, { history: "replace" })
    }
  }, [advanced, conditions.length, setScoreQuery, showAll])

  const hasEffectiveConditions = conditions.some(isEffectiveCondition)
  const conditionsActive = hasEffectiveConditions || showAll
  const ratingFolder = !advanced && filter.rating_latest != null
  const ratingCount = ratingFolder
    ? filter.rating_latest
      ? RATING_NEW_COUNT
      : RATING_OLD_COUNT
    : null
  const latestRatingVersions = [maxVersion - 1, maxVersion].map(
    (version) => versions[version] ?? `版本 ${version}`,
  )
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
  const folderButtonTitle =
    filter.rating_latest == null
      ? filterTitle
      : `Rating 組成 (${filter.rating_latest ? "新曲" : "舊曲"})`
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

  if (scoresResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (scoresResult.data == null || songsResult.data == null) {
    return null
  }

  const toolbar = (
    <>
      <Dialog.Root lazyMount unmountOnExit>
        <Dialog.Trigger asChild>
          <button className={playerClasses["folders-trigger"]}>
            <IconFolder />
            <span className={playerClasses["filter-label"]}>篩選</span>
            <span
              className={playerClasses["filter-summary"]}
              title={folderButtonTitle}
            >
              {folderButtonTitle}
            </span>
            <span
              className={playerClasses["filter-count"]}
              title={`${table.entries.length} 譜面`}
            >
              {table.entries.length}
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
                  maxVersion={maxVersion}
                  onFilterChange={handleFolderChange}
                />
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      {!ratingFolder ? (
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
      ) : null}
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
        {ownsScoreTable ? (
          <button onClick={() => setRatingImageOpen(true)}>
            <IconImage /> Rating 圖片
          </button>
        ) : null}
      </div>
    </>
  )

  return (
    <>
      {maxVersion > versions.length - 1 || noteInconsistency ? (
        <Alert severity="error">
          成績單目前有同步狀況，請試圖重新整理頁面。
        </Alert>
      ) : null}
      {toolbarContainer == null
        ? null
        : createPortal(toolbar, toolbarContainer)}
      {ownsScoreTable ? (
        <PlayerRatingImage
          open={ratingImageOpen}
          onOpenChange={setRatingImageOpen}
          scoreTable={allEntries}
          cardName={ratingImage.cardName}
          title={ratingImage.title}
          trophy={ratingImage.trophy}
          nickname={nickname}
          isPrivate={ratingImage.isPrivate}
          courseRank={ratingImage.courseRank}
          classRank={ratingImage.classRank}
          updatedDate={
            updatedAt != null
              ? new Date(updatedAt).toISOString().split("T")[0]
              : undefined
          }
          maxVersion={
            Number.isFinite(maxVersion)
              ? (versions[maxVersion] ?? `版本 ${maxVersion}`)
              : undefined
          }
        />
      ) : null}
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
                {`採計前 ${ratingCount} / 顯示前 ${ratingCount * 2}；「新曲」為近兩代曲目（${latestRatingVersions.join("、")}）`}
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
