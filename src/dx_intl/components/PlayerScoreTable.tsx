import clsx from "clsx"
import { Link } from "react-aria-components"
import { ScoreTableEntry, getNoteHash } from "../models/aggregation"
import { comboFlags, syncFlags } from "../models/constants"
import { ComboFlag, SyncFlag } from "./Flags"
import classes from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

export const PlayerScoreTable = ({
  table,
  handleRatingPopOpen,
}: {
  table: ScoreTableEntry[]
  handleRatingPopOpen: (
    event: React.MouseEvent<HTMLElement>,
    entry: ScoreTableEntry,
  ) => void
}) => {
  return (
    <table className={classes.table}>
      <colgroup>
        <col className={classes["col-title"]} />
        <col className={classes["col-deluxe"]} />
        <col className={classes["col-difficulty"]} />
        <col className={classes["col-score"]} />
        <col className={classes["col-flags"]} />
        <col className={classes["col-rating"]} />
      </colgroup>
      <tbody>
        {table.map((entry) => (
          <tr
            key={getNoteHash(entry)}
            className={clsx(
              !entry.active && classes["inactive"],
              entry.rating_used && classes["rating-used"],
            )}
          >
            <td className={classes["col-title"]}>
              <Link
                href={`/dxi/s/${entry.song_id.substring(0, 8)}/${
                  entry.deluxe ? "dx" : "std"
                }/${entry.difficulty}`}
              >
                {entry.title}
              </Link>
            </td>
            <td className={classes["col-deluxe"]}>
              <Variant deluxe={entry.deluxe} />
            </td>
            <td
              className={clsx(
                classes["col-difficulty"],
                classes[`difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4}`],
                entry.internal_lv
                  ? ""
                  : entry.level.includes("+")
                    ? classes["plus"]
                    : classes["non-plus"],
              )}
            >
              {entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}
            </td>
            <td className={classes["col-score"]}>
              {entry.score ? entry.score.toFixed(4) + "%" : ""}
            </td>
            <td className={classes["col-flags"]}>
              <ComboFlag flag={comboFlags[entry.combo_flag]} />
              <SyncFlag flag={syncFlags[entry.sync_flag]} />
            </td>
            <td
              className={clsx(
                classes["col-rating"],
                !entry.internal_lv && classes.estimated,
              )}
              onClick={(event) => handleRatingPopOpen(event, entry)}
            >
              {entry.rating}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
