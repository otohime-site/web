import { useQuery } from "urql"
import { Params } from "wouter"
import IconPencil from "~icons/mdi/pencil"
import { Alert } from "../../common/components/ui/Alert"
import { LinkButton } from "../../common/components/ui/Button"
import { useUser } from "../../common/contexts"
import { graphql, readFragment } from "../../graphql"
import Record from "../components/Record"
import { finaleRecordsFields, finaleScoresFields } from "../models/fragments"
import { finalePlayersEditableDocument } from "../models/queries"

const finaleRecordWithScoresDocument = graphql(
  `
    query finaleRecordWithScores($nickname: String!) {
      finale_players(where: { nickname: { _eq: $nickname } }) {
        updated_at
        private
        finale_record {
          ...finaleRecordsFields
        }
        finale_scores {
          ...finaleScoresFields
        }
      }
    }
  `,
  [finaleRecordsFields, finaleScoresFields],
)

const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  const [editableResult] = useQuery({
    query: finalePlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: finaleRecordWithScoresDocument,
    variables: { nickname: params.nickname ?? "" },
  })

  if (recordResult.error != null /*|| songsResult.error != null*/) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null /* || songsResult.data == null*/) {
    return <></>
  }
  if (recordResult.data.finale_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.finale_players[0]
  const record = readFragment(finaleRecordsFields, player.finale_record)

  if (record == null) {
    return (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    )
  }
  return (
    <>
      <Alert severity="info">
        <p>這是從以前 Semiquaver 成績單系統中轉移的 maimai 舊框成績單。</p>
      </Alert>
      <Record
        record={record}
        updatedAt={player.updated_at}
        isPrivate={player.private}
      />
      {editableResult.error == null &&
      (editableResult.data?.finale_players?.length ?? 0) > 0 ? (
        <LinkButton href={`/fin/p/${params.nickname}/edit`}>
          <IconPencil /> 編輯
        </LinkButton>
      ) : null}
    </>
  )
}

export default Player
