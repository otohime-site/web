import { Popover, usePopover } from "@ark-ui/react/popover"
import { RadioGroup } from "@ark-ui/react/radio-group"
import { SegmentGroup } from "@ark-ui/react/segment-group"
import { Select, createListCollection } from "@ark-ui/react/select"
import { Toggle } from "@ark-ui/react/toggle"
import saveAs from "file-saver"
import { useCallback, useMemo, useRef, useState } from "react"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconFileDownload from "~icons/mdi/file-download"
import IconHistory from "~icons/mdi/history"
import IconPencil from "~icons/mdi/pencil"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
import { Switch } from "../../common/components/ui/Switch"

import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"

import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { SelectContainer } from "../../common/components/ui/SelectContainer"
import { useUser } from "../../common/contexts"
import { useTable } from "../../common/utils/table"
import { graphql, readFragment } from "../../graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
import Folder from "../components/Folders"
import NotePopup from "../components/NotePopup"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import Record from "../components/Record"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  flatSongsResult,
  getGroupTitle,
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
import { dxIntlRecordsFields, dxIntlScoresFields } from "../models/fragments"
import {
  dxIntlPlayersEditableDocument,
  dxIntlSongsDocument,
} from "../models/queries"
import classes from "./Player.module.css"

const dxIntlRecordWithScoresDocument = graphql(
  `
    query dxIntlRecordWithScores($nickname: String!) {
      dx_intl_players(where: { nickname: { _eq: $nickname } }) {
        updated_at
        private
        dx_intl_record {
          ...dxIntlRecordsFields
        }
        dx_intl_scores {
          ...dxIntlScoresFields
        }
      }
    }
  `,
  [dxIntlRecordsFields, dxIntlScoresFields],
)
const groupKeyOptions = {
  rating_latest: "Rating 組成",
  category: "分類",
  version: "版本",
  level: "等級",
} as const

