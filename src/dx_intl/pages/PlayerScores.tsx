import clsx from "clsx"
import { memo, useCallback, useMemo, useState } from "react"
import layoutClasses from "../../common/components/PlayerLayout.module.css"
import { Alert } from "../../common/components/ui/Alert"
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
  afterCircle: boolean
  difficulty: number | null
  // The folder difficulty only applies to category/version folders, so
  // the chips hide unless one of those folders is selected.
  showDifficulty: boolean
  ratingCount: number | null
  onIncludeInactiveChange: (includeInactive: boolean) => void
  onShowCoverChange: (showCover: boolean) => void
  onDifficultyChange: (difficulty: number | null) => void
}

const PlayerScores = memo(function PlayerScores({
  allEntries,
  entries,
  filterTitle,
  includeInactive,
  showCover,
  afterCircle,
  difficulty,
  showDifficulty,
  ratingCount,
  onIncludeInactiveChange,
  onShowCoverChange,
  onDifficultyChange,
}: PlayerScoresProps) {
  const [allSongs, setAllSongs] = useState(false)
  const [expandedHash, setExpandedHash] = useState<string | null>(null)
  const handleNoteToggle = useCallback((hash: string) => {
    setExpandedHash((current) => (current === hash ? null : hash))
  }, [])
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
        ) : ratingCount != null ? (
          <section
            aria-label="Rating 組成說明"
            className={classes["rating-notice"]}
          >
            <Alert severity="info">
              採計前 {ratingCount} / 顯示前 {ratingCount * 2}
            </Alert>
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
          afterCircle={afterCircle}
          expandedHash={expandedHash}
          onNoteToggle={handleNoteToggle}
        />
      </div>
    </div>
  )
})

export default PlayerScores
