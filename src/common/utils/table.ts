import { useMemo } from "react"
import { groupByKey } from "./grouping"
interface TableEntry {
  active: boolean
  difficulty: number
}
// A simple Table hook inspired by Tanstack table.
// Grouping, sorting can be applied here.
// Some share settings between score tables will be added here.
export const useTable = <T extends TableEntry>({
  data,
  grouping,
  ordering,
  difficulty,
  includeInactive,
  sortingFns,
  filterFn,
}: {
  data: T[]
  grouping: keyof T
  ordering: Array<{ key: keyof T; desc: boolean }>
  difficulty: number
  includeInactive: boolean
  sortingFns?: { [k in keyof T]?: (a: T, b: T) => number }
  filterFn: (
    entry: T,
    options: { grouping: keyof T; difficulty: number },
  ) => boolean
}) => {
  const groupedData = useMemo(() => {
    const sortedData = [
      ...(includeInactive ? data : data.filter((e) => e.active)),
    ]
    const orderingWithGroup = [
      ...(grouping === "level"
        ? [{ key: "difficulty" as keyof T, desc: false }]
        : []),
      ...(!ordering.find((o) => o.key == grouping)
        ? [{ key: grouping, desc: grouping === "current_version" }]
        : []),
      ...ordering,
    ]
    const fn = (a: T, b: T) => {
      for (let i = 0; i < orderingWithGroup.length; i++) {
        const { key, desc } = orderingWithGroup[i]
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
    const ungroupedData = sortedData.filter((entry) =>
      filterFn(entry, { grouping, difficulty }),
    )
    return groupByKey(ungroupedData, grouping)
  }, [
    data,
    grouping,
    ordering,
    difficulty,
    includeInactive,
    sortingFns,
    filterFn,
  ])
  return { groupedData }
}
