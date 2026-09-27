export const categories = [
  "POPS ＆ アニメ",
  "niconico ＆ ボーカロイド™",
  "東方Project",
  "SEGA",
  "ゲーム ＆ バラエティ",
  "オリジナル ＆ ジョイポリス",
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
] as const

export const difficulties = [
  "Easy",
  "Basic",
  "Advanced",
  "Expert",
  "Master",
  "Re:Master",
] as const

// Index into `difficulties`, for typed CSS module lookups like `difficulty-${d}`
export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5

export const difficultyShortNames = [
  "EAS",
  "BSC",
  "ADV",
  "EXP",
  "MAS",
  "RE:M",
] as const

export const classNames: Record<string, string> = {
  "01": "初段",
  "02": "二段",
  "03": "三段",
  "04": "四段",
  "05": "五段",
  "06": "六段",
  "07": "七段",
  "08": "八段",
  "09": "九段",
  "10": "十段",
  "11": "皆伝",
}

export const classLevels = {
  "08": "silver",
  "09": "gold",
  "10": "gold-black",
  "11": "gold-red",
} as const

export const comboFlags = ["", "fc_silver", "fc_gold", "ap", "ap_plus"] as const
export const syncFlags = ["", "100"] as const
