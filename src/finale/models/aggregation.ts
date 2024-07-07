import { ResultOf } from "../../graphql"
import { finaleSongsDocument } from "./queries"

export const getNoteHash = (instance: {
  // As we cannot restrict null in history tables
  song_id: number
  difficulty: number
}): string => `${instance.song_id}_${instance.difficulty ?? "-1"}`

export const flatSongsResult = (data?: ResultOf<typeof finaleSongsDocument>) =>
  (data?.finale_songs ?? []).flatMap((song) =>
    song.finale_notes.map((note) => ({
      hash: getNoteHash({
        song_id: song.id,
        difficulty: note.difficulty,
      }),
      song_id: song.id,
      category: song.category,
      title: song.title,
      order: song.order,
      version: song.version,
      active: song.active,
      difficulty: note.difficulty,
      level: note.level,
    })),
  )

export type ScoreTableEntry = ReturnType<typeof flatSongsResult>[number] & {
  index: number
  score?: number
  combo_flag: number
  sync_flag: number
  updated_at?: string
}
