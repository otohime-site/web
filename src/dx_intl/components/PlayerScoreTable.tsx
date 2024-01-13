import clsx from "clsx"
import { useState } from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components"
import { ScoreTableEntry, getNoteHash } from "../models/aggregation"
import {
  categories,
  comboFlags,
  syncFlags,
  versions,
} from "../models/constants"
import { ComboFlag, SyncFlag } from "./Flags"
import classes from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

const getGroupTitle = (
  grouping: string,
  group: string | number | boolean | null | undefined,
): string => {
  switch (grouping) {
    case "current_version":
      return group ? "新曲" : "舊曲"
    case "category":
      return categories[group as number] ?? ""
    case "version":
      return versions[group as number]
    case "level":
      return `Level ${group}`
  }
  return ""
}

export const PlayerScoreTable = ({
  grouping,
  groupedData,
}: {
  grouping: string
  groupedData: Map<
    string | number | boolean | null | undefined,
    ScoreTableEntry[]
  >
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  return (
    <Tabs
      selectedKey={selectedTab.toString()}
      onSelectionChange={(key) => {
        if (typeof key == "string") {
          setSelectedTab(parseInt(key, 10))
        }
      }}
    >
      <div className={classes["scrollable-tab"]}>
        <TabList>
          {[...groupedData.entries()].map(([group, table], i) => (
            <Tab key={group?.toString()} id={i.toString()}>
              {getGroupTitle(grouping, group)} ({table.length})
            </Tab>
          ))}
        </TabList>
      </div>
      {[...groupedData.entries()].map(([group, table], i) => {
        return (
          <TabPanel
            id={i.toString()}
            key={`{i} group?.toString()`}
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          >
            <table className={classes.table}>
              <colgroup>
                <col className="col-title" />
                <col className="col-deluxe" />
                <col className="col-difficulty" />
                <col className="col-score" />
                <col className="col-flags" />
                <col className="col-rating" />
              </colgroup>
              <tbody key={group?.toString()}>
                <th scope="rowgroup" colSpan={6}>
                  {getGroupTitle(grouping, group)} ({table.length})
                </th>{" "}
                {table.map((entry) => (
                  <tr
                    key={getNoteHash(entry)}
                    className={entry.active ? "" : "inactive"}
                  >
                    <td className="col-title">{entry.title}</td>
                    <td className="col-deluxe">
                      <Variant deluxe={entry.deluxe} />
                    </td>
                    <td
                      className={clsx(
                        "col-difficulty",
                        classes[
                          `difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4}`
                        ],
                        entry.internal_lv
                          ? ""
                          : entry.level.includes("+")
                            ? "plus"
                            : "non-plus",
                      )}
                    >
                      {entry.internal_lv
                        ? entry.internal_lv.toFixed(1)
                        : entry.level}
                    </td>
                    <td className="col-score">
                      {entry.score ? entry.score.toFixed(4) + "%" : ""}
                    </td>
                    <td className="col-flags">
                      <ComboFlag flag={comboFlags[entry.combo_flag]} />
                      <SyncFlag flag={syncFlags[entry.sync_flag]} />
                    </td>
                    <td
                      className={clsx(
                        "col-rating",
                        !entry.internal_lv && classes.estimated,
                      )}
                    >
                      {entry.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
              )
            </table>
          </TabPanel>
        )
      })}
    </Tabs>
  )
}
