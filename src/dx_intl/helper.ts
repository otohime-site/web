import {
  Scalars,
  Dx_Intl_Scores,
  Dx_Intl_Songs,
  Dx_Intl_Variants,
  Dx_Intl_Notes,
} from "../generated/graphql"

// eslint-disable-next-line no-sparse-arrays
export const categories = [
  ,
  // start from 1
  "POPS & ANIME",
  "niconico ＆ VOCALOID™",
  "東方Project",
  "GAME＆VARIETY",
  "maimai",
  "オンゲキ＆CHUNITHM",
] as const

export const versions = [
  "maimai",
  "maimai PLUS",
  "GreeN",
  "GreeN PLUS",
  "ORANGE",
  "ORANGE PLUS",
  "PiNK",
  "PinK PLUS",
  "MURASAKi",
  "MURASAKi PLUS",
  "MiLK",
  "MiLK PLUS",
  "FiNALE",
  "DX",
  "DX Plus",
  "Splash",
  "Splash PLUS",
] as const

export const levels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "7+",
  "8",
  "8+",
  "9",
  "9+",
  "10",
  "10+",
  "11",
  "11+",
  "12",
  "12+",
  "13",
  "13+",
  "14",
  "14+",
  "15",
] as const

export const difficulties = [
  "Basic",
  "Advanced",
  "Expert",
  "Master",
  "Re:Master",
] as const

export const comboFlags = ["", "fc", "fc+", "ap", "ap+"] as const
export const syncFlags = ["", "fs", "fs+", "fdx", "fdx+"] as const

export type NoteList = Array<{
  level: Scalars["dx_intl_level"]
}>

export type VariantMap = Map<
  Boolean,
  {
    version: number
    active: boolean
    notes: NoteList
  }
>

export type ConstructedSong = Array<Map<string, VariantMap>>

export type FlattenedNote = { song_id: string } & Pick<
  Dx_Intl_Songs,
  "category" | "title" | "order"
> &
  Pick<Dx_Intl_Variants, "deluxe" | "version" | "active"> &
  Pick<Dx_Intl_Notes, "difficulty" | "level">

export const getNoteHash = (instance: {
  // As we cannot restrict null in histroy tables
  song_id: string
  deluxe: boolean
  difficulty: number
}): string =>
  `${instance.song_id}_${instance.deluxe ? "t" : "f"}_${
    instance.difficulty ?? "-1"
  }`

const getScoreStatKey = (score: number): ScoreStat[] => {
  if (score >= 100.5) {
    return [...SCORE_STATS]
  } else if (score >= 100) {
    return SCORE_STATS.slice(0, -1)
  } else if (score >= 99.5) {
    return SCORE_STATS.slice(0, -2)
  } else if (score >= 99.0) {
    return SCORE_STATS.slice(0, -3)
  } else if (score >= 98.0) {
    return SCORE_STATS.slice(0, -4)
  } else if (score >= 97.0) {
    return SCORE_STATS.slice(0, -5)
  } else if (score >= 80.0) {
    return SCORE_STATS.slice(0, -6)
  }
  return []
}

export const arrangeScoreStats = (
  scores: Array<{ score: number } | undefined>
): Map<ScoreStat, number> =>
  scores.reduce((prev, curr) => {
    const ranks: ScoreStat[] = curr != null ? getScoreStatKey(curr.score) : []
    ranks.forEach((rank) => {
      prev.set(rank, (prev.get(rank) ?? 0) + 1)
    })
    return prev
  }, new Map(SCORE_STATS.map((rank) => [rank, 0])))

export const SCORE_STATS = [
  "CLR",
  "S",
  "S+",
  "SS",
  "SS+",
  "SSS",
  "SSS+",
] as const
type ScoreStat = typeof SCORE_STATS[number]

export const arrangeComboStats = (
  scores: Array<Pick<Dx_Intl_Scores, "combo_flag"> | undefined>
): Map<ComboStat, number> =>
  scores.reduce((prev, row) => {
    const comboFlag = row?.combo_flag ?? ""
    if (comboFlag !== "") {
      const combos = COMBO_STATS.slice(0, COMBO_STATS.indexOf(comboFlag) + 1)
      combos.forEach((combo) => {
        prev.set(combo, (prev.get(combo) ?? 0) + 1)
      })
    }
    return prev
  }, new Map(COMBO_STATS.map((combo) => [combo, 0])))

export const COMBO_STATS = ["fc", "fc+", "ap", "ap+"] as const
type ComboStat = typeof COMBO_STATS[number]

export const arrangeSyncStats = (
  scores: Array<Pick<Dx_Intl_Scores, "sync_flag"> | undefined>
): Map<SyncStat, number> =>
  scores.reduce((prev, row) => {
    const syncFlag = row?.sync_flag ?? ""
    if (syncFlag !== "") {
      const syncs = SYNC_STATS.slice(0, SYNC_STATS.indexOf(syncFlag) + 1)
      syncs.forEach((sync) => {
        prev.set(sync, (prev.get(sync) ?? 0) + 1)
      })
    }
    return prev
  }, new Map(SYNC_STATS.map((sync) => [sync, 0])))

export const SYNC_STATS = ["fs", "fs+", "fdx", "fdx+"] as const
type SyncStat = typeof SYNC_STATS[number]