const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  const [editableResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: dxIntlRecordWithScoresDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
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

  const [grouping, setGrouping] = useState<
    "rating_latest" | "category" | "version" | "level"
  >("rating_latest")
  const [selectedGroup, setSelectedGroup] = useState(0)
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
  const [difficulty, setDifficulty] = useState<number>(2)
  const [includeInactive, setIncludeInactive] = useState(false)
  const [statFolder, setStatFolder] = useState(true)
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

  const { scoreTable, noteInconsistency } = useMemo(() => {
    if (!recordResult.data) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const maxVersion = Math.max(...flattedEntries.map((entry) => entry.version))
    const scores =
      readFragment(
        dxIntlScoresFields,
        recordResult.data.dx_intl_players[0]?.dx_intl_scores ?? [],
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
  }, [flattedEntries, recordResult, afterCircle])

  const table = useTable({
    data: scoreTable,
    grouping,
    ordering:
      grouping === "rating_latest"
        ? [
            { key: "old_rank", desc: false },
            { key: "new_rank", desc: false },
          ]
        : [{ key: ordering, desc: orderingDesc }],
    difficulty,
    includeInactive,
    sortingFns: {
      // Ensure difficulty is also considered
      // In case like group with level
      // Also, when grouping with level, also consider internal lv.
      // (we may have better solution on this.)
      index: (a, b) => {
        if (grouping === "level") {
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
      level: (a, b) => levels.indexOf(a.level) - levels.indexOf(b.level),
      internal_lv: (a, b) =>
        (a.internal_lv ?? levelCompareKey[a.level]) -
        (b.internal_lv ?? levelCompareKey[b.level]),
    },
    filterFn: (entry, options) => {
      switch (options.grouping) {
        case "rating_latest":
          return entry.rating_listed
        case "level":
          return true
        default:
          return entry.difficulty === options.difficulty
      }
    },
  })
  const { currentGroupEntry, scoreStatsTargets, scoreStats } = useMemo(() => {
    const currentGroupEntry = [...table.groupedData.entries()][
      selectedGroup ?? 0
    ] ?? ["", []]
    const scoreStatsTargets = (
      statFolder ? currentGroupEntry[1] : scoreTable
    )?.filter((s) => includeInactive || s.active)
    const scoreStats = getScoreStats(scoreStatsTargets)
    return { currentGroupEntry, scoreStatsTargets, scoreStats }
  }, [scoreTable, table, includeInactive, selectedGroup, statFolder])

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

  const handleNotePopupOpen = (
    event: React.MouseEvent<HTMLElement>,
    entry: ScoreTableEntry,
  ) => {
    notePopupRef.current = event.currentTarget
    setNotePopupEntry(entry)
    popover.reposition()
    popover.setOpen(true)
  }

  if (recordResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.dx_intl_players[0]
  const record = readFragment(dxIntlRecordsFields, player.dx_intl_record)

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }
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

  return (
    <>
      <Titled
        title={(title) => `${record.card_name} - maimai DX 成績單 - ${title}`}
      />
      {maxVersion > versions.length - 1 || noteInconsistency ? (
        <Alert severity="error">
          成績單目前有同步狀況，請試圖重新整理頁面。
        </Alert>
      ) : null}
      <div className={layoutClasses["player-container"]}>
        <div>
          <Record
            record={record}
            updatedAt={player.updated_at}
            isPrivate={player.private}
          />
          <div aria-label="成績單選項" className={layoutClasses.toolbar}>
            {editableResult.error == null &&
            (editableResult.data?.dx_intl_players?.length ?? 0) > 0 ? (
              <LinkButton href={`~/dxi/p/${params.nickname}/edit`}>
                <IconPencil /> 編輯
              </LinkButton>
            ) : null}
            <LinkButton href={`~/dxi/p/${params.nickname}/history`}>
              <IconHistory /> 歷史紀錄
            </LinkButton>
            <button onClick={downloadCSV}>
              <IconFileDownload /> 下載 CSV
            </button>
          </div>
          <div className={layoutClasses.line}>
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
              pressed={orderingDesc}
              onPressedChange={setOrderingDesc}
            >
              {orderingDesc ? <IconArrowDown /> : <IconArrowUp />}
            </Toggle.Root>
            <Switch
              checked={includeInactive}
              onCheckedChange={(e) => {
                setIncludeInactive(e.checked)
              }}
            >
              顯示刪除曲
            </Switch>
          </div>
          <div className={classes["score-stats-block"]}>
            <div>
              <strong>
                {statFolder
                  ? `${getGroupTitle(grouping, currentGroupEntry[0])}`
                  : "全曲"}{" "}
                ({scoreStatsTargets.length})
              </strong>
              <Switch
                checked={statFolder}
                onCheckedChange={(e) => {
                  setStatFolder(e.checked)
                }}
              >
                限資料夾
              </Switch>
            </div>
            <ul>
              {scoreStats.scoreStats.map((count, i) =>
                i !== 1 && i !== 2 ? (
                  <li key={i}>
                    <span>{RANK_SCORES[i][1]}</span> {count}
                  </li>
                ) : null,
              )}
              {scoreStats.comboStats.map((count, i) =>
                i !== 0 ? (
                  <li key={i}>
                    <ComboFlag flag={comboFlags[i]} /> {count}
                  </li>
                ) : null,
              )}
              {scoreStats.syncStats.map((count, i) =>
                i !== 0 ? (
                  <li key={i}>
                    <SyncFlag flag={syncFlags[i]} /> {count}
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </div>
        <div>
          <div className={layoutClasses["sticky-header"]}>
            <SegmentGroup.Root
              value={grouping}
              onValueChange={({ value }) => {
                if (!value) return
                setGrouping(value as typeof grouping)
                setSelectedGroup(0)
              }}
              className={layoutClasses["grouping-tablist"]}
            >
              {Object.entries(groupKeyOptions).map(([key]) => (
                <SegmentGroupItem
                  key={key}
                  value={key}
                  style={key === "rating_latest" ? { flex: 2 } : undefined}
                >
                  {groupKeyOptions[key as typeof grouping]}
                </SegmentGroupItem>
              ))}
            </SegmentGroup.Root>
            <ScrollableSegmentGroupRoot
              value={`${selectedGroup}`}
              onValueChange={({ value }) => {
                if (value) setSelectedGroup(parseInt(value, 10))
              }}
            >
              {[...table.groupedData.keys()].map((key, index) => (
                <SegmentGroupItem key={index} value={index.toString()}>
                  {getGroupTitle(grouping, key)} (
                  {table.groupedData.get(key)?.length})
                </SegmentGroupItem>
              ))}
            </ScrollableSegmentGroupRoot>
            {grouping === "category" || grouping === "version" ? (
              <RadioGroup.Root
                value={difficulty.toString()}
                onValueChange={(v) => {
                  if (v.value) setDifficulty(parseInt(v.value, 10))
                }}
                className={layoutClasses["tab-like-radio-group"]}
              >
                {["BSC", "ADV", "EXP", "MAS", "RE:M"].map((d, i) => (
                  <RadioGroupItem
                    key={i}
                    value={i.toString()}
                    className={
                      classes[`radio-difficulty-${i as 0 | 1 | 2 | 3 | 4}`]
                    }
                  >
                    {d}
                  </RadioGroupItem>
                ))}
              </RadioGroup.Root>
            ) : (
              <></>
            )}
          </div>
          <Folder />
          <PlayerScoreTable
            table={[...table.groupedData.values()][selectedGroup]}
            handleNotePopupOpen={handleNotePopupOpen}
          />
        </div>
      </div>
      <Popover.RootProvider value={popover}>
        <Popover.Positioner>
          <Popover.Content>
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
          </Popover.Content>
        </Popover.Positioner>
      </Popover.RootProvider>
    </>
  )
}
export default Player
