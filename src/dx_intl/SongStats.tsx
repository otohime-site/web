import {
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"
import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "urql"
import styled from "@emotion/styled"
import {
  DxIntlScoresStatsDocument,
  DxIntlSongsByIdDocument,
  Dx_Intl_Scores_Stats,
} from "../generated/graphql"
import { QueryResult } from "../QueryResult"

import { difficulties, NoteList } from "./helper"

const FontTypo = styled(Typography)`
  font-family: "M PLUS 1p";
  font-weight: 700;
`

const SongStats: FunctionComponent = () => {
  const params =
    useParams<{ songId: string; variant?: "std" | "dx"; difficulty?: string }>()
  const { songId, variant } = params
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
    variables: { songId: song?.id ?? "", deluxe, difficulty },
    pause: variant == null || difficulty == null,
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
            <Helmet>
              <title>{song.title} - maimai DX 曲目成績統計 - Otohime</title>
            </Helmet>
            <FontTypo variant="h6">{song.title}</FontTypo>
            <Tabs
              value={params.variant}
              indicatorColor="primary"
              textColor="primary"
            >
              {variantMap.has(false) ? (
                <Tab
                  value="std"
                  label="STANDARD"
                  component={RouterLink}
                  to={`/dxi/s/${params.songId}/std/`}
                />
              ) : (
                ""
              )}
              {variantMap.has(true) ? (
                <Tab
                  value="dx"
                  label="DELUXE"
                  component={RouterLink}
                  to={`/dxi/s/${params.songId}/dx/`}
                />
              ) : (
                ""
              )}
            </Tabs>
            <Tabs
              value={difficulty}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="secondary"
              textColor="secondary"
            >
              {notes.map((_, i) => (
                <Tab
                  value={i}
                  key={i}
                  label={difficulties[i]}
                  component={RouterLink}
                  to={`/dxi/s/${params.songId}/${params.variant ?? ""}/${i}`}
                />
              ))}
            </Tabs>
            <QueryResult result={statsResult}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th">評等</TableCell>
                    <TableCell component="th">玩家數</TableCell>
                    <TableCell component="th">累計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statsAccumulated.map((s) => (
                    <TableRow>
                      <TableCell>{s.range ?? ""}</TableCell>
                      <TableCell>{s.count ?? "0"}</TableCell>
                      <TableCell>{s.accumulated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
