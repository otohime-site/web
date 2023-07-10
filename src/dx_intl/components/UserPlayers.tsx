import { useQuery } from "urql"
import IconAdd from "~icons/mdi/add"
import { QueryResult } from "../../common/components/QueryResult"
import { LinkButton } from "../../common/components/ui/Button"
import { useUser } from "../../common/contexts"
import { getFragmentData, graphql } from "../../gql"
import { dxIntlPlayersFields } from "../models/fragments"
import PlayerItem from "./PlayerItem"

const dxIntlPlayersForUserDocument = graphql(`
  query dxIntlPlayersForUser($userId: String!) {
    dx_intl_players(where: { user_id: { _eq: $userId } }) {
      ...dxIntlPlayersFields
    }
  }
`)

const UserPlayers = () => {
  const user = useUser()
  const [playersResult] = useQuery({
    query: dxIntlPlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = getFragmentData(
    dxIntlPlayersFields,
    playersResult.data?.dx_intl_players
  )

  if (user == null) {
    return <></>
  }
  return (
    <QueryResult result={playersResult}>
      {players != null && players.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {players.map((p) => (
            <LinkButton color="mauve" key={p.id} href={`~/dxi/p/${p.nickname}`}>
              <PlayerItem player={p} />
            </LinkButton>
          ))}
        </div>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <LinkButton href="~/dxi/p/new" color="violet">
        <IconAdd />
        新增成績單
      </LinkButton>
    </QueryResult>
  )
}

export default UserPlayers
