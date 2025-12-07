import { SegmentGroup } from "@ark-ui/react/segment-group"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params } from "wouter"
import { navigate } from "wouter/use-browser-location"
import { QueryResult } from "../../common/components/QueryResult"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import { flatSongsResult, getCoverUrl } from "../models/aggregation"
import { difficulties } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./SongStats.module.css"

// Generated with https://png-pixel.com/
export const BLUE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg=="

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
      order_by: { range: asc }
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
  const songEntries = flatSongsResult(songsResult.data).filter((entry) =>
    entry.song_id.startsWith(songId),
  )
  const song = (songsResult.data?.dx_intl_songs || []).filter((song) =>
    song.id.startsWith(songId),
  )[0]
  const variants = [false, true].map((deluxe) =>
    songEntries.some((entry) => entry.deluxe == deluxe),
  )
  const variantEntries = songEntries.filter((entry) => entry.deluxe == deluxe)
  const note = (variantEntries ?? []).filter(
    (e) => e.difficulty === difficulty,
  )[0]
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
          <section className={classes.intro}>
            <img src={getCoverUrl(song.id)} />
            <div>
              <h4 className={classes.title}>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </section>
          <SegmentGroup.Root
            value={deluxe ? "dx" : "std"}
            onValueChange={({ value }) => {
              navigate(`/dxi/s/${params.songId}/${value}/`)
            }}
          >
            {variants[0] ? (
              <SegmentGroupItem value="std">STANDARD</SegmentGroupItem>
            ) : null}
            {variants[1] ? (
              <SegmentGroupItem value="dx">DELUXE</SegmentGroupItem>
            ) : null}
          </SegmentGroup.Root>
          <SegmentGroup.Root
            value={`${difficulty}`}
            onValueChange={({ value }) => {
              navigate(
                `/dxi/s/${params.songId}/${params.variant ?? ""}/${value}`,
              )
            }}
          >
            {variantEntries.map((entry) => (
              <SegmentGroupItem
                value={`${entry.difficulty}`}
                key={entry.difficulty}
              >
                {difficulties[entry.difficulty]}{" "}
                {entry.internal_lv ? entry.internal_lv.toFixed(1) : entry.level}
              </SegmentGroupItem>
            ))}
          </SegmentGroup.Root>
          <ul className={classes.rates}>
            <li>
              <span>Play</span>
              <span>{note?.play ?? 0}</span>
            </li>
            <li>
              <span>SSS Rate</span>
              <span>{((note?.sss_rate ?? 0) * 100).toFixed(1)}%</span>
            </li>
            <li>
              <span>FC Rate</span>
              <span>{((note?.fc_rate ?? 0) * 100).toFixed(1)}%</span>
            </li>
            <li>
              <span>AP Rate</span>
              <span>{((note?.ap_rate ?? 0) * 100).toFixed(1)}%</span>
            </li>
          </ul>
          <ul>
            <li>數字來自 Otohime 系統中所有登錄且公開的成績單。</li>
            <li>每十分鐘更新。</li>
          </ul>
          <h5>分數別玩家統計</h5>
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
      ) : null}
    </QueryResult>
  )
}

export default SongStats
