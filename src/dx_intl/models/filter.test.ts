import { describe, expect, it } from "vitest"
import { ScoreTableEntry } from "./aggregation"
import {
  Condition,
  SCORE_MAX,
  SCORE_MIN,
  defaultCondition,
  filterEntryConditions,
  getConditionsTitle,
  isEffectiveCondition,
  matchesSongSearch,
} from "./filter"

const entry = (score?: number): ScoreTableEntry =>
  ({
    title: "World's end loneliness",
    artist: "打打だいず",
    score,
  }) as ScoreTableEntry

describe("score advanced condition", () => {
  it("starts with the full score range", () => {
    const condition = defaultCondition("score")
    expect(condition).toEqual({ key: "score", range: [SCORE_MIN, SCORE_MAX] })
    expect(isEffectiveCondition(condition)).toBe(true)
  })

  it("treats the full range as effective", () => {
    expect(
      isEffectiveCondition({ key: "score", range: [SCORE_MIN, SCORE_MAX] }),
    ).toBe(true)
  })

  it("matches inclusive score bounds and treats unplayed charts as 0", () => {
    const conditions: Condition[] = [{ key: "score", range: [100, 100.5] }]
    expect(filterEntryConditions(entry(100), conditions)).toBe(true)
    expect(filterEntryConditions(entry(100.5), conditions)).toBe(true)
    expect(filterEntryConditions(entry(99.9999), conditions)).toBe(false)
    expect(filterEntryConditions(entry(), conditions)).toBe(false)

    const zeroConditions: Condition[] = [{ key: "score", range: [0, 0] }]
    expect(filterEntryConditions(entry(), zeroConditions)).toBe(true)
  })

  it("describes the selected percentage range", () => {
    expect(getConditionsTitle([{ key: "score", range: [100, 100.5] }])).toBe(
      "達成率 100.0%〜100.5%",
    )
  })
})

describe("song search", () => {
  it("searches title and artist case-insensitively", () => {
    expect(matchesSongSearch(entry(), "LONELINESS")).toBe(true)
    expect(matchesSongSearch(entry(), "打打だいず")).toBe(true)
    expect(matchesSongSearch(entry(), "missing")).toBe(false)
  })

  it("allows terms to match across title and artist", () => {
    expect(matchesSongSearch(entry(), "world 打打")).toBe(true)
    expect(matchesSongSearch(entry(), "  ")).toBe(true)
  })
})
