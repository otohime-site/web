import { ResultOf } from "@graphql-typed-document-node/core"
import { saveAs } from "file-saver"
import {
  categories,
  comboFlags,
  difficulties,
  levels,
  RANK_SCORES,
  syncFlags,
  versions,
} from "./models/constants"
import { dxIntlScoresFields } from "./models/fragments"

export type GROUP_BY = "category" | "version" | "level" | "rating_ranks"
export type ORDER_BY =
  | "default"
  | "level"
  | "internalLv"
  | "score"
  | "combo"
  | "sync"
  | "rating"

export type NoteList = Array<{
  level: (typeof levels)[number]
}>

interface VariantEntryNote {
  difficulty: number
  level: (typeof levels)[number]
  internal_lv?: number | null
  hash: string
}

export interface VariantEntry {
  song_id: string
  category: number
  title: string
  order: number
  deluxe: boolean
  version: number
  active: boolean
  notes: VariantEntryNote[]
}

export interface InternalLvMapEntry {
  new: boolean
  internalLv: number
}

type ScoreEntry = ResultOf<typeof dxIntlScoresFields>

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

export const downloadCSV = async (params: {
  filename?: string
  variantEntries: VariantEntry[]
  scoreMap: Map<string, ScoreEntry>
  ratingMap: Map<string, number>
}): Promise<void> => {
  type CSVEntry = Omit<
    VariantEntry,
    "deluxe" | "active" | "song_id" | "notes"
  > &
    Omit<VariantEntryNote, "hash" | "internal_lv"> & {
      deluxe: string
      active: string
      category_repr: string
      version_repr: string
      difficulty_repr: string
      internal_lv: string
      score: string
      combo_flag: string
      sync_flag: string
      rating: string
    }
  const papa = await import("papaparse")
  const { filename, variantEntries, scoreMap, ratingMap } = params
  const data = variantEntries.reduce<CSVEntry[]>((prev, entry) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    const { notes, song_id, ...restEntry } = entry
    return [
      ...prev,
      ...notes.map((note) => {
        const { hash, ...restNote } = note
        const score = scoreMap.get(hash)
        const rating = ratingMap.get(hash)
        return {
          category: restEntry.category,
          category_repr: categories[restEntry.category] ?? "",
          order: restEntry.order,
          title: restEntry.title,
          deluxe: restEntry.deluxe ? "DX" : "STD",
          active: restEntry.active ? "Y" : "N",
          version: restEntry.version,
          version_repr: versions[restEntry.version] ?? "",
          difficulty: restNote.difficulty,
          difficulty_repr: difficulties[restNote.difficulty] ?? "",
          level: restNote.level,
          internal_lv:
            restNote.internal_lv != null ? restNote.internal_lv.toFixed(1) : "",
          score: score?.score != null ? score.score.toFixed(4) : "",
          combo_flag: score?.combo_flag ?? "",
          sync_flag: score?.sync_flag ?? "",
          rating: rating != null ? rating.toString() : "",
        }
      }),
    ]
  }, [])
  const csvText = papa.unparse(data)
  // Append BOM to ensure Excel can read it
  saveAs(
    new Blob([String.fromCharCode(0xfeff), csvText], {
      type: "text/csv; charset=utf-8",
    }),
    filename,
  )
}
