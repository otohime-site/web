import { useQuery } from "urql"
import { useUser } from "../common/contexts"
import { getFragmentData, graphql } from "../gql"
import { finalePlayersFields } from "./models/fragments"

const finalePlayersForUserDocument = graphql(`
  query finalePlayersForUser($userId: String!) {
    finale_players(where: { user_id: { _eq: $userId } }) {
      ...finalePlayersFields
    }
  }
`)

const FinaleIndexComponent = () => {
  const user = useUser()
  const [playersResult] = useQuery({
    query: finalePlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = getFragmentData(
    finalePlayersFields,
    playersResult.data?.finale_players,
  )
  if (user == null) {
    return <>Please log in</>
  }
  if (players == null) {
    return <>No Finale Players</>
  }

  return (
    <>
      {players.map((player) => {
        const record = player.finale_record

        return (
          <p key={player.id} style={{ background: "#CCCCCC", margin: "3px" }}>
            {player.nickname} / {player.private ? "Private" : "Public"} /
            {record ? `${record.card_name} / ${record.rating}` : "No record"}
          </p>
        )
      })}
    </>
  )
}

export default FinaleIndexComponent
