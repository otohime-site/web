import { comboFlags, RANK_SCORES, syncFlags } from "./models/constants"

// Get current index of SCORE_RANKS that matches the score
export const getRankScoreIndex = (score: number): number =>
  RANK_SCORES.reduce((curr, rank, idx) => (rank[0] <= score ? idx : curr), -1)

const getScoreStatKey = (score: number): ScoreStat[] => {
  const index = getRankScoreIndex(score)
  return index === -1
    ? []
    : RANK_SCORES.slice(0, index + 1)
        .map((s) => s[1])
        .filter((st): st is ScoreStat => st !== "AA" && st !== "AAA")
}

export const arrangeScoreStats = (
  scores: Array<{ score: number } | undefined>,
): Map<ScoreStat, number> =>
  scores.reduce(
    (prev, curr) => {
      const ranks: ScoreStat[] = curr != null ? getScoreStatKey(curr.score) : []
      ranks.forEach((rank) => {
        prev.set(rank, (prev.get(rank) ?? 0) + 1)
      })
      return prev
    },
    new Map(SCORE_STATS.map((rank) => [rank, 0])),
  )

export const SCORE_STATS = ["A", "S", "S+", "SS", "SS+", "SSS", "SSS+"] as const
type ScoreStat = (typeof SCORE_STATS)[number]

export const arrangeComboStats = (
  scores: Array<{ combo_flag: (typeof comboFlags)[number] } | undefined>,
): Map<ComboStat, number> =>
  scores.reduce(
    (prev, row) => {
      const comboFlag = row?.combo_flag ?? ""
      if (comboFlag !== "") {
        const combos = COMBO_STATS.slice(0, COMBO_STATS.indexOf(comboFlag) + 1)
        combos.forEach((combo) => {
          prev.set(combo, (prev.get(combo) ?? 0) + 1)
        })
      }
      return prev
    },
    new Map(COMBO_STATS.map((combo) => [combo, 0])),
  )

export const COMBO_STATS = ["fc", "fc+", "ap", "ap+"] as const
type ComboStat = (typeof COMBO_STATS)[number]

export const arrangeSyncStats = (
  scores: Array<{ sync_flag: (typeof syncFlags)[number] } | undefined>,
): Map<SyncStat, number> =>
  scores.reduce(
    (prev, row) => {
      const syncFlag = row?.sync_flag ?? ""
      if (syncFlag !== "") {
        const syncs = SYNC_STATS.slice(0, SYNC_STATS.indexOf(syncFlag) + 1)
        syncs.forEach((sync) => {
          prev.set(sync, (prev.get(sync) ?? 0) + 1)
        })
      }
      return prev
    },
    new Map(SYNC_STATS.map((sync) => [sync, 0])),
  )

export const SYNC_STATS = ["fs", "fs+", "fdx", "fdx+"] as const
type SyncStat = (typeof SYNC_STATS)[number]
