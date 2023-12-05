import clsx from "clsx"
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
        <colgroup>
          <col className="col-title" />
          <col className="col-deluxe" />
          <col className="col-difficulty" />
          <col className="col-score" />
          <col className="col-flags" />
        </colgroup>
        {[...groupedData.entries()].map(([group, table]) => {
          return (
            <tbody key={group?.toString()}>
              <th scope="rowgroup" colSpan={5}>
                {getGroupTitle(grouping, group)} ({table.length})
              </th>
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
                </tr>
              ))}
            </tbody>
          )
        })}
      </table>
    </div>
  )
}
