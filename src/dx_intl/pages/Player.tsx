import { useParams } from "react-router"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Alert } from "../../common/components/ui/Alert"
import { getFragmentData, graphql } from "../../gql"
import Record from "../components/Record"
import { dxIntlRecordsFields } from "../models/fragments"
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
  const player = recordResult.data.dx_intl_players[0]
  const record = getFragmentData(dxIntlRecordsFields, player.dx_intl_record)

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
    </>
  )
}
export default Player
