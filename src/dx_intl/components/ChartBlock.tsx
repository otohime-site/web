import { type ReactNode } from "react"
import { Link } from "wouter"
import { type flatSongsResult, getCoverUrl } from "../models/aggregation"
import { type Difficulty, difficulties } from "../models/constants"
import classes from "./ChartBlock.module.css"
import tableClasses from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

type ChartEntry = ReturnType<typeof flatSongsResult>[number]

interface ChartBlockProps {
  entry: ChartEntry
  rank?: ReactNode
  value?: ReactNode
}

const ChartBlock = ({ entry, rank, value }: ChartBlockProps) => (
  <Link
    className={classes["chart-block"]}
    href={`~/dxi/s/${entry.song_id.substring(0, 8)}`}
  >
    <img
      className={classes["chart-cover"]}
      src={getCoverUrl(entry.song_id)}
      alt=""
    />
    {rank != null && <span className={classes["chart-rank"]}>{rank}</span>}
    <span className={classes["chart-info"]}>
      <span className={classes["chart-title"]}>{entry.title}</span>
      <span className={classes["chart-meta"]}>
        <Variant deluxe={entry.deluxe} />
        <span
          className={
            tableClasses[`difficulty-${entry.difficulty as Difficulty}`]
          }
        >
          {difficulties[entry.difficulty]}{" "}
          {entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}
        </span>
      </span>
    </span>
    {value != null && <span className={classes["chart-play"]}>{value}</span>}
  </Link>
)

export { ChartBlock, classes as chartBlockClasses }
