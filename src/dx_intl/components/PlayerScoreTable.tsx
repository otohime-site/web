import clsx from "clsx"
import { Fragment, memo } from "react"
import { formatDate, formatNumericDate } from "../../common/utils/datetime"
import {
  ScoreTableEntry,
  getCoverUrl,
  getNoteHash,
} from "../models/aggregation"
import { comboFlags, syncFlags } from "../models/constants"
import { getDifficultyClassName } from "../utils/styling"
import ChartDetail from "./ChartDetail"
import { ComboFlag, SyncFlag } from "./Flags"
import Long from "./Long"
import classes from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

const percentageValueKeys = [
  "sss_rate",
  "fc_rate",
  "ap_rate",
  "rating_group_average",
  "rating_group_difference",
] as const

const getDisplayedValue = (
  entry: ScoreTableEntry,
  valueKey: keyof ScoreTableEntry,
) => {
  if (valueKey === "updated_at") {
    return entry.updated_at != null ? (
      <time
        dateTime={entry.updated_at}
        title={formatDate(new Date(entry.updated_at))}
      >
        {formatNumericDate(new Date(entry.updated_at))}
      </time>
    ) : (
      "—"
    )
  }

  if (
    percentageValueKeys.includes(
      valueKey as (typeof percentageValueKeys)[number],
    )
  ) {
    const value = entry[valueKey]
    if (typeof value !== "number") return "—"
    const percentage =
      valueKey === "sss_rate" ||
      valueKey === "fc_rate" ||
      valueKey === "ap_rate"
        ? value * 100
        : value
    const prefix =
      valueKey === "rating_group_difference" && percentage > 0 ? "+" : ""
    return `${prefix}${percentage.toFixed(1)}%`
  }

  return entry.rating
}

// Memoized: the table is large and most props are identity-stable, so
// unrelated Player state changes (e.g. the condensing top bar) skip it.
// Toggling a note detail re-renders the table like a filter change does.
const PlayerScoreTableBase = ({
  table,
  showCover,
  afterCircle,
  ratingGroupTarget,
  valueKey,
  expandedHash,
  onNoteToggle,
}: {
  table: ScoreTableEntry[]
  showCover: boolean
  afterCircle: boolean
  ratingGroupTarget?: number
  valueKey: keyof ScoreTableEntry
  expandedHash: string | null
  onNoteToggle: (hash: string) => void
}) => {
  return (
    <table
      className={clsx(
        classes.table,
        !showCover && classes["no-cover"],
        valueKey !== "rating" &&
          percentageValueKeys.includes(
            valueKey as (typeof percentageValueKeys)[number],
          ) &&
          classes["wide-value"],
        valueKey === "updated_at" && classes["date-value"],
      )}
    >
      <colgroup>
        {showCover ? <col className={classes["col-cover"]} /> : null}
        <col className={classes["col-title"]} />
        <col className={classes["col-deluxe"]} />
        <col className={classes["col-difficulty"]} />
        <col className={classes["col-score"]} />
        <col className={classes["col-flags"]} />
        <col className={classes["col-value"]} />
      </colgroup>
      <tbody>
        {table.map((entry) => {
          const hash = getNoteHash(entry)
          return (
            <Fragment key={hash}>
              <tr
                className={clsx(
                  !entry.active && classes["inactive"],
                  hash === expandedHash && classes["expanded"],
                )}
                onClick={() => onNoteToggle(hash)}
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
                  {entry.internal_lv
                    ? entry.internal_lv.toFixed(1)
                    : entry.level}
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
                    classes["col-value"],
                    valueKey === "rating" &&
                      !entry.internal_lv &&
                      classes.estimated,
                  )}
                >
                  <span
                    className={clsx(
                      classes["rating-value"],
                      valueKey === "rating" &&
                        entry.rating_used &&
                        classes["rating-used"],
                    )}
                  >
                    {getDisplayedValue(entry, valueKey)}
                  </span>
                </td>
              </tr>
              {hash === expandedHash ? (
                <tr className={classes["detail-row"]}>
                  <td colSpan={showCover ? 7 : 6}>
                    <ChartDetail
                      entry={entry}
                      showCover={!showCover}
                      afterCircle={afterCircle}
                      ratingGroupTarget={ratingGroupTarget}
                    />
                  </td>
                </tr>
              ) : null}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

export const PlayerScoreTable = memo(PlayerScoreTableBase)
