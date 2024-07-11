import IconArrowDropDown from "~icons/mdi/arrow-drop-down"

import clsx from "clsx"
import { useMemo, useState } from "react"
import {
  Button,
  Collection,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Radio,
  RadioGroup,
  Section,
  Select,
  SelectValue,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsContext,
  ToggleButton,
} from "react-aria-components"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconArrowUp from "~icons/mdi/arrow-up"
import IconPencil from "~icons/mdi/pencil"
import layoutClasses from "../../common/components/PlayerLayout.module.scss"
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { ScrollableTabList } from "../../common/components/ui/ScrollableTabList"
import { useUser } from "../../common/contexts"
import { useTable } from "../../common/utils/table"
import { levels } from "../../dx_intl/models/constants"
import { graphql, readFragment } from "../../graphql"
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

const finaleRecordWithScoresDocument = graphql(
  `
    query finaleRecordWithScores($nickname: String!) {
      finale_players(where: { nickname: { _eq: $nickname } }) {
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
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )

  const [grouping, setGrouping] = useState<"category" | "version" | "level">(
    "category",
  )
  const [selectedGroup, setSelectedGroup] = useState<string | number | null>(
    null,
  )
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
  return (
    <TabsContext.Provider
      value={{
        selectedKey: selectedGroup,
        onSelectionChange: setSelectedGroup,
      }}
    >
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
            <LinkButton href={`/fin/p/${params.nickname}/edit`}>
              <IconPencil /> 編輯
            </LinkButton>
          ) : null}
          <Select
            selectedKey={ordering}
            onSelectionChange={(selected) =>
              setOrdering(
                selected as
                  | "index"
                  | "level"
                  | "score"
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
            <Popover
              ref={(ref) =>
                // https://github.com/adobe/react-spectrum/issues/1513
                ref?.addEventListener("touchend", (e) => e.preventDefault())
              }
            >
              <ListBox>
                <Section>
                  <Header>譜面</Header>
                  <ListBoxItem id="index">預設</ListBoxItem>
                  <ListBoxItem id="level">樂曲等級</ListBoxItem>
                </Section>
                <Section>
                  <Header>成績單</Header>
                  <ListBoxItem id="score">成績</ListBoxItem>
                  <ListBoxItem id="combo_flag">Combo 標記</ListBoxItem>
                  <ListBoxItem id="sync_flag">Sync 標記</ListBoxItem>
                </Section>
              </ListBox>
            </Popover>
          </Select>
          <ToggleButton isSelected={orderingDesc} onChange={setOrderingDesc}>
            {({ isSelected }) =>
              isSelected ? <IconArrowDown /> : <IconArrowUp />
            }
          </ToggleButton>
          <Switch isSelected={includeInactive} onChange={setIncludeInactive}>
            <div className="indicator" /> 顯示刪除曲
          </Switch>
        </div>
        {/* Nested tab will hit the following issue and unreliable 
            https://github.com/adobe/react-spectrum/issues/5469 */}
        <Tabs slot="groups">
          <div className={layoutClasses["sticky-header"]}>
            <RadioGroup
              orientation="horizontal"
              value={grouping}
              onChange={(v) => {
                if (v) setGrouping(v as typeof grouping)
              }}
              className={layoutClasses["tab-like-radio-group"]}
            >
              {Object.entries(groupKeyOptions).map(([k, v]) => (
                <Radio
                  key={k}
                  value={k}
                  className={layoutClasses["tab-like-radio"]}
                >
                  {v}
                </Radio>
              ))}
            </RadioGroup>
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
                orientation="horizontal"
                value={difficulty.toString()}
                onChange={(v) => {
                  if (v) setDifficulty(parseInt(v, 10))
                }}
                className={layoutClasses["tab-like-radio-group"]}
              >
                {["EAS", "BSC", "ADV", "EXP", "MAS", "RE:M"].map((d, i) => (
                  <Radio
                    key={i}
                    value={i.toString()}
                    className={clsx(
                      layoutClasses["tab-like-radio"],
                      /*classes[`radio-difficulty-${i as 0 | 1 | 2 | 3 | 4}]*/
                    )}
                  >
                    {d}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <></>
            )}
          </div>
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
              <TabPanel id={`${index}`}>{JSON.stringify(table)}</TabPanel>
            )}
          </Collection>
        </Tabs>
      </div>
    </TabsContext.Provider>
  )
}

export default Player
