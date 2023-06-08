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
  "UNiVERSE PLUS",
  "FESTiVAL",
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

export const levelCompareKey: Record<(typeof levels)[number], number> = {
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

// Make typescript-plugin-css-modules happy
export const difficultyClasses = [
  "diff0",
  "diff1",
  "diff2",
  "diff3",
  "diff4",
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
export const RANK_SCORES: Array<[number, (typeof RANKS)[number], number]> = [
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

// eslint-disable-next-line no-sparse-arrays
export const gradeNames = [
  ,
  // start from 1
  "初心者",
  "見習い",
  "駆け出し",
  "修行中",
  "初段",
  "二段",
  "三段",
  "四段",
  "五段",
  "六段",
  "七段",
  "八段",
  "九段",
  "十段",
  "皆伝",
  "壱皆伝",
  "弐皆伝",
  "参皆伝",
  "肆皆伝",
  "伍皆伝",
  "陸皆伝",
  "漆皆伝",
  "捌皆伝",
  "玖皆伝",
  "拾皆伝",
] as const

export const legacyCourseRankNames = [
  "初心者",
  "初段",
  "二段",
  "三段",
  "四段",
  "五段",
  "六段",
  "七段",
  "八段",
  "九段",
  "十段",
  "", // intentionally left blank
  "真初段",
  "真二段",
  "真三段",
  "真四段",
  "真五段",
  "真六段",
  "真七段",
  "真八段",
  "真九段",
  "真十段",
  "真皆伝",
  "裏皆伝",
] as const

export const classRankNames = [
  "B5",
  "B4",
  "B3",
  "B2",
  "B1",
  "A5",
  "A4",
  "A3",
  "A2",
  "A1",
  "S5",
  "S4",
  "S3",
  "S2",
  "S1",
  "SS5",
  "SS4",
  "SS3",
  "SS2",
  "SS1",
  "SSS5",
  "SSS4",
  "SSS3",
  "SSS2",
  "SSS1",
  "LEGEND",
]

export const versionTitles = [
  "", // As the maimai and maimai PLUS will collect together
  "真",
  "超",
  "檄",
  "橙",
  "暁",
  "桃",
  "櫻",
  "紫",
  "菫",
  "白",
  "雪",
  "輝",
  "熊",
  "華",
  "爽",
  "煌",
  "宙",
  "星",
  // "祭",
]

export const versionTitleExcludes = [
  "c6257734b2ef0d743c5a8f46582afaee46bc80d8ed2ec662105a500f313e322d", // 前前前世
  "47e7d0eb19afd8ccec7d013f1a6aed13d428d34983fc7c717145e347a57c258c", // ジングルベル
]
