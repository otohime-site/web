import {
  Scalars,
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
