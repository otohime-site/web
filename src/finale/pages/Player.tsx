import { createListCollection } from "@ark-ui/react/collection"
import { RadioGroup } from "@ark-ui/react/radio-group"
import { Select } from "@ark-ui/react/select"
import { Tabs } from "@ark-ui/react/tabs"
import { Toggle } from "@ark-ui/react/toggle"
import { useMemo, useState } from "react"
import { Titled } from "react-titled"
import { useMutation, useQuery } from "urql"
import { Params } from "wouter"
import { navigate } from "wouter/use-browser-location"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import MdiDeleteAlert from "~icons/mdi/delete-alert"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
import { RadioGroupItem } from "../../common/components/ui/RadioGroupItem"
import { ScrollableTabList } from "../../common/components/ui/ScrollableTabList"
import { SelectContainer } from "../../common/components/ui/SelectContainer"
import { Switch } from "../../common/components/ui/Switch"
import { useUser } from "../../common/contexts"
import { useTable } from "../../common/utils/table"
import { levels } from "../../dx_intl/models/constants"
import { graphql, readFragment } from "../../graphql"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import Record from "../components/Record"
import {
  flatSongsResult,
  getGroupTitle,
  getNoteHash,
  ScoreTableEntry,
} from "../models/aggregation"
import { comboFlags, syncFlags } from "../models/constants"
import { finaleRecordsFields, finaleScoresFields } from "../models/fragments"
import {
  finalePlayersEditableDocument,
  finaleSongsDocument,
} from "../models/queries"
import classes from "./Player.module.css"

const finaleRecordWithScoresDocument = graphql(
  `
    query finaleRecordWithScores($nickname: String!) {
      finale_players(where: { nickname: { _eq: $nickname } }) {
        id
        updated_at
        private
        finale_record {
          ...finaleRecordsFields
        }
        finale_scores {
          ...finaleScoresFields
        }
      }
    }
  `,
  [finaleRecordsFields, finaleScoresFields],
)

const deleteFinalePlayerDocument = graphql(`
  mutation deleteFinalePlayer($pk: Int!) {
    delete_finale_players_by_pk(id: $pk) {
      id
    }
  }
`)
const groupKeyOptions = {
  category: "分類",
  version: "版本",
  level: "等級",
} as const

const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  const [editableResult] = useQuery({
    query: finalePlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: finaleRecordWithScoresDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [songsResult] = useQuery({ query: finaleSongsDocument })
  const [, deletePlayer] = useMutation(deleteFinalePlayerDocument)

  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )

  const [grouping, setGrouping] = useState<"category" | "version" | "level">(
    "category",
  )
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [ordering, setOrdering] = useState<
    "index" | "level" | "score" | "combo_flag" | "sync_flag"
  >("index")
  const [orderingDesc, setOrderingDesc] = useState(false)
  const [difficulty, setDifficulty] = useState<number>(3)
  const [includeInactive, setIncludeInactive] = useState(false)

  const scoreTable = useMemo(() => {
    if (!recordResult.data) {
      return []
    }
    const scores =
      readFragment(
        finaleScoresFields,
        recordResult.data.finale_players[0]?.finale_scores ?? [],
      ) ?? []
    const scoresMap = new Map(
      scores.map((score) => [getNoteHash(score), score]),
    )
    return flattedEntries.map<ScoreTableEntry>((entry, index) => {
      const score = scoresMap.get(entry.hash)
      scoresMap.delete(entry.hash)
      return {
        index,
        ...entry,
        score: score?.score,
        combo_flag: comboFlags.indexOf(score?.combo_flag ?? ""),
        sync_flag: syncFlags.indexOf(score?.sync_flag ?? ""),
        updated_at: score?.start,
      }
    })
  }, [flattedEntries, recordResult])

  const table = useTable({
    data: scoreTable,
    grouping,
    ordering: [{ key: ordering, desc: orderingDesc }],
    difficulty,
    includeInactive,
    sortingFns: {
      // Ensure difficulty is also considered
      // In case like group with level
      index: (a, b) =>
        a.difficulty !== b.difficulty
          ? a.difficulty - b.difficulty
          : a.index - b.index,
      level: (a, b) => levels.indexOf(a.level) - levels.indexOf(b.level),
    },
    filterFn: (entry, options) => {
      switch (options.grouping) {
        case "level":
          return true
        default:
          return entry.difficulty === options.difficulty
      }
    },
  })

  const handleDeletePlayer = async (): Promise<void> => {
    if (
      prompt(`
是否確定要移除成績單？成績單與你在網站上的歷史紀錄將被移除。
此動作無法復原！

如果您已經確定了，請在下面重新輸入你的成績單暱稱（${
        params.nickname ?? ""
      }）。`) !== params.nickname
    ) {
      return
    }
    const playerId = recordResult.data?.finale_players[0]?.id
    if (playerId == null) {
      throw new Error("No Player ID!")
    }
    await deletePlayer({ pk: playerId })
    navigate("/")
  }

  if (recordResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.finale_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.finale_players[0]
  const record = readFragment(finaleRecordsFields, player.finale_record)

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }
  const collection = createListCollection({
    items: [
      { group: "譜面", value: "index", label: "預設" },
      { group: "譜面", value: "level", label: "樂曲等級" },
      { group: "成績單", value: "score", label: "成績" },
      { group: "成績單", value: "combo_flag", label: "Combo 標記" },
      { group: "成績單", value: "sync_flag", label: "Sync 標記" },
    ],
    groupBy: (item) => item.group,
  })

  return (
    <>
      <Titled
        title={(title) => `${record.card_name} - 舊版 maimai 成績單 - ${title}`}
      />
      <Alert severity="info">
        <p>這是從以前 Semiquaver 成績單系統中轉移的 maimai 舊框成績單。</p>
      </Alert>
      <div className={layoutClasses["player-container"]}>
        <div>
          <Record
            record={record}
            updatedAt={player.updated_at}
            isPrivate={player.private}
          />
          {editableResult.error == null &&
          (editableResult.data?.finale_players?.length ?? 0) > 0 ? (
            <button onClick={handleDeletePlayer}>
              <MdiDeleteAlert /> 刪除
            </button>
          ) : null}
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
                    | "score"
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
                <Tabs.Trigger key={key} value={key}>
                  {groupKeyOptions[key as typeof grouping]}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </div>
          <Tabs.Content value={grouping}>
            <Tabs.Root
              value={`${selectedGroup}`}
              onValueChange={({ value }) =>
                setSelectedGroup(parseInt(value, 10))
              }
            >
              <div
                className={layoutClasses["sticky-header"]}
                style={{ top: "87.5px" }}
              >
                <ScrollableTabList>
                  {[...table.groupedData.keys()].map((key, index) => (
                    <Tabs.Trigger key={index} value={`${index}`}>
                      {getGroupTitle(grouping, key)} (
                      {table.groupedData.get(key)?.length})
                    </Tabs.Trigger>
                  ))}
                </ScrollableTabList>
              </div>
              {grouping === "category" || grouping === "version" ? (
                <RadioGroup.Root
                  value={difficulty.toString()}
                  onValueChange={(v) => {
                    if (v.value) setDifficulty(parseInt(v.value, 10))
                  }}
                  className={layoutClasses["tab-like-radio-group"]}
                >
                  {["EAS", "BSC", "ADV", "EXP", "MAS", "RE:M"].map((d, i) => (
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

              {[...table.groupedData.values()].map((table, index) => (
                <Tabs.Content key={index} value={index.toString()}>
                  <PlayerScoreTable table={table} />
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  )
}

export default Player
