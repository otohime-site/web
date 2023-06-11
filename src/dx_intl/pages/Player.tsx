import { useMemo } from "react"
import { useParams } from "react-router"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Alert } from "../../common/components/ui/Alert"
import { groupByKey } from "../../common/utils/grouping"
import { getFragmentData, graphql } from "../../gql"
import { PlayerPortfolio } from "../components/PlayerPortfolio"
import { PlayerScoreTable } from "../components/PlayerScoreTable"
import Record from "../components/Record"
import { getNoteHash, getRating } from "../helper"
import {
  ScoreTableEntry,
  ScoreTableGroups,
  flatSongsResult,
  groupBy,
} from "../models/aggregation"
import { versions } from "../models/constants"
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
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult]
  )
  // Used to get rating in reliable way during major version updates
  const maxVersion = useMemo(
    () => Math.max(...flattedEntries.map((entry) => entry.version)),
    [flattedEntries]
  )

  const { scoreTable, noteInconsistency } = useMemo(() => {
    if (!recordResult.data) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const maxVersion = Math.max(...flattedEntries.map((entry) => entry.version))
    const scores =
      getFragmentData(
        dxIntlScoresFields,
        recordResult.data.dx_intl_players[0].dx_intl_scores
      ) ?? []
    const scoresMap = new Map(
      scores.map((score) => [getNoteHash(score), score])
    )
    const scoreTable = flattedEntries.map<ScoreTableEntry>((entry) => {
      const score = scoresMap.get(entry.hash)
      scoresMap.delete(entry.hash)
      return {
        ...entry,
        score: score?.score,
        combo_flag: score?.combo_flag,
        sync_flag: score?.sync_flag,
        updated_at: score?.start,
        current_version: entry.version == maxVersion,
        rating:
          score?.score && entry.internal_lv
            ? getRating(score.score, entry.internal_lv)
            : undefined,
      }
    })
    // It may be inconsistent if songs are added but song list not updated
    return { scoreTable, noteInconsistency: scoresMap.size > 0 }
  }, [flattedEntries, recordResult])

  const scoreTableGroups: ScoreTableGroups = useMemo(
    () => new Map(groupBy.map((key) => [key, groupByKey(scoreTable, key)])),
    [scoreTable]
  )

  if (recordResult.error != null || songsResult.error != null) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null || songsResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.dx_intl_players[0]
  const record = getFragmentData(dxIntlRecordsFields, player.dx_intl_record)
  console.log(scoreTableGroups)

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
      <PlayerPortfolio scoreTableGroups={scoreTableGroups} />
      {maxVersion > versions.length - 1 || noteInconsistency ? (
        <Alert severity="error">
          成績單目前有同步狀況，請試圖重新整理頁面。
        </Alert>
      ) : (
        <></>
      )}
      <PlayerScoreTable scoreTable={scoreTable} />
    </>
  )
}
export default Player
