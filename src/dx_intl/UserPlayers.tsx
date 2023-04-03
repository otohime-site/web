import { FunctionComponent } from "react"
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"
import { useQuery } from "urql"
import { useAuth } from "../auth"
import { QueryResult } from "../common/components/QueryResult"
import { LinkButton } from "../common/components/ui/Button"
import { DxIntlPlayersForUserDocument } from "../generated/graphql"
import PlayerListItemNew from "./PlayerListItemNew"

const UserPlayers: FunctionComponent = () => {
  const [user, loading] = useAuth()
  const [playersResult] = useQuery({
    query: DxIntlPlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = playersResult.data?.dx_intl_players

  if (loading || user == null) {
    return <></>
  }
  return (
    <QueryResult result={playersResult}>
      {players != null && players.length > 0 ? (
        <ul>
          {players.map((p) => (
            <li key={p.id}>
              <Link to={`/dxi/p/${p.nickname}`}>
                <PlayerListItemNew player={p} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <LinkButton to="/dxi/p/new" variant="violet">
        <MdAdd />
        新增成績單
      </LinkButton>
    </QueryResult>
  )
}

export default UserPlayers
