import { format } from "date-fns/format"
import saveAs from "file-saver"
import { useCallback, useMemo, useRef, useState } from "react"
import {
  Button,
  Collection,
  Dialog,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Radio,
  RadioGroup,
  Select,
  SelectValue,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  ToggleButton,
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
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableTabList } from "../../common/components/ui/ScrollableTabList"
import { useUser } from "../../common/contexts"
import { useTable } from "../../common/utils/table"
import { getFragmentData, graphql } from "../../gql"
import NoteRating from "../NoteRating"
import { ComboFlag, SyncFlag } from "../components/Flags"
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

const dxIntlRecordWithScoresDocument = graphql(`
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
`)
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
  const [ordering, setOrdering] = useState<
    | "index"
    | "level"
    | "internal_lv"
    | "score"
    | "rating"
    | "combo_flag"
    | "sync_flag"
  >("index")
  const [orderingDesc, setOrderingDesc] = useState(false)
  const [difficulty, setDifficulty] = useState<number>(2)
  const [includeInactive, setIncludeInactive] = useState(false)
  const ratingPopRef = useRef<HTMLElement | null>(null)
  const [ratingPopEntry, setRatingPopEntry] = useState<ScoreTableEntry | null>(
    null,
  )

  const { scoreTable, noteInconsistency } = useMemo(() => {
    if (!recordResult.data) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const maxVersion = Math.max(...flattedEntries.map((entry) => entry.version))
    const scores =
      getFragmentData(
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

  const handleRatingPopOpen = (
    event: React.MouseEvent<HTMLElement>,
    entry: ScoreTableEntry,
  ) => {
    ratingPopRef.current = event.currentTarget
    setRatingPopEntry(entry)
  }
  const scoreStats = getScoreStats(
    includeInactive ? scoreTable : scoreTable.filter((s) => s.active),
  )

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
  const record = getFragmentData(dxIntlRecordsFields, player.dx_intl_record)

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
      <div className={classes["player-container"]}>
        <div>
          <Record
            record={record}
            updatedAt={player.updated_at}
            isPrivate={player.private}
          />

          <Toolbar aria-label="成績單選項" className={classes.toolbar}>
            {editableResult.error == null &&
            (editableResult.data?.dx_intl_players?.length ?? 0) > 0 ? (
              <LinkButton href={`/dxi/p/${params.nickname}/edit`}>
                <IconPencil /> 編輯
              </LinkButton>
            ) : null}
            <LinkButton href={`/dxi/p/${params.nickname}/history`}>
              <IconHistory /> 歷史紀錄
            </LinkButton>
            <Button onPress={downloadCSV}>
              <IconFileDownload /> 下載 CSV
            </Button>
          </Toolbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
            }}
          >
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
                  <ListBoxItem id="index">預設</ListBoxItem>
                  <ListBoxItem id="level">樂曲等級</ListBoxItem>
                  <ListBoxItem id="internal_lv">譜面定數</ListBoxItem>
                  <ListBoxItem id="score">成績</ListBoxItem>
                  <ListBoxItem id="rating">Rating 分數</ListBoxItem>
                  <ListBoxItem id="combo_flag">Combo 標記</ListBoxItem>
                  <ListBoxItem id="sync_flag">Sync 標記</ListBoxItem>
                </ListBox>
              </Popover>
            </Select>
            <ToggleButton isSelected={orderingDesc} onChange={setOrderingDesc}>
              {({ isSelected }) =>
                isSelected ? <IconArrowDown /> : <IconArrowUp />
              }
            </ToggleButton>
            <Switch onChange={setIncludeInactive}>
              <div className="indicator" /> 顯示刪除曲
            </Switch>
          </div>
          <div className={classes["score-stats"]}>
            {scoreStats.scoreStats.map((count, i) =>
              i !== 1 && i !== 2 ? (
                <div key={i}>
                  <span>{RANK_SCORES[i][1]}</span> {count}
                </div>
              ) : null,
            )}
            {scoreStats.comboStats.map((count, i) =>
              i !== 0 ? (
                <div key={i}>
                  <ComboFlag flag={comboFlags[i]} /> {count}
                </div>
              ) : null,
            )}
            {scoreStats.syncStats.map((count, i) =>
              i !== 0 ? (
                <div key={i}>
                  <SyncFlag flag={syncFlags[i]} /> {count}
                </div>
              ) : null,
            )}
          </div>
        </div>
        <div>
          {/* Change to nested tabs will hit
            https://github.com/adobe/react-spectrum/issues/5469 */}
          <Tabs
            className={classes["grouping-tab"]}
            slot="grouping"
            selectedKey={grouping}
            onSelectionChange={(v) => {
              setGrouping(v as typeof grouping)
            }}
          >
            <TabList>
              {Object.entries(groupKeyOptions).map(([k, v], i) => (
                <Tab key={k} id={k} style={{ flex: i == 0 ? "3" : "2" }}>
                  {v}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <Tabs slot="groups">
            <ScrollableTabList
              items={[...table.groupedData.keys()].map((key, index) => ({
                key,
                index,
              }))}
            >
              {({ key, index }) => (
                <Tab key={index} id={`${index}`}>
                  {getGroupTitle(grouping, key)} (
                  {table.groupedData.get(key)?.length})
                </Tab>
              )}
            </ScrollableTabList>
            {grouping === "category" || grouping === "version" ? (
              <RadioGroup
                value={difficulty.toString()}
                onChange={(v) => {
                  if (v) setDifficulty(parseInt(v, 10))
                }}
                style={{
                  height: "3rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "85%",
                }}
              >
                {["BSC", "ADV", "EXP", "MAS", "RE:M"].map((d, i) => (
                  <Radio
                    style={{ textTransform: "uppercase", flex: 1 }}
                    key={i}
                    value={i.toString()}
                    className={
                      classes[`toggle-difficulty-${i as 0 | 1 | 2 | 3 | 4}`]
                    }
                  >
                    {d}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <></>
            )}
            <Collection
              items={[...table.groupedData.entries()].map(
                ([key, table], index) => ({
                  key,
                  table,
                  index,
                }),
              )}
            >
              {({ table, index }) => (
                <TabPanel id={`${index}`}>
                  <PlayerScoreTable
                    table={table}
                    handleRatingPopOpen={handleRatingPopOpen}
                  />
                </TabPanel>
              )}
            </Collection>
          </Tabs>
        </div>
      </div>
      <Popover
        triggerRef={ratingPopRef}
        isOpen={!!ratingPopEntry}
        onOpenChange={(o) => {
          if (!o) {
            ratingPopRef.current = null
            setRatingPopEntry(null)
          }
        }}
      >
        <Dialog>
          {ratingPopEntry ? <NoteRating entry={ratingPopEntry} /> : null}
        </Dialog>
      </Popover>
    </>
  )
}
export default Player
