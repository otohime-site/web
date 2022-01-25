import { saveAs } from "file-saver"
import {
  Scalars,
  Dx_Intl_Scores,
  Dx_Intl_Songs,
  Dx_Intl_Variants,
  Dx_Intl_Notes,
  DxIntlSongsQuery,
  DxIntlRecordWithScoresQuery,
} from "../generated/graphql"

export type GROUP_BY = "category" | "version" | "level" | "rating_ranks"
export type ORDER_BY =
  | "default"
  | "level"
  | "internalLv"
  | "score"
  | "combo"
  | "sync"
  | "rating"

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
  "PiNK PLUS",
  "MURASAKi",
  "MURASAKi PLUS",
  "MiLK",
  "MiLK PLUS",
  "FiNALE",
  "DX",
  "DX PLUS",
  "Splash",
  "Splash PLUS",
  "UNiVERSE",
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

export const levelCompareKey: Record<typeof levels[number], number> = {
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

export const RATING_NEW_COUNT = 15
export const RATING_OLD_COUNT = 35

export const difficulties = [
  "Basic",
  "Advanced",
  "Expert",
  "Master",
  "Re:Master",
] as const

export const RANKS = [
  "A",
  "AA",
  "AAA",
  "S",
  "S+",
  "SS",
  "SS+",
  "SSS",
  "SSS+",
] as const
export const RANK_SCORES: Array<[number, typeof RANKS[number], number]> = [
  [80, "A", 0.136],
  [90, "AA", 0.152],
  [94, "AAA", 0.168],
  [97, "S", 0.2],
  [98, "S+", 0.203],
  [99, "SS", 0.208],
  [99.5, "SS+", 0.211],
  [100, "SSS", 0.216],
  [100.5, "SSS+", 0.224],
]

export const comboFlags = ["", "fc", "fc+", "ap", "ap+"] as const
export const syncFlags = ["", "fs", "fs+", "fdx", "fdx+"] as const

export type NoteList = Array<{
  level: Scalars["dx_intl_level"]
}>

type VariantEntryNote = Pick<
  Dx_Intl_Notes,
  "difficulty" | "level" | "internal_lv"
> & {
  hash: string
}

// Use to flatten the song list
export type VariantEntry = { song_id: string } & Pick<
  Dx_Intl_Songs,
  "category" | "title" | "order"
> &
  Pick<Dx_Intl_Variants, "deluxe" | "version" | "active"> & {
    notes: VariantEntryNote[]
  }

export type ScoreEntry =
  DxIntlRecordWithScoresQuery["dx_intl_players"][0]["dx_intl_scores"][0]

export interface InternalLvMapEntry {
  new: boolean
  internalLv: number
}

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

const getScoreStatKey = (score: number): ScoreStat[] => {
  const index = getRankScoreIndex(score)
  return index === -1
    ? []
    : RANK_SCORES.slice(0, index + 1)
        .map((s) => s[1])
        .filter((st): st is ScoreStat => st !== "AA" && st !== "AAA")
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

export const SCORE_STATS = ["A", "S", "S+", "SS", "SS+", "SSS", "SSS+"] as const
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

export const getRating = (score: number, internalLv: number): number => {
  const rankScore = RANK_SCORES[getRankScoreIndex(score)]
  return rankScore != null
    ? Math.floor(rankScore[2] * Math.min(100.5, score) * internalLv)
    : 0
}

export const prepareSongs = (
  songs: DxIntlSongsQuery["dx_intl_songs"]
): {
  variantEntries: VariantEntry[]
  internalLvMap: Map<string, InternalLvMapEntry>
} => {
  let maxVersion = 0
  const internalLvList: Array<{
    hash: string
    version: number
    internalLv: number
  }> = []
  const variantEntriesRaw = songs.reduce<VariantEntry[]>(
    (accr, song) => [
      // We aggregate the result entry and caculate rating first.
      ...accr,
      ...song.dx_intl_variants.map((variant) => {
        // Calculate max version by backend data
        // to prevent version update errors.
        maxVersion = Math.max(variant.version, maxVersion)
        return {
          song_id: song.id,
          category: song.category,
          title: song.title,
          order: song.order,
          deluxe: variant.deluxe,
          active: variant.active,
          version: variant.version,
          notes: variant.dx_intl_notes.map((note) => {
            const hash = getNoteHash({
              song_id: song.id,
              deluxe: variant.deluxe,
              difficulty: note.difficulty,
            })
            if (variant.active && note.internal_lv != null) {
              internalLvList.push({
                hash,
                version: variant.version,
                internalLv: note.internal_lv,
              })
            }
            return {
              hash,
              difficulty: note.difficulty,
              level: note.level,
              internal_lv: note.internal_lv,
            }
          }),
        }
      }),
    ],
    []
  )
  // Sort by active or not
  const variantEntries = [
    ...variantEntriesRaw.filter((e) => !e.active),
    ...variantEntriesRaw.filter((e) => e.active),
  ]
  const internalLvMap = new Map(
    internalLvList.map((ilEntry) => [
      ilEntry.hash,
      { new: ilEntry.version === maxVersion, internalLv: ilEntry.internalLv },
    ])
  )
  return { variantEntries, internalLvMap }
}

export const getRatingAndRanks = (params: {
  scoreMap: Map<string, ScoreEntry>
  internalLvMap: Map<string, InternalLvMapEntry>
}): {
  ratingMap: Map<string, number>
  newRanks: Map<string, number>
  oldRanks: Map<string, number>
} => {
  const { scoreMap, internalLvMap } = params
  if (scoreMap.size === 0 || internalLvMap.size === 0) {
    return {
      ratingMap: new Map(),
      newRanks: new Map(),
      oldRanks: new Map(),
    }
  }
  const ratingMap: Map<string, number> = new Map()
  const newRatings: Array<[string, number]> = []
  const oldRatings: Array<[string, number]> = []
  internalLvMap.forEach((entry, hash) => {
    const score = scoreMap.get(hash)
    if (score != null && score.score >= 80) {
      const rating = getRating(score.score, entry.internalLv)
      ratingMap.set(hash, rating)
      if (entry.new) {
        newRatings.push([hash, rating])
      } else {
        oldRatings.push([hash, rating])
      }
    }
  })

  return {
    ratingMap,
    newRanks: new Map(
      newRatings
        .sort((a, b) => b[1] - a[1])
        .slice(0, RATING_NEW_COUNT * 2)
        .map((rt, index) => [rt[0], index + 1])
    ),
    oldRanks: new Map(
      oldRatings
        .sort((a, b) => b[1] - a[1])
        .slice(0, RATING_OLD_COUNT * 2)
        .map((rt, index) => [rt[0], index + 1])
    ),
  }
}

export const getRowGroups = (params: {
  variantEntries: VariantEntry[]
  newRanks: Map<string, number>
  oldRanks: Map<string, number>
  groupBy: GROUP_BY
  includeInactive: boolean
}): VariantEntry[][] => {
  const { variantEntries, newRanks, oldRanks, groupBy, includeInactive } =
    params
  return variantEntries.reduce<VariantEntry[][]>((accr, entry) => {
    if (!includeInactive && !entry.active) {
      return accr
    }
    if (groupBy === "category" || groupBy === "version") {
      const index = entry[groupBy]
      accr[index] = [...(accr[index] ?? []), entry]
    } else if (groupBy === "level") {
      const { notes, ...restEntry } = entry
      entry.notes.forEach((note) => {
        const levelIndex = levels.indexOf(note.level)
        accr[levelIndex] = [
          ...(accr[levelIndex] ?? []),
          {
            ...restEntry,
            notes: [note],
          },
        ]
      })
    } else if (groupBy === "rating_ranks") {
      const { notes, ...restEntry } = entry
      entry.notes.forEach((note) => {
        const hash = getNoteHash({
          song_id: restEntry.song_id,
          deluxe: restEntry.deluxe,
          difficulty: note.difficulty,
        })
        if (newRanks.has(hash)) {
          accr[0] = [
            ...(accr[0] ?? []),
            {
              ...restEntry,
              notes: [note],
            },
          ]
        } else if (oldRanks.has(hash)) {
          accr[1] = [
            ...(accr[1] ?? []),
            {
              ...restEntry,
              notes: [note],
            },
          ]
        }
      })
    }
    return accr
  }, [])
}
export const arrangeSortedRows = (params: {
  rows: VariantEntry[]
  index: number
  orderBy: ORDER_BY
  orderByDesc: boolean
  scoreMap: Map<string, ScoreEntry>
  ratingMap: Map<string, number>
}): {
  sortedRows: VariantEntry[]
  scoreStats: ReturnType<typeof arrangeScoreStats>
  comboStats: ReturnType<typeof arrangeComboStats>
  syncStats: ReturnType<typeof arrangeSyncStats>
} => {
  const { rows, index, orderBy, orderByDesc, scoreMap, ratingMap } = params
  const sortedRows =
    orderBy === "default"
      ? rows
      : rows
          .map((row) => {
            const note = row.notes[index]
            if (note == null) {
              return { ...row, sortRank: -1 }
            }
            let sortRank
            switch (orderBy) {
              case "level":
                sortRank = levels.indexOf(note.level)
                break
              case "internalLv":
                sortRank = note.internal_lv ?? levelCompareKey[note.level]
                break
              case "score":
                sortRank = scoreMap.get(note.hash)?.score ?? 0
                break
              case "rating":
                sortRank = ratingMap.get(note.hash) ?? 0
                break
              case "combo":
                sortRank = comboFlags.indexOf(
                  scoreMap.get(note.hash)?.combo_flag ?? ""
                )
                break
              case "sync":
                sortRank = syncFlags.indexOf(
                  scoreMap.get(note.hash)?.sync_flag ?? ""
                )
                break
              default:
                sortRank = 0
            }
            return { ...row, sortRank }
          })
          .sort((a, b) =>
            orderByDesc ? b.sortRank - a.sortRank : a.sortRank - b.sortRank
          )
          .map((row) => {
            const { sortRank, ...others } = row
            return others
          })
  if (orderBy === "default" && orderByDesc) {
    sortedRows.reverse()
  }
  const columnScores = rows
    .map((row) =>
      row.notes[index] != null ? scoreMap.get(row.notes[index].hash) : null
    )
    .filter((row): row is ScoreEntry => row != null)
  return {
    sortedRows,
    scoreStats: arrangeScoreStats(columnScores),
    comboStats: arrangeComboStats(columnScores),
    syncStats: arrangeSyncStats(columnScores),
  }
}

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
    filename
  )
}
