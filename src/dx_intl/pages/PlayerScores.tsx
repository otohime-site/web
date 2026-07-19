import clsx from "clsx"
import { memo, useMemo, useState } from "react"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Switch } from "../../common/components/ui/Switch"
import { ComboFlag, SyncFlag } from "../components/Flags"
import { DifficultyFolders } from "../components/Folders"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import { ScoreTableEntry, getScoreStats } from "../models/aggregation"
import { RANK_SCORES, comboFlags, syncFlags } from "../models/constants"
import classes from "./PlayerScores.module.css"

interface PlayerScoresProps {
  allEntries: ScoreTableEntry[]
  entries: ScoreTableEntry[]
  filterTitle: string
  includeInactive: boolean
  showCover: boolean
  difficulty: number | null
  // The folder difficulty only applies to category/version folders, so
  // the chips hide unless one of those folders is selected.
  showDifficulty: boolean
  onIncludeInactiveChange: (includeInactive: boolean) => void
  onShowCoverChange: (showCover: boolean) => void
  onDifficultyChange: (difficulty: number | null) => void
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
  showCover,
  difficulty,
  showDifficulty,
  onIncludeInactiveChange,
  onShowCoverChange,
  onDifficultyChange,
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
        <div className={classes["view-settings"]}>
          <Switch
            checked={includeInactive}
            onCheckedChange={({ checked }) => onIncludeInactiveChange(checked)}
          >
            顯示已刪除樂曲
          </Switch>
          <Switch
            checked={showCover}
            onCheckedChange={({ checked }) => onShowCoverChange(checked)}
          >
            顯示封面
          </Switch>
        </div>
        {showDifficulty ? (
          <section
            aria-label="分類／版本難易度"
            className={classes["difficulty-folders"]}
          >
            <DifficultyFolders
              difficulty={difficulty}
              onDifficultyChange={onDifficultyChange}
            />
          </section>
        ) : null}
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
        <PlayerScoreTable
          table={entries}
          showCover={showCover}
          handleNotePopupOpen={onNoteOpen}
        />
      </div>
    </div>
  )
})

export default PlayerScores
