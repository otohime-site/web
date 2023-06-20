import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
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
import { ComboFlag, SyncFlag } from "./Flags"
import Variant from "./Variant"

const columnHelper = createColumnHelper<ScoreTableEntry>()

export const PlayerScoreTable = ({
  scoreTable,
}: {
  scoreTable: ScoreTableEntry[]
}) => {
  const [grouping, setGrouping] = useState<string[]>(["category", "difficulty"])
  const [sorting, setSorting] = useState<any>([])
  const table = useReactTable({
    data: scoreTable,
    state: {
      grouping,
      sorting,
    },
    columns: [
      columnHelper.accessor("title", {
        header: "曲名",
        cell: (info) => info.getValue(),
        aggregationFn: () => "",
        enableGrouping: false,
      }),
      columnHelper.accessor("category", {
        header: "分類",
        cell: (info) => categories[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("deluxe", {
        header: "DX",
        cell: (info) => <Variant deluxe={info.getValue()} />,
        aggregationFn: () => "",
      }),
      columnHelper.accessor("version", {
        header: "版本",
        cell: (info) => versions[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("difficulty", {
        header: "難易度",
        cell: (info) => difficulties[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("level", {
        header: "等級",
        cell: (info) => info.getValue(),
        sortingFn: (a, b, cid) =>
          levels.indexOf(b.getValue(cid)) - levels.indexOf(a.getValue(cid)),
      }),
      columnHelper.accessor("internal_lv", {
        header: "係數",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("score", {
        header: "成績",
        cell: (info) => info.getValue()?.toFixed(4) ?? "",
        aggregationFn: "min",
        aggregatedCell: (info) => {
          const rankScore = RANK_SCORES[getRankScoreIndex(info.getValue())]
          return rankScore && rankScore[1].includes("S") ? rankScore[1] : ""
        },
        enableGrouping: false,
      }),
      columnHelper.accessor("combo_flag", {
        header: "Combo",
        cell: (info) => <ComboFlag flag={comboFlags[info.getValue()]} />,
        aggregationFn: "min",
        aggregatedCell: (info) => comboFlags[info.getValue()],
      }),
      columnHelper.accessor("sync_flag", {
        header: "Sync",
        cell: (info) => <SyncFlag flag={syncFlags[info.getValue()]} />,
        aggregationFn: "min",
        aggregatedCell: (info) => syncFlags[info.getValue()],
      }),
    ],
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} style={{ background: "#AAAAAA" }}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} style={{ minWidth: "32px" }}>
                {header.isPlaceholder || header.column.getIsGrouped() ? null : (
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() ? (
                      <button onClick={header.column.getToggleSortingHandler()}>
                        {header.column.getIsSorted() == "asc"
                          ? "↑"
                          : header.column.getIsSorted() == "desc"
                          ? "↓"
                          : "S"}
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
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
              (cell) => !cell.column.getIsGrouped()
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
                          {row.getIsExpanded() ? "﹀" : "＞"}
                        </button>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {` (${leafCount})`}
                      </td>
                    )
                  } else if (cell.getIsPlaceholder()) {
                    return !groupCellDone ? <td key={cell.id}></td> : <></>
                  } else if (index === firstAggIndex) {
                    return <></>
                  }
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.aggregatedCell ??
                          cell.column.columnDef.cell,
                        cell.getContext()
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
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
