import { Dialog } from "@ark-ui/react/dialog"
import { Popover, usePopover } from "@ark-ui/react/popover"
import { Portal } from "@ark-ui/react/portal"
import { Select, createListCollection } from "@ark-ui/react/select"
import { Tabs } from "@ark-ui/react/tabs"
import { Toggle } from "@ark-ui/react/toggle"
import saveAs from "file-saver"
import { Suspense, lazy, useCallback, useMemo, useRef, useState } from "react"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import {
  Params,
  Redirect,
  Route,
  Switch as RouteSwitch,
  useLocation,
} from "wouter"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconClipboardText from "~icons/mdi/clipboard-text-outline"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
import IconFolder from "~icons/mdi/folder"
import IconHistory from "~icons/mdi/history"
import IconImage from "~icons/mdi/image"
import IconLock from "~icons/mdi/lock"
import IconPencil from "~icons/mdi/pencil"
import IconPublic from "~icons/mdi/public"
import IconSortVariant from "~icons/mdi/sort-variant"
import IconUpdate from "~icons/mdi/update"
import { Alert } from "../../common/components/ui/Alert"
import { Switch } from "../../common/components/ui/Switch"

import { SelectContainer } from "../../common/components/ui/SelectContainer"
import { useUser } from "../../common/contexts"
import { formatDateTime, formatRelative } from "../../common/utils/datetime"
import { useTable } from "../../common/utils/table"
import { graphql, readFragment } from "../../graphql"
import AdvancedFilter from "../components/AdvancedFilter"
import Folders from "../components/Folders"
import NotePopup from "../components/NotePopup"
import PlayerRatingImage from "../components/PlayerRatingImage"
import Record from "../components/Record"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  flatSongsResult,
  getNoteHash,
  getRating,
} from "../models/aggregation"
import {
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
  ScoreFilter,
  filterEntry,
  filterEntryConditions,
  getConditionsTitle,
  getFilterTitle,
  isEffectiveCondition,
} from "../models/filter"
import { dxIntlRecordsFields, dxIntlScoresFields } from "../models/fragments"
import {
  dxIntlPlayersEditableDocument,
  dxIntlSongsDocument,
} from "../models/queries"
import classes from "./Player.module.css"
import PlayerForm from "./PlayerForm"
import PlayerScores from "./PlayerScores"

// History pulls in Chart.js; keep it in its own chunk like before.
const PlayerHistory = lazy(async () => await import("./PlayerHistory"))

const playerTabRoutes = {
  scores: "/",
  edit: "/edit",
  history: "/history",
  image: "/image",
} as const
type PlayerTab = keyof typeof playerTabRoutes

