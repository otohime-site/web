import { DxIntlSongsQuery, Scalars } from '../generated/graphql'

export type NoteList = Array<{
  id: number
  level: Scalars['dx_intl_level']
}>

export type VariantMap = Map<Boolean, {
  version: number
  active: boolean
  notes: NoteList
}>

export type ConstructedSong = Array<Map<string, VariantMap>>

export const constructSongs = (songs: DxIntlSongsQuery['dx_intl_songs']): ConstructedSong => (
  songs.reduce<ConstructedSong>((accr, curr) => {
    const categoryMap = accr[curr.category] ?? new Map()
    const variantMap = new Map(curr.dx_intl_variants.map(variant => (
      [variant.deluxe, {
        version: variant.version,
        active: variant.active,
        notes: variant.dx_intl_notes.reduce<NoteList>((accr, note) => {
          accr[note.difficulty] = {
            id: note.id,
            level: note.level
          }
          return accr
        }, [])
      }]
    )))
    categoryMap.set(curr.title, variantMap)
    accr[curr.category] = categoryMap
    return accr
  }, [])
)
