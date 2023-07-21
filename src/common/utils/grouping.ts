// Watch https://github.com/tc39/proposal-array-grouping later
export const groupByKey = <T, K extends keyof T>(
  arr: T[],
  key: K,
): Map<T[K], T[]> =>
  arr.reduce((prev, curr) => {
    const k = curr[key]
    const v = prev.get(k) ?? []
    v.push(curr)
    prev.set(k, v)
    return prev
  }, new Map<T[K], T[]>())
