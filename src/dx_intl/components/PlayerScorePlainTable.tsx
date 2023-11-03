import { ScoreTableEntry, getNoteHash } from "../models/aggregation"
import {
  categories,
  comboFlags,
  syncFlags,
  versions,
} from "../models/constants"
import { ComboFlag, SyncFlag } from "./Flags"
import classes from "./PlayerScoreTable.module.css"

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
  return (
    <div>
      <div>
        {[...groupedData.entries()].map(([group, table]) => (
          <div key={group?.toString()} className={classes["group-tab"]}>
            {getGroupTitle(grouping, group)} ({table.length})
          </div>
        ))}
      </div>
      <table className={classes.table}>
        {[...groupedData.entries()].map(([group, table]) => {
          return (
            <tbody key={group?.toString()}>
              <tr>
                <th>
                  {getGroupTitle(grouping, group)} ({table.length})
                </th>
              </tr>
              {table.map((entry) => (
                <tr key={getNoteHash(entry)}>
                  <td>{entry.title}</td>
                  <td>{entry.deluxe}</td>
                  <td>{entry.internal_lv ?? entry.level}</td>
                  <td>{entry.score}</td>
                  <td>
                    <ComboFlag flag={comboFlags[entry.combo_flag]} />
                    <SyncFlag flag={syncFlags[entry.sync_flag]} />
                  </td>
                </tr>
              ))}
            </tbody>
          )
        })}
      </table>
    </div>
  )
}
