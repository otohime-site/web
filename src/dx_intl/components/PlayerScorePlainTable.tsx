import { ScoreTableEntry, getNoteHash } from "../models/aggregation"

export const PlayerScoreTable = ({
  groupedData,
}: {
  groupedData: Map<
    string | number | boolean | null | undefined,
    ScoreTableEntry[]
  >
}) => {
  return (
    <table>
      {[...groupedData.entries()].map(([group, table]) => {
        console.log(table)
        return (
          <>
            <tr key={group?.toString()}>
              <th>{group?.toString()}</th>
            </tr>
            {table.map((entry) => (
              <tr key={getNoteHash(entry)}>
                <td>{entry.title}</td>
              </tr>
            ))}
          </>
        )
      })}
    </table>
  )
}
