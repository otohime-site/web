import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ScoreTableEntry } from "../models/aggregation"

const columnHelper = createColumnHelper<ScoreTableEntry>()

export const PlayerScoreTable = ({
  scoreTable,
}: {
  scoreTable: ScoreTableEntry[]
}) => {
  const table = useReactTable({
    data: scoreTable,
    columns: [
      columnHelper.accessor("category", { cell: (info) => info.getValue() }),
      columnHelper.accessor("title", { cell: (info) => info.getValue() }),
      columnHelper.accessor("level", { cell: (info) => info.getValue() }),
      columnHelper.accessor("difficulty", { cell: (info) => info.getValue() }),
      columnHelper.accessor("score", { cell: (info) => info.getValue() }),
      columnHelper.accessor("combo_flag", { cell: (info) => info.getValue() }),
      columnHelper.accessor("sync_flag", { cell: (info) => info.getValue() }),
    ],
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
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
