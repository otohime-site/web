import { DxIntlSongsQuery, Scalars, Dx_Intl_Songs, Dx_Intl_Variants, Dx_Intl_Notes } from '../generated/graphql'

// eslint-disable-next-line no-sparse-arrays
export const categories = [, // start from 1
  'POPS & ANIME',
  'niconico ＆ VOCALOID™',
  '東方Project',
  'GAME＆VARIETY',
  'maimai',
  'オンゲキ＆CHUNITHM'
] as const

export const versions = [
  'maimai',
  'maimai PLUS',
  'GreeN',
  'GreeN PLUS',
  'ORANGE',
  'ORANGE PLUS',
  'PiNK',
  'PinK PLUS',
  'MURASAKi',
  'MURASAKi PLUS',
  'MiLK',
  'MiLK PLUS',
  'FiNALE',
  'DX',
  'DX Plus' //,
  // 'DX Splash',
  // 'DX Splash PLUS'
] as const

export const levels = [
  '1', '2', '3', '4', '5', '6', '7', '7+', '8', '8+',
  '9', '9+', '10', '10+', '11', '11+', '12', '12+',
  '13', '13+', '14', '14+', '15'
] as const

export const difficulties = [
  'Basic', 'Advanced', 'Expert', 'Master', 'Re:Master'
] as const

export const comboFlags = ['', 'fc', 'fc+', 'ap', 'ap+'] as const
export const syncFlags = ['', 'fs', 'fs+', 'fdx', 'fdx+'] as const

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

// Construct a map to query a note from category -> title -> variant -> difficulty map.
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

export type FlattenedNote = (
  { songId: number } &
  Pick<Dx_Intl_Songs, 'category' | 'title' | 'order'> &
  Pick<Dx_Intl_Variants, 'deluxe' | 'version' | 'active'> &
  Pick<Dx_Intl_Notes, 'id' | 'difficulty' | 'level'>
)
