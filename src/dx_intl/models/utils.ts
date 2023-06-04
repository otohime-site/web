import { ResultOf } from "@graphql-typed-document-node/core"
import { getNoteHash } from "../helper"
import { dxIntlSongsDocument } from "./queries"

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
