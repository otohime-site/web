import { GroupingState, SortingState } from "@tanstack/react-table"
import { useReducer } from "react"

export interface TableState {
  grouping: GroupingState
  sorting: SortingState
}

export type TableGroupConfigs = Record<
  string,
  { grouping: GroupingState; sorting: SortingState; lockSorting?: boolean }
>

export interface TableStateInput {
  tableKey: string
  tableGroupConfigs: TableGroupConfigs
}

export type TableStateDispatch =
  | {
      type: "setTopGrouping"
      payload: string
    }
  | { type: "setOtherGrouping"; payload: string }
  | { type: "setOrderBy"; payload: SortingState }

// A general table state solution which will record
// the grouping and sorting options per top grouping field.
export const useTableState = ({
  tableKey,
  tableGroupConfigs,
}: TableStateInput) => {
  console.log(tableKey)
  const grouping = [Object.keys(tableGroupConfigs)[0]]
  const { sorting } = tableGroupConfigs[grouping[0]]

  return useReducer(
    (state: TableState, { type, payload }: TableStateDispatch): TableState => {
      switch (type) {
        case "setTopGrouping":
          return {
            ...state,
            ...(payload in tableGroupConfigs
              ? {
                  grouping: [payload, ...tableGroupConfigs[payload].grouping],
                  sorting: tableGroupConfigs[payload].sorting,
                }
              : {}),
          }
        case "setOtherGrouping":
          return { ...state }
        case "setOrderBy":
          return { ...state }
      }
    },
    {
      grouping,
      sorting,
    },
  )
}
