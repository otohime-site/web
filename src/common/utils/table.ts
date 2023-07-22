import { GroupingState, SortingState } from "@tanstack/react-table"
import { useReducer } from "react"

export interface TableState {
  // Attributes used by the UI and storages
  primaryGroup: string
  secondaryGroup: string
  orderBy: string
  orderByDesc: boolean

  // Attributes sent to Tanstack Table
  grouping: GroupingState
  sorting: SortingState
}

export type TableGroupConfigs = {
  // Primary group -> Default secondary group options
  // The first key will be considered as the default one.
  groups: Record<string, string | null>
  // Lock Tanstack table configuration,
  // Don't allow to change secondary and ordering.
  locked: {
    [primaryGroup: string]: {
      grouping: GroupingState
      sorting: SortingState
    }
  }
  sortable: string[]
  groupable: string[]
  // The initial ordering.
  orderBy: string
  orderByDesc: false
}

export interface TableStateInput {
  tableKey: string
  tableGroupConfigs: TableGroupConfigs
}

export type TableStateDispatch =
  | {
      type: "setPrimaryGroup"
      payload: string
    }
  | { type: "setSecondaryGroup"; payload: string }
  | { type: "setOrderBy"; payload: string }
  | { type: "setOrderByDesc"; payload: boolean }

const getTanstackState = (
  {
    primaryGroup,
    secondaryGroup,
    orderBy,
    orderByDesc,
  }: {
    primaryGroup: string
    secondaryGroup: string
    orderBy: string
    orderByDesc: boolean
  },
  locked: TableGroupConfigs["locked"],
): Pick<TableState, "grouping" | "sorting"> => {
  if (primaryGroup in locked) {
    return {
      ...locked[primaryGroup],
      grouping: [primaryGroup, ...locked[primaryGroup].grouping],
    }
  }
  return {
    grouping:
      secondaryGroup === "" ? [primaryGroup] : [primaryGroup, secondaryGroup],
    sorting: [
      {
        id: primaryGroup,
        desc: false,
      },
      ...(secondaryGroup === "" ? [] : [{ id: secondaryGroup, desc: false }]),
      { id: orderBy, desc: orderByDesc },
    ],
  }
}

// A general table state solution which will record
// the grouping and sorting options per top grouping field.
export const useTableState = ({ tableGroupConfigs }: TableStateInput) => {
  const { groups, locked, groupable, sortable, orderBy, orderByDesc } =
    tableGroupConfigs
  const grouping = Object.keys(groups)[0]

  const reducer = (
    state: TableState,
    { type, payload }: TableStateDispatch,
  ): TableState => {
    const newState = { ...state }
    switch (type) {
      case "setPrimaryGroup":
        if (Object.keys(groups).includes(payload)) {
          newState.primaryGroup = payload
          newState.secondaryGroup = groups[payload] ?? ""
        }
        return { ...newState, ...getTanstackState(newState, locked) }
      case "setSecondaryGroup":
        if (
          !(newState.primaryGroup in locked) &&
          payload !== state["primaryGroup"] &&
          groupable.includes(payload)
        ) {
          newState.secondaryGroup = payload
        }
        return { ...newState, ...getTanstackState(newState, locked) }
      case "setOrderBy":
        if (
          !(newState.primaryGroup in locked) &&
          payload !== state["primaryGroup"] &&
          payload !== state["secondaryGroup"] &&
          sortable.includes(payload)
        ) {
          newState.orderBy = payload
        }
        return {
          ...newState,
          sorting: getTanstackState(newState, locked).sorting,
        }
      case "setOrderByDesc":
        if (!(newState.primaryGroup in locked)) {
          newState.orderByDesc = payload
        }
        return {
          ...newState,
          sorting: getTanstackState(newState, locked).sorting,
        }
    }
  }

  const initState = reducer(
    {
      primaryGroup: "",
      secondaryGroup: "",
      orderBy,
      orderByDesc,
      grouping: [],
      sorting: [],
    },
    { type: "setPrimaryGroup", payload: grouping },
  )
  return useReducer(reducer, initState)
}
