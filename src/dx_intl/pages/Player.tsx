import { useParams } from "react-router"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Alert } from "../../common/components/ui/Alert"
import {
  DxIntlRecordWithScoresDocument,
  DxIntlSongsDocument,
  Dx_Intl_Notes,
} from "../../generated/graphql"
import Record from "../components/Record"

export type NoteEntry = Pick<
  Dx_Intl_Notes,
  "song_id" | "deluxe" | "difficulty" | "level" | "internal_lv"
>

const Player = () => {
  const params = useParams<"nickname">()

  const [recordResult] = useQuery({
    query: DxIntlRecordWithScoresDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [songsResult] = useQuery({ query: DxIntlSongsDocument })

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
  const record = player.dx_intl_record

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
