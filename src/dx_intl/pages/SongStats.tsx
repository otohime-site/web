import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import {
  DxIntlScoresStatsDocument,
  DxIntlSongsByIdDocument,
  Dx_Intl_Scores_Stats,
} from "../../generated/graphql"
import { NoteList } from "../helper"
import { difficulties } from "../models/constants"

//  font-family: "M PLUS 1p";
//  font-weight: 700;

const SongStats = () => {
  const params = useParams<"songId" | "variant" | "difficulty">()
  const { variant } = params
  const songId = params.songId ?? ""
  const deluxe = variant != null ? variant === "dx" : null
  const difficulty =
    params.difficulty != null ? parseInt(params.difficulty, 10) : null
  const [songsResult] = useQuery({
    query: DxIntlSongsByIdDocument,
    variables: { idLike: `${songId}%` },
  })
  const song = songsResult.data?.dx_intl_songs[0]
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
    query: DxIntlScoresStatsDocument,
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
    Array<
      Pick<Dx_Intl_Scores_Stats, "range" | "count"> & { accumulated: number }
    >
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
      <QueryResult result={songsResult}>
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
      </QueryResult>
    </>
  )
}

export default SongStats
