import { describe, expect, test } from "vitest"
import { getClosestRatingTarget } from "./constants"

describe("getClosestRatingTarget", () => {
  test.each([
    [14874, 14750],
    [14875, 15000],
    [15000, 15000],
    [15124, 15000],
    [15125, 15250],
  ])("maps rating %i to group %i", (rating, target) => {
    expect(getClosestRatingTarget(rating)).toBe(target)
  })

  test.each([
    [13000, 14000],
    [16710, 16500],
  ])("clamps out-of-range rating %i to group %i", (rating, target) => {
    expect(getClosestRatingTarget(rating)).toBe(target)
  })
})
