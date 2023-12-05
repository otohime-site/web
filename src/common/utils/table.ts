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
      ...ordering,
      ...(!ordering.find((o) => o.key == grouping)
        ? [{ key: grouping, desc: false }]
        : []),
    ]
    orderingWithGroup.map(({ key, desc }) => {
      const fn = (a: T, b: T) => {
        const custom = sortingFns?.[key]
        const compare = custom
          ? custom(a, b)
          : (a[key] ?? 0) > (b[key] ?? 0)
            ? 1
            : -1
        return desc ? compare * -1 : compare
      }
      sortedData.sort(fn)
    })
    const ungroupedData = sortedData.filter((entry) =>
      filterFn(entry, { grouping, difficulty }),
    )
    return groupByKey(ungroupedData, grouping)
  }, [data, grouping, ordering, difficulty, sortingFns, filterFn])
  return { groupedData }
}
