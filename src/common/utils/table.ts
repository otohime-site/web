import { useMemo } from "react"
interface TableEntry {
  active: boolean
}
// A simple Table hook inspired by Tanstack table.
// Sorting and filtering can be applied here.
// Some share settings between score tables will be added here.
export const useTable = <T extends TableEntry>({
  data,
  ordering,
  includeInactive,
  sortingFns,
  filterFn,
}: {
  data: T[]
  ordering: Array<{ key: keyof T; desc: boolean }>
  includeInactive: boolean
  sortingFns?: { [k in keyof T]?: (a: T, b: T) => number }
  filterFn: (entry: T) => boolean
}) => {
  const entries = useMemo(() => {
    const sortedData = [
      ...(includeInactive ? data : data.filter((e) => e.active)),
    ]
    const fn = (a: T, b: T) => {
      for (let i = 0; i < ordering.length; i++) {
        const { key, desc } = ordering[i]
        const custom = sortingFns?.[key]
        const compare = custom
          ? custom(a, b)
          : (a[key] ?? 0) == (b[key] ?? 0)
            ? 0
            : (a[key] ?? 0) > (b[key] ?? 0)
              ? 1
              : -1
        if (compare !== 0) {
          return desc ? compare * -1 : compare
        }
      }
      return 0
    }

    sortedData.sort(fn)
    return sortedData.filter(filterFn)
  }, [data, ordering, includeInactive, sortingFns, filterFn])
  return { entries }
}
