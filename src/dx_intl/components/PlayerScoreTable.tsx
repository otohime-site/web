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
        <col className="col-title" />
        <col className="col-deluxe" />
        <col className="col-difficulty" />
        <col className="col-score" />
        <col className="col-flags" />
        <col className="col-rating" />
      </colgroup>
      <tbody>
        {table.map((entry) => (
          <tr
            key={getNoteHash(entry)}
            className={clsx(
              !entry.active && "inactive",
              entry.rating_used && classes["rating-used"],
            )}
          >
            <td className="col-title">
              <Link
                href={`/dxi/s/${entry.song_id.substring(0, 8)}/${
                  entry.deluxe ? "dx" : "std"
                }/${entry.difficulty}`}
              >
                {entry.title}
              </Link>
            </td>
            <td className="col-deluxe">
              <Variant deluxe={entry.deluxe} />
            </td>
            <td
              className={clsx(
                "col-difficulty",
                classes[`difficulty-${entry.difficulty as 0 | 1 | 2 | 3 | 4}`],
                entry.internal_lv
                  ? ""
                  : entry.level.includes("+")
                    ? "plus"
                    : "non-plus",
              )}
            >
              {entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}
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
