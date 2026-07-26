import { describe, expect, it } from "vitest"
import { getRankConstIndex, getRating } from "./aggregation"
import { RANK_CONST_BORDERS } from "./constants"

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
