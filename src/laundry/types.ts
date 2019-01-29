export class LaundryError extends Error {
  content: any
  code?: number
}

export interface Player {
  id: string
  nickname: string
  privacy: 'public' | 'anonymous' | 'private'
}

export interface PlayerWithRecord extends Player {
  record: Record
  scores: Score[]
}

export interface Song {
  id: number
  seq: number
  category: string
  name: string
  english_name: string
  active: boolean
  japan_only: boolean
  version: number
  levels: string[]
}

export interface Record {
  card_name: string,
  class: string,
  title: string,
  rating: number,
  max_rating: number
}

export interface Score {
  song_id: number
  difficulty: number
  score: number
  raw_score: number
  flag: string
}

export interface TimelineRecord extends Record {
  from: 'before' | 'after'
}
export interface TimelineScore extends Score {
  from: 'before' | 'after'
}

export interface TimelineDetail {
  records: TimelineRecord[]
  scores: TimelineScore[]
}

export type Sort = 'category' | 'version' | 'level'
