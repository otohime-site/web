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
import clsx from "clsx"
import { useMemo, useState } from "react"
import ArrowDownIcon from "~icons/mdi/arrow-down"
import ArrowUpIcon from "~icons/mdi/arrow-up"
import ChevronRightIcon from "~icons/mdi/chevron-right"
import ChevronUpIcon from "~icons/mdi/chevron-up"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../common/components/ui/ToggleGroup"
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
import { ComboFlag, SyncFlag } from "./Flags"
import classes from "./PlayerScoreTable.module.css"
import Variant from "./Variant"

const columnHelper = createColumnHelper<ScoreTableEntry>()
const defaultVisibility = {
  category: false,
  difficulty: false,
  version: false,
  current_version: false,
  level: false,
  rating_listed: false,
}

const tableGroupConfigs: TableGroupConfigs = {
  locked: {
    current_version: {
      sorting: [{ id: "rating", desc: true }],
    },
  },
  defaultSorting: [{ id: "title", desc: false }],
  groupable: ["current_version", "version", "category", "level"],
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
  groupingDesc: ["current_version"],
}

const groupColumnNames: Record<string, string> = {
  current_version: "Rating 組成",
  version: "版本",
  category: "分類",
  level: "等級",
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
      return clsx(
        classes[
          `difficulty-${cell.row.getValue("difficulty") as 0 | 1 | 2 | 3 | 4}`
        ],
        cell.row.original.internal_lv
          ? ""
          : cell.row.original.level.includes("+")
          ? "plus"
          : "non-plus",
      )
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
  const [{ grouping, sorting }, dispatchTableState] = useTableState({
    tableKey: "dx-intl",
    tableGroupConfigs,
  })
  const [difficulty, setDifficulty] = useState<number>(2)

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
        : grouping[0] == "level"
        ? []
        : [{ id: "difficulty", value: difficulty }],
    [grouping, difficulty],
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
        cell: (info) => <Variant deluxe={info.getValue()} />,
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
        filterFn: "equals",
      }),
      columnHelper.accessor("level", {
        header: "等級",
        cell: (info) =>
          info.cell.getIsGrouped()
            ? `Level ${info.getValue()}`
            : info.getValue(),
        sortingFn: (a, b, cid) =>
          levels.indexOf(a.getValue(cid)) - levels.indexOf(b.getValue(cid)),
      }),
      columnHelper.accessor("internal_lv", {
        header: "係數",
        cell: (info) =>
          info.getValue()
            ? info.getValue().toFixed(1)
            : info.cell.getIsGrouped()
            ? `(定數不明)`
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
        cell: (info) => <ComboFlag flag={comboFlags[info.getValue()]} />,
        aggregationFn: "min",
        aggregatedCell: (info) => (
          <ComboFlag flag={comboFlags[info.getValue()]} />
        ),
      }),
      columnHelper.accessor("sync_flag", {
        header: "S",
        cell: (info) => <SyncFlag flag={syncFlags[info.getValue()]} />,
        aggregationFn: "min",
        aggregatedCell: (info) => (
          <SyncFlag flag={syncFlags[info.getValue()]} />
        ),
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
      <ToggleGroup
        type="single"
        value={grouping[0]}
        onValueChange={(payload) => {
          if (payload) dispatchTableState({ type: "setGroup", payload })
        }}
        style={{
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {tableGroupConfigs.groupable.map((g, i) => (
          <ToggleGroupItem
            key={g}
            value={g}
            style={{ flex: i == 0 ? "3" : "2" }}
            color={i == 0 ? "crimson" : "violet"}
          >
            {groupColumnNames[g]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {!(grouping[0] in tableGroupConfigs.locked) && grouping[0] !== "level" ? (
        <ToggleGroup
          type="single"
          value={difficulty.toString()}
          onValueChange={(v) => {
            if (v) setDifficulty(parseInt(v, 10))
          }}
          style={{
            height: "3rem",
            display: "flex",
            alignItems: "center",
            fontSize: "85%",
          }}
        >
          {difficulties.map((d, i) => (
            <ToggleGroupItem
              style={{ textTransform: "uppercase", flex: 1 }}
              key={i}
              value={i.toString()}
              className={classes[`toggle-difficulty-${i as 0 | 1 | 2 | 3 | 4}`]}
            >
              {d}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <div style={{ height: "3rem" }} />
      )}
      <table
        className={clsx(classes.table, {
          [classes.locked]: grouping[0] in tableGroupConfigs.locked,
        })}
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
                      if (sorting[1].id === header.column.id) {
                        dispatchTableState({
                          type: "setOrderByDesc",
                          payload: !sorting[1].desc,
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
                    if (cell.getIsGrouped()) {
                      return (
                        <td
                          onClick={row.getToggleExpandedHandler()}
                          key={cell.id}
                          colSpan={spanTo - placeholders - 1}
                          style={{ paddingLeft: `${index * 1}em` }}
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
                        className={clsx(
                          getColumnClassName(cell.column),
                          getCellClassName(cell),
                        )}
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
            const groups = visibleCells.filter((c) =>
              c.column.getIsGrouped(),
            ).length
            return (
              <tr
                key={row.id}
                className={row.original.rating_used ? classes.used : ""}
              >
                {visibleCells.map((cell) =>
                  !cell.getIsPlaceholder() ? (
                    <td
                      key={cell.id}
                      className={clsx(
                        getColumnClassName(cell.column),
                        getCellClassName(cell),
                      )}
                      style={
                        cell.column.id === "title"
                          ? { paddingLeft: `${groups}em` }
                          : {}
                      }
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
              {footerGroup.headers.map((header) =>
                header.column.getIsGrouped() || header.isPlaceholder ? null : (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ),
              )}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