// The record (top bar) and the scores are fetched separately so the
// edit/history tabs don't block on (or transfer) the heavy score rows.
const dxIntlRecordDocument = graphql(
  `
    query dxIntlRecord($nickname: String!) {
      dx_intl_players(where: { nickname: { _eq: $nickname } }) {
        updated_at
        private
        dx_intl_record {
          ...dxIntlRecordsFields
        }
      }
    }
  `,
  [dxIntlRecordsFields],
)
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
const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  // Tab routes nested under /p/:nickname. The nested location is the
  // single source of truth for the active tab; the RouteSwitch below
  // renders the matching content.
  const [location, navigate] = useLocation()
  const activeTab = (Object.entries(playerTabRoutes).find(
    ([, path]) =>
      path !== "/" && (location === path || location.startsWith(`${path}/`)),
  )?.[0] ?? "scores") as PlayerTab
  // The score rows are heavy; only the scores and image tabs need them.
  const needScores = activeTab === "scores" || activeTab === "image"
  const [editableResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: dxIntlRecordDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [scoresResult] = useQuery({
    query: dxIntlScoresDocument,
    variables: { nickname: params.nickname ?? "" },
    pause: !needScores,
  })
  const [songsResult] = useQuery({
    query: dxIntlSongsDocument,
    pause: !needScores,
  })
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )
  // Used to get rating in reliable way during major version updates
  const maxVersion = useMemo(
    () => Math.max(...flattedEntries.map((entry) => entry.version)),
    [flattedEntries],
  )
  // CiRCLE had two rating differences:
  // * "Latest songs" will include song in recent 2 versions instead of 1.
  // * All perfect will add 1 point to rating.
  const afterCircle = useMemo(() => maxVersion >= 25, [maxVersion])

  const [filter, setFilter] = useState<ScoreFilter>(DEFAULT_FILTER)
  // Advanced mode keeps its own condition list so toggling the mode
  // switches between the two filters without converting them.
  const [conditions, setConditions] = useState<Condition[]>([])
  // Listing every chart is heavy, so without an effective condition
  // advanced mode shows nothing until this is explicitly turned on.
  const [showAll, setShowAll] = useState(false)
  const [advanced, setAdvanced] = useState(false)
  // Category/version folders default to EXP. Keep this preference separate
  // so Rating and level folders are not accidentally difficulty-filtered.
  const [folderDifficulty, setFolderDifficulty] = useState<number | null>(
    difficulties.indexOf("Expert"),
  )
  const [ordering, setOrdering] = useState<
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
  >("index")
  const [orderingDesc, setOrderingDesc] = useState(false)
  const [includeInactive, setIncludeInactive] = useState(false)
  const handleFolderDifficultyChange = useCallback(
    (difficulty: number | null) => {
      setFolderDifficulty(difficulty)
      setFilter((current) =>
        current.category.length > 0 || current.version.length > 0
          ? {
              ...current,
              difficulty: difficulty == null ? [] : [difficulty],
            }
          : current.difficulty.length > 0
            ? { ...current, difficulty: [] }
            : current,
      )
    },
    [],
  )
  // The top bar condenses once the sentinel above it scrolls under the
  // sticky app header. Observing a separate sentinel (instead of
  // window scroll offsets) avoids feedback loops when the bar shrinks.
  const [condensed, setCondensed] = useState(false)
  const sentinelObserverRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useCallback((sentinel: HTMLDivElement | null) => {
    sentinelObserverRef.current?.disconnect()
    sentinelObserverRef.current = null
    if (sentinel == null) return
    const headerHeight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--app-header-height")
        .trim() || "48px"
    const observer = new IntersectionObserver(
      // Entries are delivered oldest-first; only the newest crossing
      // reflects the current state.
      (entries) => setCondensed(!entries[entries.length - 1].isIntersecting),
      { rootMargin: `-${headerHeight} 0px 0px 0px` },
    )
    observer.observe(sentinel)
    sentinelObserverRef.current = observer
  }, [])
  // Sticky descendants (difficulty header, stats column) offset below the
  // bar through this variable since the bar's height is dynamic.
  const topBarObserverRef = useRef<ResizeObserver | null>(null)
  const topBarRef = useCallback((bar: HTMLElement | null) => {
    topBarObserverRef.current?.disconnect()
    topBarObserverRef.current = null
    if (bar == null) {
      document.documentElement.style.removeProperty("--player-top-bar-height")
      return
    }
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--player-top-bar-height",
        `${bar.offsetHeight}px`,
      )
    })
    observer.observe(bar)
    topBarObserverRef.current = observer
  }, [])
  const notePopupRef = useRef<HTMLElement | null>(null)
  const [notePopupEntry, setNotePopupEntry] = useState<ScoreTableEntry | null>(
    null,
  )
  const popover = usePopover({
    autoFocus: true,
    positioning: {
      placement: "bottom-start",
      getAnchorRect: () => {
        const ref = notePopupRef.current
        return ref ? ref.getBoundingClientRect() : null
      },
    },
  })
  // The popover api is a fresh object every render; go through a ref so
  // handleNotePopupOpen stays identity-stable for the memoized table.
  const popoverRef = useRef(popover)
  popoverRef.current = popover

  const { scoreTable, noteInconsistency } = useMemo(() => {
    if (!scoresResult.data) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const maxVersion = Math.max(...flattedEntries.map((entry) => entry.version))
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
          : entry.version == maxVersion,
        rating: score?.score
          ? getRating(
              entry.internal_lv ?? ESTIMATED_INTERNAL_LV[entry.level],
              score.score ?? 0,
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
    // It may be inconsistent if songs are added but song list not updated
    return { scoreTable, noteInconsistency: scoresMap.size > 0 }
  }, [flattedEntries, scoresResult, afterCircle])

  // Song counts on the folder chips follow the 顯示刪除曲 toggle,
  // matching the entry counts shown elsewhere.
  const folderEntries = useMemo(
    () => scoreTable.filter((entry) => includeInactive || entry.active),
    [scoreTable, includeInactive],
  )

  // The rating folders keep their own ordering by the rating ranks
  const ratingFolder = !advanced && filter.rating_latest != null
  const hasEffectiveConditions = conditions.some(isEffectiveCondition)
  // The single gate for whether advanced mode lists anything at all;
  // the filter and the title must agree on it.
  const conditionsActive = hasEffectiveConditions || showAll
  const filterFn = useCallback(
    (entry: ScoreTableEntry) =>
      advanced
        ? conditionsActive && filterEntryConditions(entry, conditions)
        : filterEntry(entry, filter),
    [filter, conditions, advanced, conditionsActive],
  )
  // When filtering revolves around levels, the default ordering
  // considers internal lv as well.
  const levelFiltered = advanced
    ? conditions.some(
        (condition) =>
          condition.key === "level" || condition.key === "internal_lv",
      )
    : filter.level.length > 0
  // Ordering and sortingFns are deps of useTable's internal memo, so
  // they must keep their identity or every render re-sorts the table.
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
    [ratingFolder, ordering, orderingDesc],
  )
  const sortingFns = useMemo(
    () => ({
      // Ensure difficulty is also considered
      // In case like filtering by level
      // Also, when filtering by level, also consider internal lv.
      // (we may have better solution on this.)
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
    data: scoreTable,
    ordering: tableOrdering,
    includeInactive,
    sortingFns,
    filterFn,
  })
  const filterTitle = advanced
    ? conditionsActive
      ? getConditionsTitle(conditions)
      : "未指定條件"
    : getFilterTitle(filter)

  const downloadCSV = useCallback(async (): Promise<void> => {
    const papa = await import("papaparse")
    const updatedAt = recordResult.data?.dx_intl_players[0]?.updated_at
    const updatedAtStr =
      updatedAt != null ? new Date(updatedAt).toISOString().split("T")[0] : ""
    const filename = `${params.nickname} - ${updatedAtStr}.csv`
    const data = scoreTable.map((entry) => ({
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
    // Append BOM to ensure Excel can read it
    saveAs(
      new Blob([String.fromCharCode(0xfeff), csvText], {
        type: "text/csv; charset=utf-8",
      }),
      filename,
    )
  }, [params, scoreTable, recordResult])

  const handleNotePopupOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>, entry: ScoreTableEntry) => {
      notePopupRef.current = event.currentTarget
      setNotePopupEntry(entry)
      popoverRef.current.reposition()
      popoverRef.current.setOpen(true)
    },
    [],
  )

  if (
    recordResult.error != null ||
    scoresResult.error != null ||
    songsResult.error != null
  ) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.dx_intl_players[0]
  // A player without uploads has no record yet; the layout (tabs, edit)
  // still renders and the scores tab shows the explanation instead.
  const record = readFragment(dxIntlRecordsFields, player.dx_intl_record)
  // The scores/songs queries are paused on the edit/history tabs and may
  // still be in flight right after switching back.
  const scoresReady = scoresResult.data != null && songsResult.data != null
  // While the editable query is in flight we cannot tell an owner from a
  // visitor yet, so the owner-only routes hold off their redirect.
  const ownershipPending = editableResult.fetching

  const collection = createListCollection({
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
  const ownsScoreTable =
    editableResult.error == null &&
    (editableResult.data?.dx_intl_players?.length ?? 0) > 0

  return (
    <>
      <Titled
        title={(title) =>
          `${record?.card_name ?? params.nickname} - maimai DX 成績單 - ${title}`
        }
      />
      {maxVersion > versions.length - 1 || noteInconsistency ? (
        <Alert severity="error">
          成績單目前有同步狀況，請試圖重新整理頁面。
        </Alert>
      ) : null}
      <Tabs.Root
        className={classes.tabs}
        value={activeTab}
        onValueChange={({ value }) =>
          navigate(playerTabRoutes[value as PlayerTab])
        }
      >
        <div
          ref={sentinelRef}
          aria-hidden
          className={classes["top-bar-sentinel"]}
        />
        <header
          ref={topBarRef}
          className={classes["top-bar"]}
          data-condensed={condensed ? "" : undefined}
        >
          <div className={classes["top-bar-info"]}>
            {record != null ? (
              <Record record={record} condensed={condensed} />
            ) : null}
            <div className={classes["player-toolbar"]}>
              <div
                className={`${classes["player-identity"]} ${classes["hide-condensed"]}`}
              >
                {player.private ? (
                  <IconLock
                    aria-label="私人成績單"
                    role="img"
                    title="私人成績單"
                  />
                ) : (
                  <IconPublic
                    aria-label="公開成績單"
                    role="img"
                    title="公開成績單"
                  />
                )}
                <span>{params.nickname}</span>
              </div>
              <Tabs.List
                aria-label="成績單頁面"
                className={classes["tabs-list"]}
              >
                <Tabs.Trigger value="scores" className={classes["tab-trigger"]}>
                  <IconClipboardText /> 成績單
                </Tabs.Trigger>
                {ownsScoreTable ? (
                  <Tabs.Trigger value="edit" className={classes["tab-trigger"]}>
                    <IconPencil /> 編輯
                  </Tabs.Trigger>
                ) : null}
                <Tabs.Trigger
                  value="history"
                  className={classes["tab-trigger"]}
                >
                  <IconHistory /> 歷史紀錄
                </Tabs.Trigger>
                {ownsScoreTable && record != null ? (
                  <Tabs.Trigger
                    value="image"
                    className={classes["tab-trigger"]}
                  >
                    <IconImage /> Rating 圖片
                  </Tabs.Trigger>
                ) : null}
                <Tabs.Indicator className={classes["tabs-indicator"]} />
              </Tabs.List>
            </div>
          </div>
          {activeTab === "scores" && record != null && scoresReady ? (
            <div
              aria-label="成績單選項"
              className={classes["top-bar-controls"]}
            >
              <Dialog.Root lazyMount unmountOnExit>
                <Dialog.Trigger asChild>
                  <button className={classes["folders-trigger"]}>
                    <IconFolder />
                    <span className={classes["filter-label"]}>篩選</span>
                    <span
                      className={classes["filter-summary"]}
                      title={filterTitle}
                    >
                      {filterTitle}
                    </span>
                    <span className={classes["filter-count"]}>
                      {table.entries.length} 譜面
                    </span>
                  </button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content className={classes["folders-dialog"]}>
                      <div className={classes["folders-dialog-header"]}>
                        <Dialog.Title>
                          {advanced ? "進階篩選" : "資料夾篩選"}
                        </Dialog.Title>
                        <Switch
                          checked={advanced}
                          onCheckedChange={({ checked }) =>
                            setAdvanced(checked)
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
                      <div className={classes["folders-dialog-settings"]}>
                        <Switch
                          checked={includeInactive}
                          onCheckedChange={({ checked }) =>
                            setIncludeInactive(checked)
                          }
                        >
                          顯示已刪除樂曲
                        </Switch>
                      </div>
                      {advanced ? (
                        <AdvancedFilter
                          conditions={conditions}
                          hasEffectiveConditions={hasEffectiveConditions}
                          showAll={showAll}
                          onConditionsChange={setConditions}
                          onShowAllChange={setShowAll}
                        />
                      ) : (
                        <Folders
                          entries={folderEntries}
                          filter={filter}
                          difficulty={folderDifficulty}
                          onFilterChange={setFilter}
                          onDifficultyChange={handleFolderDifficultyChange}
                        />
                      )}
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
              <div className={classes["sort-control"]}>
                <IconSortVariant className={classes["sort-icon"]} />
                <SelectContainer
                  label="排序"
                  collection={collection}
                  value={[ordering]}
                  onValueChange={(e) =>
                    setOrdering(
                      e.items[0].value as
                        | "index"
                        | "level"
                        | "internal_lv"
                        | "score"
                        | "rating"
                        | "combo_flag"
                        | "sync_flag",
                    )
                  }
                >
                  {collection.group().map(([type, group]) => (
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
                  className={classes["sort-direction"]}
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
                className={`${classes["toolbar-actions"]} ${classes["hide-condensed"]}`}
              >
                <span className={classes["updated-at"]}>
                  <IconUpdate />
                  {player.updated_at != null ? (
                    <time
                      dateTime={player.updated_at}
                      title={formatDateTime(new Date(player.updated_at))}
                    >
                      {formatRelative(new Date(player.updated_at))}更新
                    </time>
                  ) : (
                    "尚未更新"
                  )}
                </span>
                <button className={classes["csv-button"]} onClick={downloadCSV}>
                  <IconFileDownload /> 下載 CSV
                </button>
              </div>
            </div>
          ) : null}
        </header>
        <Tabs.Content value={activeTab} className={classes["tab-content"]}>
          <RouteSwitch>
            <Route path="/edit">
              {ownsScoreTable ? (
                <PlayerForm params={{ nickname: params.nickname }} />
              ) : ownershipPending ? null : (
                <Redirect to="/" replace />
              )}
            </Route>
            <Route path="/history/:hash?">
              {(routeParams) => (
                <Suspense fallback={<></>}>
                  <PlayerHistory
                    params={{
                      nickname: params.nickname,
                      hash: routeParams.hash,
                    }}
                  />
                </Suspense>
              )}
            </Route>
            <Route path="/image">
              {ownsScoreTable && record != null ? (
                scoresReady ? (
                  <PlayerRatingImage
                    scoreTable={scoreTable}
                    cardName={record.card_name}
                    title={record.title}
                    trophy={record.trophy}
                    nickname={params.nickname ?? ""}
                    isPrivate={player.private}
                    courseRank={record.course_rank}
                    classRank={record.class_rank}
                  />
                ) : null
              ) : ownershipPending ? null : (
                <Redirect to="/" replace />
              )}
            </Route>
            <Route path="/">
              {record == null ? (
                <Alert severity="warning">
                  沒有成績可以顯示。可能是還沒有上傳成績。
                </Alert>
              ) : !scoresReady ? null : (
                <PlayerScores
                  allEntries={scoreTable}
                  entries={table.entries}
                  filterTitle={filterTitle}
                  includeInactive={includeInactive}
                  onNoteOpen={handleNotePopupOpen}
                />
              )}
            </Route>
            <Route>
              <Redirect to="/" replace />
            </Route>
          </RouteSwitch>
        </Tabs.Content>
      </Tabs.Root>
      <Popover.RootProvider value={popover}>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <div>
              {notePopupEntry ? (
                <NotePopup entry={notePopupEntry} afterCircle={afterCircle} />
              ) : null}
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.RootProvider>
    </>
  )
}
export default Player
