import { FunctionComponent } from "react"
import { MdAdd } from "react-icons/md"
import { useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import { LinkButton } from "../../common/components/ui/Button"
import { useUser } from "../../common/contexts"
import { DxIntlPlayersForUserDocument } from "../../generated/graphql"
import PlayerItem from "./PlayerItem"

const UserPlayers: FunctionComponent = () => {
  const user = useUser()
  const [playersResult] = useQuery({
    query: DxIntlPlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = playersResult.data?.dx_intl_players

  if (user == null) {
    return <></>
  }
  return (
    <QueryResult result={playersResult}>
      {players != null && players.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {players.map((p) => (
            <LinkButton color="mauve" key={p.id} to={`/dxi/p/${p.nickname}`}>
              <PlayerItem player={p} />
            </LinkButton>
          ))}
        </div>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <LinkButton to="/dxi/p/new" color="violet">
        <MdAdd />
        新增成績單
      </LinkButton>
    </QueryResult>
  )
}

export default UserPlayers
