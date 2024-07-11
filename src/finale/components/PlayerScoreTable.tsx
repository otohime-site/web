import clsx from "clsx"
import { ScoreTableEntry, getNoteHash } from "../models/aggregation"
import { comboFlags, syncFlags } from "../models/constants"
import { ComboFlag, SyncFlag } from "./Flags"
import classes from "./PlayerScoreTable.module.css"

export const PlayerScoreTable = ({ table }: { table: ScoreTableEntry[] }) => {
  return (
    <table className={classes.table}>
      <colgroup>
        <col className={classes["col-title"]} />
        <col className={classes["col-difficulty"]} />
        <col className={classes["col-score"]} />
        <col className={classes["col-flags"]} />
      </colgroup>
      <tbody>
        {table.map((entry) => (
          <tr
            key={getNoteHash(entry)}
            className={clsx(!entry.active && classes["inactive"])}
          >
            <td className={classes["col-title"]}>{entry.title}</td>
            <td
              className={clsx(
                classes["col-difficulty"],
                classes[
                  `difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4 | 5}`
                ],
                entry.level.includes("+")
                  ? classes["plus"]
                  : classes["non-plus"],
              )}
            >
              {entry.level}
            </td>
            <td className={classes["col-score"]}>
              {entry.score ? entry.score.toFixed(2) + "%" : ""}
            </td>
            <td className={classes["col-flags"]}>
              <ComboFlag flag={comboFlags[entry.combo_flag]} />
              <SyncFlag flag={syncFlags[entry.sync_flag]} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
