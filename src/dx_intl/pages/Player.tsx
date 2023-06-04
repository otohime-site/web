import { useParams } from "react-router"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Alert } from "../../common/components/ui/Alert"
import { getFragmentData, graphql } from "../../gql"
import Record from "../components/Record"
import { ScoreCell } from "../components/ScoreCell"
import { getNoteHash, getRating } from "../helper"
import { dxIntlRecordsFields, dxIntlScoresFields } from "../models/fragments"
import { dxIntlSongsDocument } from "../models/queries"

const dxIntlRecordWithScoresDocument = graphql(`
  query dxIntlRecordWithScores($nickname: String!) {
    dx_intl_players(where: { nickname: { _eq: $nickname } }) {
      updated_at
      private
      dx_intl_record {
        ...dxIntlRecordsFields
      }
      dx_intl_scores {
        ...dxIntlScoresFields
      }
    }
  }
`)

const Player = () => {
  const params = useParams<"nickname">()

  const [recordResult] = useQuery({
    query: dxIntlRecordWithScoresDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })

  if (recordResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  performance.mark("start")
  const songs = songsResult.data?.dx_intl_songs ?? []
  const flatted = songs.flatMap((song) =>
    song.dx_intl_variants.flatMap((variant) =>
      variant.dx_intl_notes.map((note) => ({
        song_id: song.id,
        category: song.category,
        title: song.title,
        order: song.order,
        deluxe: variant.deluxe,
        version: variant.version,
        active: variant.active,
        difficulty: note.difficulty,
        level: note.level,
        internal_lv: note.internal_lv,
      }))
    )
  )
  const maxVersion = Math.max(...flatted.map((row) => row.version))
  const player = recordResult.data.dx_intl_players[0]
  const record = getFragmentData(dxIntlRecordsFields, player.dx_intl_record)
  const scores =
    getFragmentData(dxIntlScoresFields, player.dx_intl_scores) ?? []
  const scoresMap = new Map(scores.map((score) => [getNoteHash(score), score]))

  const scoreTable = flatted.map((row) => {
    const hash = getNoteHash(row)
    const score = scoresMap.get(hash)
    return {
      ...row,
      hash,
      score: score?.score,
      combo_flag: score?.combo_flag,
      sync_flag: score?.sync_flag,
      updated_at: score?.start,
      new: row.version == maxVersion,
      rating:
        score?.score && row.internal_lv
          ? getRating(score.score, row.internal_lv)
          : undefined,
      rating_target: false,
    }
  })
  const ratingTargets = new Set([
    ...scoreTable
      .filter((s) => s.new)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 15)
      .map((s) => s.hash),
    ...scoreTable
      .filter((s) => !s.new)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 35)
      .map((s) => s.hash),
  ])
  scoreTable.forEach((s) => {
    s.rating_target = ratingTargets.has(s.hash)
  })
  performance.mark("end")
  console.log(scoreTable)
  console.log(performance.measure("qq", "start", "end"))

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }

  return (
    <>
      <Titled
        title={(title) => `${record.card_name} - maimai DX 成績單 - ${title}`}
      />
      <div>
        <div>
          <Record
            record={record}
            isPrivate={player.private}
            updatedAt={player.updated_at}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>DX</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {scoreTable
            .filter((s) => s.difficulty === 2)
            .map((s) => (
              <tr key={s.hash}>
                <td>{s.title}</td>
                <td>{s.deluxe}</td>
                <td>
                  <ScoreCell data={s} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}
export default Player
