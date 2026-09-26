import { describe, expect, it } from "vitest"
import {
  ScoreTableEntry,
  getRankConstIndex,
  getRating,
  getVersionRewardProgress,
} from "./aggregation"
import { RANK_CONST_BORDERS, versionTitleExcludes } from "./constants"

describe("getRankConstIndex", () => {
  it("returns -1 below the lowest border", () => {
    expect(getRankConstIndex(0)).toBe(-1)
    expect(getRankConstIndex(50)).toBe(-1)
    expect(getRankConstIndex(79.9999)).toBe(-1)
  })

  it("picks the border matching the score", () => {
    expect(getRankConstIndex(80)).toBe(0)
    expect(getRankConstIndex(94)).toBe(4)
    expect(getRankConstIndex(97)).toBe(6)
    expect(getRankConstIndex(100)).toBe(12)
    expect(getRankConstIndex(100.5)).toBe(14)
  })

  it("keeps the last border for scores above 100.5%", () => {
    expect(getRankConstIndex(101)).toBe(RANK_CONST_BORDERS.length - 1)
  })
})

describe("getRating", () => {
  it("calculates rating for a 13+ chart", () => {
    // 137 * 216 * 1001000 / 100000000 = 296.23...
    expect(getRating(13.7, 100.1)).toBe(296)
    // 137 * 203 * 982000 / 100000000 = 273.06...
    expect(getRating(13.7, 98.2)).toBe(273)
  })

  it("matches the documented 100.5% / lv 14.0 example", () => {
    // floor(140 * 224 * 1005000 / 100000000) = 315
    expect(getRating(14.0, 100.5)).toBe(315)
  })

  it("handles the .9999 and .4999 score boundaries", () => {
    // .9999 stays on the lower rank const, the next 0.0001% jumps up
    expect(getRating(13.7, 93.9999)).toBe(206)
    expect(getRating(13.7, 94)).toBe(216)
    expect(getRating(13.7, 96.9999)).toBe(233)
    expect(getRating(13.7, 97)).toBe(265)
    expect(getRating(13.7, 98.9999)).toBe(279)
    expect(getRating(13.7, 99)).toBe(282)
    expect(getRating(13.7, 99.9999)).toBe(293)
    expect(getRating(13.7, 100)).toBe(295)
    // .4999 boundaries
    expect(getRating(13.7, 99.4999)).toBe(283)
    expect(getRating(13.7, 99.5)).toBe(287)
    expect(getRating(13.7, 100.4999)).toBe(305)
    expect(getRating(13.7, 100.5)).toBe(308)
  })

  it("never drops below the boundary rating (monotonic across borders)", () => {
    for (const [border] of RANK_CONST_BORDERS) {
      const score = border / 10000
      expect(getRating(13.7, score)).toBeGreaterThanOrEqual(
        getRating(13.7, score - 0.0001),
      )
    }
  })

  // 101% is the maximum score the game itself allows.
  it("caps the score at 100.5%", () => {
    expect(getRating(13.7, 101)).toBe(getRating(13.7, 100.5))
    expect(getRating(14.0, 101)).toBe(getRating(14.0, 100.5))
  })

  it("returns 0 below 80%", () => {
    expect(getRating(13.7, 79.9999)).toBe(0)
    expect(getRating(13.7, 0)).toBe(0)
  })

  it("adds 1 for AP", () => {
    expect(getRating(13.7, 100.1, true)).toBe(297)
    expect(getRating(14.0, 100.5, true)).toBe(316)
    // No AP bonus when the score is too low to rate at all
    expect(getRating(13.7, 79.9999, true)).toBe(0)
  })
})

describe("getVersionRewardProgress", () => {
  const entry = (overrides: Partial<ScoreTableEntry>): ScoreTableEntry =>
    ({
      song_id: "song",
      version: 7,
      active: true,
      difficulty: 3,
      combo_flag: 0,
      sync_flag: 0,
      ...overrides,
    }) as ScoreTableEntry

  it("counts Basic to Master charts per difficulty", () => {
    const progress = getVersionRewardProgress(
      [
        entry({ difficulty: 0, score: 100.5, combo_flag: 3, sync_flag: 4 }),
        entry({ difficulty: 3, score: 99, combo_flag: 1 }),
        entry({ difficulty: 3 }),
        // Re:Master, inactive, other-version and excluded charts are ignored
        entry({ difficulty: 4, score: 100.5 }),
        entry({ active: false, score: 100.5 }),
        entry({ version: 8, score: 100.5 }),
        entry({ song_id: versionTitleExcludes[0], score: 100.5 }),
      ],
      7,
    )
    expect(progress.map(({ key, title }) => [key, title])).toEqual([
      ["sss", "櫻将"],
      ["fc", "櫻極"],
      ["ap", "櫻神"],
      ["fdx", "櫻舞舞"],
    ])
    const [sss, fc, ap, fdx] = progress
    expect(sss).toMatchObject({ achieved: 1, total: 3 })
    expect(sss.difficulties).toEqual([
      { achieved: 1, total: 1 },
      { achieved: 0, total: 0 },
      { achieved: 0, total: 0 },
      { achieved: 0, total: 2 },
    ])
    expect(fc).toMatchObject({ achieved: 2, total: 3 })
    expect(ap).toMatchObject({ achieved: 1, total: 3 })
    expect(fdx).toMatchObject({ achieved: 1, total: 3 })
  })

  it("merges maimai into maimai PLUS without the SSS reward", () => {
    const entries = [entry({ version: 0 }), entry({ version: 1 })]
    for (const version of [0, 1]) {
      const progress = getVersionRewardProgress(entries, version)
      expect(progress.map(({ title }) => title)).toEqual([
        "真極",
        "真神",
        "真舞舞",
      ])
      expect(progress[0].total).toBe(2)
    }
  })

  it("returns nothing for a version without charts", () => {
    expect(getVersionRewardProgress([], 7)).toEqual([])
  })
})
