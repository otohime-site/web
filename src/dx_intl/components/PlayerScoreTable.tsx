import {
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
import { RadioCard, RadioCardRoot } from "../../common/components/ui/RadioCard"
import { getRankScoreIndex } from "../helper"
import { ScoreTableEntry } from "../models/aggregation"
import {
  RANK_SCORES,
  categories,
  comboFlags,
  difficulties,
  levels,
  syncFlags,
  versions,
} from "../models/constants"
import { TableGroupConfigs, useTableState } from "../../common/utils/table"

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

export const PlayerScoreTable = ({
  scoreTable,
}: {
  scoreTable: ScoreTableEntry[]
}) => {
  const [{ orderBy, orderByDesc, grouping, sorting }, dispatchTableState] =
    useTableState({
      tableKey: "dx-intl",
      tableGroupConfigs,
    })

  const columnVisibility = useMemo(
    () => ({ ...defaultVisibility, [grouping[0]]: true }),
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
        header: "新/舊曲",
        cell: (info) => (info.getValue() ? "新曲" : "舊曲"),
        aggregationFn: () => "",
      }),
      columnHelper.accessor("difficulty", {
        header: "難易度",
        cell: (info) =>
          difficulties[info.getValue()].substring(0, 3).toUpperCase(),
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
        cell: (info) => info.getValue() ?? info.row.getValue("level"),
      }),
      columnHelper.accessor("score", {
        header: "成績",
        cell: (info) => (info.getValue() ? info.getValue().toFixed(4) : ""),
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
      <RadioCardRoot
        value={grouping[0]}
        onValueChange={(payload) => {
          dispatchTableState({ type: "setPrimaryGroup", payload })
        }}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <RadioCard value="current_version">Rating 組成</RadioCard>
        <RadioCard value="category">分類</RadioCard>
        <RadioCard value="version">版本</RadioCard>
        <RadioCard value="level">樂曲等級</RadioCard>
      </RadioCardRoot>
      <table
        style={{ width: "100%", fontSize: "1rem", fontFamily: "'M PLUS 1p'" }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={header.column.getIsGrouped() ? { width: "12px" } : {}}
                  onClick={() => {
                    if (orderBy == header.id) {
                      dispatchTableState({
                        type: "setOrderByDesc",
                        payload: !orderByDesc,
                      })
                    } else if (tableGroupConfigs.sortable.includes(header.id)) {
                      dispatchTableState({
                        type: "setOrderBy",
                        payload: header.id,
                      })
                    }
                  }}
                >
                  {header.isPlaceholder ||
                  header.column.getIsGrouped() ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </>
                  )}
                  {orderBy == header.id ? (orderByDesc ? "↓" : "↑") : ""}
                </th>
              ))}
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

              // To make the table more compact, we will apply colspan to grouped cell
              // , expand to the `title` column, which needs a dedicated logic.
              // The Tanstack table will arranged it like:
              // [placeholder][group][placeholder][aggregated][aggregated]...

              // First, find the index of the last aggregated cell,
              // as all grouped/placeholder are placed in the left,
              // it will also be the length of all visible grouping cells.
              const firstAggIndex = visibleCells.findIndex(
                (cell) => !cell.column.getIsGrouped(),
              )

              // Then draw and handle colspans.
              let groupCellDone = false
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => {
                    if (cell.getIsGrouped()) {
                      groupCellDone = true
                      return (
                        <td key={cell.id} colSpan={firstAggIndex - index + 1}>
                          <button onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? "|" : ">"}
                          </button>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                          {` (${leafCount})`}
                        </td>
                      )
                    } else if (cell.getIsPlaceholder()) {
                      return !groupCellDone ? <td key={cell.id}></td> : null
                    } else if (index === firstAggIndex) {
                      return null
                    }
                    return (
                      <td key={cell.id}>
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
              <tr key={row.id}>
                {visibleCells.map((cell) => (
                  <td key={cell.id}>
                    {!cell.getIsPlaceholder() ? (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    ) : (
                      <></>
                    )}
                  </td>
                ))}
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
