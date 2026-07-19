import clsx from "clsx"
import { memo } from "react"
import {
  ScoreTableEntry,
  getCoverUrl,
  getNoteHash,
} from "../models/aggregation"
import { comboFlags, syncFlags } from "../models/constants"
import { getDifficultyClassName } from "../utils/styling"
import { ComboFlag, SyncFlag } from "./Flags"
import Long from "./Long"
import classes from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

// Memoized: the table is large and its props are identity-stable, so
// unrelated Player state changes (e.g. the condensing top bar) skip it.
const PlayerScoreTableBase = ({
  table,
  showCover,
  handleNotePopupOpen,
}: {
  table: ScoreTableEntry[]
  showCover: boolean
  handleNotePopupOpen: (
    event: React.MouseEvent<HTMLElement>,
    entry: ScoreTableEntry,
  ) => void
}) => {
  return (
    <table className={clsx(classes.table, !showCover && classes["no-cover"])}>
      <colgroup>
        {showCover ? <col className={classes["col-cover"]} /> : null}
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
            className={clsx(!entry.active && classes["inactive"])}
            onClick={(event) => handleNotePopupOpen(event, entry)}
          >
            {showCover ? (
              <td className={classes["col-cover"]}>
                <img
                  src={getCoverUrl(entry.song_id)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </td>
            ) : null}
            <td className={classes["col-title"]}>
              {entry.title}
              <Long long={entry.long} />
            </td>
            <td className={classes["col-deluxe"]}>
              <Variant deluxe={entry.deluxe} />
            </td>
            <td className={getDifficultyClassName(classes, entry)}>
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
            >
              <span
                className={clsx(
                  classes["rating-value"],
                  entry.rating_used && classes["rating-used"],
                )}
              >
                {entry.rating}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const PlayerScoreTable = memo(PlayerScoreTableBase)
