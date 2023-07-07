import { ResultOf } from "@graphql-typed-document-node/core"
import { groupByKey } from "../../common/utils/grouping"
import {
  RANK_SCORES,
  comboFlags,
  levels,
  syncFlags,
  versionTitleExcludes,
  versionTitles,
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

export const getRating = (score: number, internalLv: number): number => {
  const rankScore = RANK_SCORES[getRankScoreIndex(score)]
  return rankScore != null
    ? Math.floor(rankScore[2] * Math.min(100.5, score) * internalLv)
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
        deluxe: variant.deluxe,
        version: variant.version,
        active: variant.active,
        difficulty: note.difficulty,
        level: note.level,
        internal_lv: note.internal_lv,
      }))
    )
  )
export type ScoreTableEntry = ReturnType<typeof flatSongsResult>[number] & {
  score: number
  combo_flag: number
  sync_flag: number
  updated_at?: string
  current_version: boolean
  rating?: number
}

export const getVerTitleResults = (scoreTable: ScoreTableEntry[]) => {
  const results: Record<"fc" | "sss" | "ap" | "fdx", number[]> = {
    fc: [],
    sss: [],
    ap: [],
    fdx: [],
  }
  const versionGroups = groupByKey(scoreTable, "version")
  for (let ver = 1; ver < versionTitles.length; ver++) {
    const versionTable =
      [
        ...(ver == 1 ? versionGroups?.get(0) ?? [] : []),
        ...(versionGroups?.get(ver) ?? []),
      ].filter(
        (entry) =>
          entry.difficulty <= 3 && !versionTitleExcludes.includes(entry.song_id)
      ) ?? []
    if (versionTable.every((entry) => !!entry.combo_flag)) {
      results.fc.push(ver)
    }
    if (
      versionTable.every(
        (entry) => entry.combo_flag >= comboFlags.indexOf("ap")
      )
    ) {
      results.ap.push(ver)
    }
    if (versionTable.every((entry) => (entry.score ?? 0) >= 100) && ver != 1) {
      results.sss.push(ver)
    }
    if (
      versionTable.every((entry) => entry.sync_flag >= syncFlags.indexOf("fdx"))
    ) {
      results.fdx.push(ver)
    }
    return results
  }
}

export const tableGroupBy = [
  "category",
  "version",
  "level",
  "current_version",
] as const

export const tableOrderBy = [
  "default",
  "level",
  "internalLv",
  "score",
  "combo",
  "sync",
  "rating",
] as const
