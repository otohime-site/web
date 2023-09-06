import { GroupingState, SortingState } from "@tanstack/react-table"
import { useReducer } from "react"

export interface TableState {
  grouping: GroupingState
  sorting: SortingState
}

export type TableGroupConfigs = {
  groupable: string[]
  sortable: string[]
  // Lock Tanstack table configuration,
  // Don't allow to change secondary and ordering.
  locked: {
    [primaryGroup: string]: {
      sorting: SortingState
    }
  }
  defaultSorting: SortingState
  // Groups that sorting descending by default
  groupingDesc: string[]
}

export interface TableStateInput {
  tableKey: string
  tableGroupConfigs: TableGroupConfigs
}

export type TableStateDispatch =
  | {
      type: "setGroup"
      payload: string
    }
  | { type: "setOrderBy"; payload: string }
  | { type: "setOrderByDesc"; payload: boolean }

// A general table state solution which will record
// the grouping and sorting options per top grouping field.
export const useTableState = ({ tableGroupConfigs }: TableStateInput) => {
  const { groupable, sortable, locked, defaultSorting, groupingDesc } =
    tableGroupConfigs
  const grouping = groupable[0]

  const reducer = (
    state: TableState,
    { type, payload }: TableStateDispatch,
  ): TableState => {
    switch (type) {
      case "setGroup": {
        // per eslint no-case-declarations
        if (!groupable.includes(payload)) {
          return { ...state }
        }
        const extraSorting =
          payload in locked
            ? locked[payload].sorting
            : state.grouping[0] in locked || state.sorting[1]?.id === "payload"
            ? [...defaultSorting]
            : [{ ...state.sorting[1] }]
        return {
          ...state,
          grouping: [payload],
          sorting: [
            { id: payload, desc: groupingDesc.includes(payload) },
            ...extraSorting,
          ],
        }
      }
      case "setOrderBy":
        if (
          state.grouping[0] in locked ||
          state.grouping.indexOf(payload) > -1 ||
          !sortable.includes(payload)
        ) {
          return { ...state }
        }
        return {
          ...state,
          sorting: [
            state.sorting[0],
            {
              id: payload,
              desc: state.sorting[1].desc ?? false,
            },
          ],
        }
      case "setOrderByDesc":
        if (state.grouping[0] in locked) {
          return { ...state }
        }
        return {
          ...state,
          sorting: [
            state.sorting[0],
            {
              id: state.sorting[1].id,
              desc: payload,
            },
          ],
        }
    }
  }

  const initState = reducer(
    {
      grouping: [],
      sorting: [],
    },
    { type: "setGroup", payload: grouping },
  )
  return useReducer(reducer, initState)
}
