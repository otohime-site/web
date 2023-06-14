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
  const [grouping, setGrouping] = useState<string[]>(["category"])
  const [sorting, setSorting] = useState<any>([])
  const table = useReactTable({
    data: scoreTable,
    state: {
      grouping,
      sorting,
    },
    columns: [
      columnHelper.accessor("category", {
        header: "分類",
        cell: (info) => categories[info.getValue()],
        aggregationFn: () => "",
      }),
      columnHelper.accessor("title", {
        header: "曲名",
        cell: (info) => info.getValue(),
        aggregationFn: "count",
        enableGrouping: false,
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
  console.log(grouping)
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} style={{ background: "#AAAAAA" }}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getCanGroup() ? (
                  <button onClick={header.column.getToggleGroupingHandler()}>
                    {header.column.getIsGrouped() ? "G" : "g"}
                  </button>
                ) : (
                  <></>
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
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const state = cell.getIsGrouped()
                ? "grouped"
                : cell.getIsAggregated()
                ? "aggregated"
                : cell.getIsPlaceholder()
                ? "placeholder"
                : "normal"
              let content = flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )
              switch (state) {
                case "grouped":
                  content = (
                    <>
                      <button onClick={row.getToggleExpandedHandler()}>
                        {row.getIsExpanded() ? "﹀" : "＞"}
                      </button>{" "}
                      {content}
                    </>
                  )
                  break
                case "aggregated":
                  content = flexRender(
                    cell.column.columnDef.aggregatedCell ??
                      cell.column.columnDef.cell,
                    cell.getContext()
                  )
                  break
                case "placeholder":
                  content = ""
              }
              return (
                <td
                  key={cell.id}
                  className={state != "normal" ? state : undefined}
                >
                  {content}
                </td>
              )
            })}
          </tr>
        ))}
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
