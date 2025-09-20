import { Tabs } from "@ark-ui/react/tabs"
import { Toggle } from "@ark-ui/react/toggle"
import clsx from "clsx"
import { format } from "date-fns/format"
import saveAs from "file-saver"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  Button,
  Dialog,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Radio,
  RadioGroup,
  Select,
  SelectValue,
  Toolbar,
} from "react-aria-components"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowDropDown from "~icons/mdi/arrow-drop-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconFileDownload from "~icons/mdi/file-download"
import IconHistory from "~icons/mdi/history"
import IconPencil from "~icons/mdi/pencil"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
import { Switch } from "../../common/components/ui/Switch"

import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableTabList } from "../../common/components/ui/ScrollableTabList"

import { useUser } from "../../common/contexts"
import { useTable } from "../../common/utils/table"
import { graphql, readFragment } from "../../graphql"
import { ComboFlag, SyncFlag } from "../components/Flags"
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
  current_version: "Rating 組成",
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

  const [grouping, setGrouping] = useState<
    "current_version" | "category" | "version" | "level"
  >("current_version")
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
        current_version: entry.version == maxVersion,
        rating: score?.score
          ? getRating(
              score.score ?? 0,
              entry.internal_lv ?? ESTIMATED_INTERNAL_LV[entry.level],
            )
          : 0,
        rating_listed: false,
        rating_used: false,
      }
    })
    const oldRanks = new Map(
      scoreTable
        .filter((entry) => !entry.current_version && entry.active)
        .sort((a, b) => b.rating - a.rating)
        .map((entry, index) => [entry.hash, index + 1]),
    )
    const newRanks = new Map(
      scoreTable
        .filter((entry) => entry.current_version && entry.active)
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
  }, [flattedEntries, recordResult])

  const table = useTable({
    data: scoreTable,
    grouping,
    ordering:
      grouping === "current_version"
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
        case "current_version":
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
      updatedAt != null ? format(new Date(updatedAt), "yyyy-MM-dd") : ""
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
          <Toolbar aria-label="成績單選項" className={layoutClasses.toolbar}>
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
          </Toolbar>
          <div className={layoutClasses.line}>
            <Select
              selectedKey={ordering}
              onSelectionChange={(selected) =>
                setOrdering(
                  selected as
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
              <Label>排序</Label>
              <Button style={{ width: "10em" }}>
                <SelectValue />
                <span aria-hidden="true">
                  <IconArrowDropDown />
                </span>
              </Button>
              <Popover>
                <ListBox>
                  <ListBoxSection>
                    <Header>譜面</Header>
                    <ListBoxItem id="index">預設</ListBoxItem>
                    <ListBoxItem id="level">樂曲等級</ListBoxItem>
                    <ListBoxItem id="internal_lv">譜面定數</ListBoxItem>
                  </ListBoxSection>
                  <ListBoxSection>
                    <Header>成績單</Header>
                    <ListBoxItem id="score">成績</ListBoxItem>
                    <ListBoxItem id="rating">Rating 分數</ListBoxItem>
                    <ListBoxItem id="combo_flag">Combo 標記</ListBoxItem>
                    <ListBoxItem id="sync_flag">Sync 標記</ListBoxItem>
                  </ListBoxSection>
                  <ListBoxSection>
                    <Header>玩家統計</Header>
                    <ListBoxItem id="sss_rate">SSS Rate</ListBoxItem>
                    <ListBoxItem id="fc_rate">FC Rate</ListBoxItem>
                    <ListBoxItem id="ap_rate">AP Rate</ListBoxItem>
                  </ListBoxSection>
                </ListBox>
              </Popover>
            </Select>
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
        <Tabs.Root
          value={grouping}
          onValueChange={({ value }) => {
            setGrouping(value as typeof grouping)
            setSelectedGroup(0)
          }}
        >
          <div className={layoutClasses["sticky-header"]}>
            <Tabs.List className={layoutClasses["grouping-tablist"]}>
              {Object.entries(groupKeyOptions).map(([key]) => (
                <Tabs.Trigger
                  key={key}
                  value={key}
                  style={key === "current_version" ? { flex: 2 } : undefined}
                >
                  {groupKeyOptions[key as typeof grouping]}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
          <Tabs.Content value={grouping}>
            <Tabs.Root
              value={`${selectedGroup}`}
              onValueChange={({ value }) => {
                setSelectedGroup(parseInt(value, 10))
              }}
            >
              <div
                className={layoutClasses["sticky-header"]}
                style={{ top: "87.5px" }}
              >
                <ScrollableTabList>
                  {[...table.groupedData.keys()].map((key, index) => (
                    <Tabs.Trigger key={index} value={index.toString()}>
                      {getGroupTitle(grouping, key)} (
                      {table.groupedData.get(key)?.length})
                    </Tabs.Trigger>
                  ))}
                </ScrollableTabList>
              </div>
              {grouping === "category" || grouping === "version" ? (
                <RadioGroup
                  orientation="horizontal"
                  value={difficulty.toString()}
                  onChange={(v) => {
                    if (v) setDifficulty(parseInt(v, 10))
                  }}
                  className={layoutClasses["tab-like-radio-group"]}
                >
                  {["BSC", "ADV", "EXP", "MAS", "RE:M"].map((d, i) => (
                    <Radio
                      key={i}
                      value={i.toString()}
                      className={clsx(
                        layoutClasses["tab-like-radio"],
                        classes[`radio-difficulty-${i as 0 | 1 | 2 | 3 | 4}`],
                      )}
                    >
                      {d}
                    </Radio>
                  ))}
                </RadioGroup>
              ) : (
                <></>
              )}
              {[...table.groupedData.values()].map((table, index) => (
                <Tabs.Content key={index} value={index.toString()}>
                  <PlayerScoreTable
                    table={table}
                    handleNotePopupOpen={handleNotePopupOpen}
                  />
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Popover
        triggerRef={notePopupRef}
        isOpen={!!notePopupEntry}
        onOpenChange={(o) => {
          if (!o) {
            notePopupRef.current = null
            setNotePopupEntry(null)
          }
        }}
      >
        <Dialog>
          {notePopupEntry ? <NotePopup entry={notePopupEntry} /> : null}
        </Dialog>
      </Popover>
    </>
  )
}
export default Player
