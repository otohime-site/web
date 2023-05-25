import { useQuery } from "urql"
import { useUser } from "../common/contexts"
import { FinalePlayersForUserDocument } from "../generated/graphql"

const FinaleIndexComponent = () => {
  const user = useUser()
  const [playersResult] = useQuery({
    query: FinalePlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = playersResult.data?.finale_players
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
