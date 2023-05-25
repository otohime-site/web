import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import { graphql } from "../../gql"
import { useSongs } from "../contexts"
import { NoteList } from "../helper"
import { difficulties } from "../models/constants"

//  font-family: "M PLUS 1p";
//  font-weight: 700;

const dxIntlScoresStatsDocument = graphql(`
  query dxIntlScoresStats(
    $songId: String!
    $deluxe: Boolean!
    $difficulty: smallint!
  ) {
    dx_intl_scores_stats(
      where: {
        song_id: { _eq: $songId }
        deluxe: { _eq: $deluxe }
        difficulty: { _eq: $difficulty }
      }
    ) {
      range
      count
    }
  }
`)

const SongStats = () => {
  const params = useParams<"songId" | "variant" | "difficulty">()
  const { variant } = params
  const songId = params.songId ?? ""
  const deluxe = variant != null ? variant === "dx" : null
  const difficulty =
    params.difficulty != null ? parseInt(params.difficulty, 10) : null
  const { songs } = useSongs()
  const song = (songs || []).filter((song) => song.id.startsWith(songId))[0]
  const variantMap = new Map(
    (song?.dx_intl_variants ?? []).map((variant) => [
      variant.deluxe,
      {
        version: variant.version,
        active: variant.active,
        notes: variant.dx_intl_notes.reduce<NoteList>((accr, note) => {
          accr[note.difficulty] = {
            level: note.level,
          }
          return accr
        }, []),
      },
    ])
  )
  const notes = variantMap.get(params.variant === "dx")?.notes ?? []
  const [statsResult] = useQuery({
    query: dxIntlScoresStatsDocument,
    variables: {
      songId: song?.id ?? "",
      deluxe: deluxe ?? false,
      difficulty: difficulty ?? 0,
    },
    pause: variant == null || deluxe == null || difficulty == null,
  })
  const statsAccumulated = (
    statsResult.data?.dx_intl_scores_stats ?? []
  ).reduce<
    Array<{
      range?: string | null
      count?: number | null
      accumulated: number
    }>
  >(
    (accr, curr) => [
      ...accr,
      {
        ...curr,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        accumulated:
          (accr[accr.length - 1]?.accumulated ?? 0) + (curr.count ?? 0),
      },
    ],
    []
  )
  return (
    <>
      {song != null ? (
        <>
          <Titled
            title={(title) =>
              `${song.title} - maimai DX 曲目成績統計 - ${title}`
            }
          />
          <h4>{song.title}</h4>
          <div>
            {variantMap.has(false) ? (
              <Link to={`/dxi/s/${params.songId}/std/`}>STANDARD</Link>
            ) : (
              ""
            )}
            {variantMap.has(true) ? (
              <Link to={`/dxi/s/${params.songId}/dx/`}>DELUXE</Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {notes.map((_, i) => (
              <Link
                to={`/dxi/s/${params.songId}/${params.variant ?? ""}/${i}`}
                key={i}
              >
                {difficulties[i]}
              </Link>
            ))}
          </div>
          <QueryResult result={statsResult}>
            <table>
              <thead>
                <tr>
                  <th>評等</th>
                  <th>玩家數</th>
                  <th>累計</th>
                </tr>
              </thead>
              <tbody>
                {statsAccumulated.map((s) => (
                  <tr key={s.range}>
                    <td>{s.range ?? ""}</td>
                    <td>{s.count ?? "0"}</td>
                    <td>{s.accumulated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </QueryResult>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default SongStats
