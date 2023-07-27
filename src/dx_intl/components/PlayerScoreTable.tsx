import {
  Cell,
  Column,
  ColumnFilter,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo } from "react"
import ArrowDownIcon from "~icons/mdi/arrow-down"
import ArrowUpIcon from "~icons/mdi/arrow-up"
import ChevronRightIcon from "~icons/mdi/chevron-right"
import ChevronUpIcon from "~icons/mdi/chevron-up"
import { Radio, RadioRoot } from "../../common/components/ui/Radio"
import { TableGroupConfigs, useTableState } from "../../common/utils/table"
import { getRankScoreIndex } from "../helper"
import { ScoreTableEntry } from "../models/aggregation"
import {
  RANK_SCORES,
  categories,
  comboFlags,
  difficulties,
  levelCompareKey,
  levels,
  syncFlags,
  versions,
} from "../models/constants"
import classes from "./PlayerScoreTable.module.css"

const columnHelper = createColumnHelper<ScoreTableEntry>()
const defaultVisibility = {
  category: false,
  version: false,
  current_version: false,
  level: false,
  rating_listed: false,
}

const tableGroupConfigs: TableGroupConfigs = {
  groups: {
    current_version: null,
    version: "difficulty",
    category: "difficulty",
    level: "internal_lv",
  },
  locked: {
    current_version: {
      grouping: [],
      sorting: [{ id: "rating", desc: true }],
    },
  },
  orderBy: "title",
  orderByDesc: false,
  groupable: [
    "version",
    "category",
    "difficulty",
    "level",
    "internal_lv",
    "combo_flag",
    "sync_flag",
  ],
  sortable: [
    "title",
    "deluxe",
    "difficulty",
    "level",
    "internal_lv",
    "score",
    "combo_flag",
    "sync_flag",
    "rating",
  ],
}

const getColumnClassName = (column: Column<ScoreTableEntry, unknown>) => {
  return `col-${column.id.replace(/_/g, "-")}`
}

const getCellClassName = (cell: Cell<ScoreTableEntry, unknown>) => {
  switch (cell.column.id) {
    case "deluxe":
      return cell.getValue() ? "dx" : "std"
    case "difficulty":
    case "internal_lv":
      if (cell.getIsAggregated()) return ""
      return `difficulty-${cell.row.getValue("difficulty")} ${
        cell.row.original.internal_lv
          ? ""
          : cell.row.original.level.includes("+")
          ? "plus"
          : "non-plus"
      }`
    case "combo_flag":
      return (comboFlags[cell.getValue() as number] ?? "").replace("+", "-plus")
    case "sync_flag":
      return (syncFlags[cell.getValue() as number] ?? "").replace("+", "-plus")
  }
  return ""
}

