import { groupByKey } from "../../common/utils/grouping"
import { ResultOf } from "../../graphql"
import {
  RANK_CONST_BORDERS,
  RANK_SCORES,
  categories,
  comboFlags,
  levels,
  syncFlags,
  versionTitleExcludes,
  versionTitles,
  versions,
} from "./constants"
import { dxIntlSongsDocument } from "./queries"

export const getNoteHash = (instance: {
  // As we cannot restrict null in history tables
  song_id: string
  deluxe: boolean
  difficulty: number
}): string =>
  `${instance.song_id}_${instance.deluxe ? "t" : "f"}_${
    instance.difficulty ?? "-1"
  }`

// Get current index of SCORE_RANKS that matches the score
export const getRankScoreIndex = (score: number): number =>
  RANK_SCORES.reduce((curr, rank, idx) => (rank[0] <= score ? idx : curr), -1)

export const getRankConstIndex = (score: number): number =>
  RANK_CONST_BORDERS.reduce(
    (curr, rank, idx) => (rank[0] <= score * 10000 ? idx : curr),
    -1,
  )

export const ESTIMATED_INTERNAL_LV: Record<(typeof levels)[number], number> = {
  "1": 1.5,
  "2": 2.5,
  "3": 3.5,
  "4": 4.5,
  "5": 5.5,
  "6": 6.5,
  "7": 7.3,
  "7+": 7.8,
  "8": 8.3,
  "8+": 8.8,
  "9": 9.3,
  "9+": 9.8,
  "10": 10.3,
  "10+": 10.8,
  "11": 11.3,
  "11+": 11.8,
  "12": 12.3,
  "12+": 12.8,
  "13": 13.3,
  "13+": 13.8,
  "14": 14.3,
  "14+": 14.8,
  "15": 15, // While it should not happen
}
export const levelCompareKey: Record<(typeof levels)[number], number> = {
  "1": 1.0,
  "2": 2.0,
  "3": 3.0,
  "4": 4.0,
  "5": 5.0,
  "6": 6.0,
  "7": 7.0,
  "7+": 7.7,
  "8": 8.0,
  "8+": 8.7,
  "9": 9.0,
  "9+": 9.7,
  "10": 10.0,
  "10+": 10.7,
  "11": 11.0,
  "11+": 11.7,
  // Make sure non internal lv appears first
  "12": 12.0 - 0.01,
  "12+": 12.7 - 0.01,
  "13": 13.0 - 0.01,
  "13+": 13.7 - 0.01,
  "14": 14.0 - 0.01,
  "14+": 14.7 - 0.01,
  "15": 15.0 - 0.01,
}
export const getRating = (
  internalLv: number,
  score: number,
  ap?: boolean,
): number => {
  // AP bounus will be applied in CiRCLE.
  // Before the version upgrade, other logic will ensure `ap` will always be `false`.
  const rankScore = RANK_CONST_BORDERS[getRankConstIndex(score)]
  return rankScore != null
    ? Math.floor(
        (rankScore[1] * Math.min(1005000, score * 10000) * (internalLv * 10)) /
          100000000,
      ) + (ap ? 1 : 0)
    : 0
}

export const flatSongsResult = (data?: ResultOf<typeof dxIntlSongsDocument>) =>
  (data?.dx_intl_songs ?? []).flatMap((song) =>
    song.dx_intl_variants.flatMap((variant) =>
      variant.dx_intl_notes.map((note) => ({
        hash: getNoteHash({
          song_id: song.id,
          deluxe: variant.deluxe,
          difficulty: note.difficulty,
        }),
        song_id: song.id,
        category: song.category,
        title: song.title,
        order: song.order,
        artist: song.artist,
        title_kana: song.title_kana,
        deluxe: variant.deluxe,
        version: variant.version,
        active: variant.active,
        difficulty: note.difficulty,
        level: note.level,
        internal_lv: note.internal_lv,
        play: note.dx_intl_scores_rates?.play,
        sss_rate: note.dx_intl_scores_rates?.sss_rate,
        fc_rate: note.dx_intl_scores_rates?.fc_rate,
        ap_rate: note.dx_intl_scores_rates?.ap_rate,
        // Currently DXNET did not expose this
        // so we hard-coded it in the frontend for now.
        long:
          song.title === "Xaleid◆scopiX" ||
          song.title === "Ref:rain (for 7th Heaven)",
      })),
    ),
  )
export type ScoreTableEntry = ReturnType<typeof flatSongsResult>[number] & {
  index: number
  score?: number
  combo_flag: number
  sync_flag: number
  updated_at?: string
  current_version: boolean
  rating: number
  // Record the ranking for the rating in old/new songs
  old_rank?: number
  new_rank?: number
  // Whether to display in the rating target tabs
  rating_listed: boolean
  // Whether it is in the current ranking
  rating_used: boolean
}

export const getScoreStats = (
  scores: ScoreTableEntry[],
): {
  scoreStats: number[]
  comboStats: number[]
  syncStats: number[]
} => {
  const scoreStats = RANK_SCORES.map(
    (_, i) =>
      scores.filter((s) => s.score && getRankScoreIndex(s.score) >= i).length,
  )
  const comboStats = comboFlags.map(
    (_, i) => scores.filter((s) => s.combo_flag >= i).length,
  )
  const syncStats = syncFlags.map(
    (_, i) => scores.filter((s) => s.sync_flag >= i).length,
  )
  return { scoreStats, comboStats, syncStats }
}

export const getVerTitleResults = (scoreTable: ScoreTableEntry[]) => {
  const results: Record<"fc" | "sss" | "ap" | "fdx", number[]> = {
    fc: [],
    sss: [],
    ap: [],
    fdx: [],
  }
  const versionGroups = groupByKey(scoreTable, "version")
  const sssIndex = RANK_SCORES.findIndex((s) => s[1] == "SSS")
  const fcIndex = comboFlags.indexOf("fc")
  const apIndex = comboFlags.indexOf("ap")
  const fdxIndex = syncFlags.indexOf("fdx")

  for (let ver = 1; ver < versionTitles.length; ver++) {
    const versionTable =
      [
        ...(ver == 1 ? (versionGroups?.get(0) ?? []) : []),
        ...(versionGroups?.get(ver) ?? []),
      ].filter(
        (entry) =>
          entry.active &&
          entry.difficulty <= 3 &&
          !versionTitleExcludes.includes(entry.song_id),
      ) ?? []
    const { scoreStats, comboStats, syncStats } = getScoreStats(versionTable)
    const count = versionTable.length
    if (count == scoreStats[sssIndex] && ver != 1) {
      results.sss.push(ver)
    }
    if (count == comboStats[fcIndex]) {
      results.fc.push(ver)
    }
    if (count == comboStats[apIndex]) {
      results.ap.push(ver)
    }
    if (count == syncStats[fdxIndex]) {
      results.fdx.push(ver)
    }
  }
  return results
}

export const getGroupTitle = (
  grouping: string,
  group: string | number | boolean | null | undefined,
): string => {
  switch (grouping) {
    case "current_version":
      return group ? "新曲" : "舊曲"
    case "category":
      return categories[group as number] ?? ""
    case "version":
      return versions[group as number]
    case "level":
      return `Level ${group}`
  }
  return ""
}

export const getCoverUrl = (songId: string) => {
  return `https://covers.otohi.me/${songId.substring(0, 8)}.webp`
}
