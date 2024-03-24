import { Tab, TabList, TabPanel, Tabs } from "react-aria-components"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import { QueryResult } from "../../common/components/QueryResult"
import { graphql } from "../../gql"
import { difficulties, levels } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./SongStats.module.css"

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

const SongStats = ({ params }: { params: Params }) => {
  const { variant } = params
  const songId = params.songId ?? ""
  const deluxe = variant != null ? variant === "dx" : null
  const difficulty =
    params.difficulty != null ? parseInt(params.difficulty, 10) : null
  const [songsResult] = useQuery({
    query: dxIntlSongsDocument,
  })
  const song = (songsResult.data?.dx_intl_songs || []).filter((song) =>
    song.id.startsWith(songId),
  )[0]
  const variantMap = new Map(
    (song?.dx_intl_variants ?? []).map((variant) => [
      variant.deluxe,
      {
        version: variant.version,
        active: variant.active,
        notes: variant.dx_intl_notes.reduce<
          Array<{
            level: (typeof levels)[number]
          }>
        >((accr, note) => {
          accr[note.difficulty] = {
            level: note.level,
          }
          return accr
        }, []),
      },
    ]),
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
    [],
  )
  return (
    <QueryResult result={songsResult}>
      {song != null ? (
        <>
          <Titled
            title={(title) =>
              `${song.title} - maimai DX 曲目成績統計 - ${title}`
            }
          />
          <h4 className={classes.title}>{song.title}</h4>
          <Tabs slot="deluxe" selectedKey={deluxe ? "dx" : "std"}>
            <TabList>
              {variantMap.has(false) ? (
                <Tab id="std" href={`/dxi/s/${params.songId}/std/`}>
                  STANDARD
                </Tab>
              ) : null}
              {variantMap.has(true) ? (
                <Tab id="dx" href={`/dxi/s/${params.songId}/dx/`}>
                  DELUXE
                </Tab>
              ) : null}
            </TabList>
            <TabPanel id={deluxe ? "dx" : "std"}>
              <Tabs
                slot="difficulty"
                selectedKey={difficulty != null ? `${difficulty}` : ""}
              >
                <TabList items={notes.map((_, i) => ({ i }))}>
                  {({ i }) => (
                    <Tab
                      href={`/dxi/s/${params.songId}/${params.variant ?? ""}/${i}`}
                      key={i}
                      id={`${i}`}
                    >
                      {difficulties[i]}
                    </Tab>
                  )}
                </TabList>
                <TabPanel id={difficulty != null ? `${difficulty}` : ""}>
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
                </TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
        </>
      ) : null}
    </QueryResult>
  )
}

export default SongStats