export const PlayerScoreTable = ({
  scoreTable,
}: {
  scoreTable: ScoreTableEntry[]
}) => {
  const [
    { primaryGroup, orderBy, orderByDesc, grouping, sorting },
    dispatchTableState,
  ] = useTableState({
    tableKey: "dx-intl",
    tableGroupConfigs,
  })

  const columnVisibility = useMemo(
    () =>
      grouping.reduce(
        (prev, next) => ({ ...prev, [next]: true }),
        defaultVisibility,
      ),
    [grouping],
  )
  const columnFilters: ColumnFilter[] = useMemo(
    () =>
      grouping[0] == "current_version"
        ? [{ id: "rating_listed", value: true }]
        : [],
    [grouping],
  )

  const table = useReactTable({
    data: scoreTable,
    state: {
      grouping,
      sorting,
      columnVisibility,
      columnFilters,
    },
    columns: [
      columnHelper.accessor("title", {
        header: "曲名",
        cell: (info) => info.getValue(),
        aggregationFn: () => "",
        sortingFn: (a, b) => {
          return a.index - b.index
        },
        enableGrouping: false,
      }),
      columnHelper.accessor("category", {
        header: "分類",
        cell: (info) => categories[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("deluxe", {
        header: "DX",
        cell: (info) => (info.getValue() ? "DX" : "STD"),
        aggregationFn: () => "",
      }),
      columnHelper.accessor("version", {
        header: "版本",
        cell: (info) => versions[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("current_version", {
        header: "新舊",
        cell: (info) => (info.getValue() ? "新曲" : "舊曲"),
        aggregationFn: () => "",
      }),
      columnHelper.accessor("difficulty", {
        header: "難度",
        cell: (info) =>
          info.cell.getIsGrouped()
            ? difficulties[info.getValue()].toUpperCase()
            : difficulties[info.getValue()].toUpperCase().substring(0, 3),
        aggregationFn: () => "",
      }),
      columnHelper.accessor("level", {
        header: "等級",
        cell: (info) => info.getValue(),
        sortingFn: (a, b, cid) =>
          levels.indexOf(a.getValue(cid)) - levels.indexOf(b.getValue(cid)),
      }),
      columnHelper.accessor("internal_lv", {
        header: "係數",
        cell: (info) =>
          info.getValue()
            ? info.getValue().toFixed(1)
            : info.row.getValue("level"),
        sortingFn: (a, b) =>
          (a.original.internal_lv ?? levelCompareKey[a.original.level]) -
          (b.original.internal_lv ?? levelCompareKey[b.original.level]),
      }),
      columnHelper.accessor("score", {
        header: "成績",
        cell: (info) =>
          info.getValue() ? info.getValue().toFixed(4) + "%" : "",
        aggregationFn: "min",
        aggregatedCell: (info) => {
          const rankScore = RANK_SCORES[getRankScoreIndex(info.getValue())]
          return rankScore && rankScore[1].includes("S") ? rankScore[1] : ""
        },
        enableGrouping: false,
      }),
      columnHelper.accessor("combo_flag", {
        header: "C",
        cell: (info) => comboFlags[info.getValue()],
        aggregationFn: "min",
        aggregatedCell: (info) => comboFlags[info.getValue()],
      }),
      columnHelper.accessor("sync_flag", {
        header: "S",
        cell: (info) => syncFlags[info.getValue()],
        aggregationFn: "min",
        aggregatedCell: (info) => syncFlags[info.getValue()],
      }),
      columnHelper.accessor("rating", {
        header: "R",
        cell: (info) => (info.getValue() ? info.getValue() : ""),
        aggregationFn: () => "",
      }),
      columnHelper.accessor("rating_listed", {
        header: "RL",
        cell: (info) => info.getValue(),
        aggregationFn: () => "",
      }),
    ],
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })
  return (
    <div>
      <RadioRoot
        value={grouping[0]}
        onValueChange={(payload) => {
          dispatchTableState({ type: "setPrimaryGroup", payload })
        }}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Radio value="current_version">Rating 組成</Radio>
        <Radio value="category">分類</Radio>
        <Radio value="version">版本</Radio>
        <Radio value="level">樂曲等級</Radio>
      </RadioRoot>
      <table
        className={`${classes.table} ${
          primaryGroup in tableGroupConfigs.locked ? ` ${classes.locked}` : ""
        }`}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted()
                if (header.column.getIsGrouped() || header.isPlaceholder) {
                  return null
                }
                return (
                  <th
                    key={header.id}
                    className={
                      getColumnClassName(header.column) +
                      `${isSorted ? " sorted" : ""}`
                    }
                    onClick={() => {
                      if (orderBy === header.column.id) {
                        dispatchTableState({
                          type: "setOrderByDesc",
                          payload: !orderByDesc,
                        })
                      } else if (
                        tableGroupConfigs.sortable.includes(header.id)
                      ) {
                        dispatchTableState({
                          type: "setOrderBy",
                          payload: header.id,
                        })
                      }
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {isSorted == false ? (
                      <svg />
                    ) : isSorted == "asc" ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const visibleCells = row.getVisibleCells()
            if (row.getIsGrouped()) {
              // As the library does not expose grouped row
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const leafCount = (row as any).leafRows.length

              const visibleCells = row.getVisibleCells()
              const spanTo = visibleCells.findIndex(
                (cell) => cell.column.id === "score",
              )
              const placeholders = visibleCells.filter((cell) =>
                cell.getIsPlaceholder(),
              ).length
              // To make the table more compact, we will apply colspan to grouped cell
              // which needs a dedicated logic.
              return (
                <tr key={row.id} className={classes.grouped}>
                  {visibleCells.map((cell, index) => {
                    console.log(cell)
                    console.log(cell.getIsGrouped())
                    console.log(cell.getIsPlaceholder())
                    if (cell.getIsGrouped()) {
                      return (
                        <td
                          onClick={row.getToggleExpandedHandler()}
                          key={cell.id}
                          colSpan={spanTo - placeholders - 1}
                          style={{ paddingLeft: `${index * 1}rem` }}
                        >
                          {row.getIsExpanded() ? (
                            <ChevronUpIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                          {` (${leafCount})`}
                        </td>
                      )
                    } else if (cell.getIsPlaceholder()) {
                      return null
                    } else if (
                      ["title", "deluxe", "internal_lv", "difficulty"].includes(
                        cell.column.id,
                      )
                    ) {
                      return null
                    }
                    return (
                      <td
                        key={getColumnClassName(cell.column)}
                        className={`${getColumnClassName(
                          cell.column,
                        )} ${getCellClassName(cell)}`}
                      >
                        {flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            }
            return (
              <tr
                key={row.id}
                className={row.original.rating_used ? classes.used : ""}
              >
                {visibleCells.map((cell) =>
                  !cell.getIsPlaceholder() ? (
                    <td
                      key={cell.id}
                      className={`${getColumnClassName(
                        cell.column,
                      )} ${getCellClassName(cell)}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ) : null,
                )}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
