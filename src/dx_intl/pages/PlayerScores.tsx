import clsx from "clsx"
import { memo, useMemo, useState } from "react"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Switch } from "../../common/components/ui/Switch"
import { ComboFlag, SyncFlag } from "../components/Flags"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import { ScoreTableEntry, getScoreStats } from "../models/aggregation"
import { RANK_SCORES, comboFlags, syncFlags } from "../models/constants"
import classes from "./PlayerScores.module.css"

interface PlayerScoresProps {
  allEntries: ScoreTableEntry[]
  entries: ScoreTableEntry[]
  filterTitle: string
  includeInactive: boolean
  onNoteOpen: (
    event: React.MouseEvent<HTMLElement>,
    entry: ScoreTableEntry,
  ) => void
}

const PlayerScores = memo(function PlayerScores({
  allEntries,
  entries,
  filterTitle,
  includeInactive,
  onNoteOpen,
}: PlayerScoresProps) {
  const [allSongs, setAllSongs] = useState(false)
  const statsEntries = useMemo(
    () =>
      (allSongs ? allEntries : entries).filter(
        (entry) => includeInactive || entry.active,
      ),
    [allEntries, allSongs, entries, includeInactive],
  )
  const stats = useMemo(() => getScoreStats(statsEntries), [statsEntries])

  return (
    <div
      className={clsx(
        layoutClasses["player-container"],
        classes["scores-layout"],
      )}
    >
      <div>
        <section
          aria-labelledby="player-score-stats-title"
          className={classes["score-stats-block"]}
        >
          <div className={classes["stats-header"]}>
            <strong id="player-score-stats-title">
              {allSongs ? "全曲" : filterTitle} ({statsEntries.length})
            </strong>
            <Switch
              checked={allSongs}
              onCheckedChange={({ checked }) => setAllSongs(checked)}
            >
              全曲統計
            </Switch>
          </div>
          <div className={classes["stats-groups"]}>
            <section className={classes["stats-group"]}>
              <h3>達成率</h3>
              <ul className={classes["stats-list"]}>
                {stats.scoreStats.map((count, index) =>
                  index !== 1 && index !== 2 ? (
                    <li key={RANK_SCORES[index][1]}>
                      <span className={classes["rank-label"]}>
                        {RANK_SCORES[index][1]}
                      </span>
                      <span>{count}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
            <section className={classes["stats-group"]}>
              <h3>Combo</h3>
              <ul className={classes["stats-list"]}>
                {stats.comboStats.map((count, index) =>
                  index !== 0 ? (
                    <li key={comboFlags[index]}>
                      <ComboFlag flag={comboFlags[index]} />
                      <span>{count}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
            <section className={classes["stats-group"]}>
              <h3>Sync</h3>
              <ul className={classes["stats-list"]}>
                {stats.syncStats.map((count, index) =>
                  index !== 0 ? (
                    <li key={syncFlags[index]}>
                      <SyncFlag flag={syncFlags[index]} />
                      <span>{count}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          </div>
        </section>
      </div>
      <div>
        <PlayerScoreTable table={entries} handleNotePopupOpen={onNoteOpen} />
      </div>
    </div>
  )
})

export default PlayerScores
