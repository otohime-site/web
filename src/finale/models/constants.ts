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

// Make typescript-plugin-css-modules happy
export const difficultyClasses = [
  "diff0",
  "diff1",
  "diff2",
  "diff3",
  "diff4",
  "diff5",
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
