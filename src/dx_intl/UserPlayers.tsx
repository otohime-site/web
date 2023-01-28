import AddIcon from "@mui/icons-material/Add"
import { Button, List } from "@mui/material"
import { FunctionComponent } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useQuery } from "urql"
import { useAuth } from "../auth"
import { QueryResult } from "../common/components/QueryResult"
import { DxIntlPlayersForUserDocument } from "../generated/graphql"
import PlayerListItem from "./PlayerListItem"

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
        <List>
          {players.map((p) => (
            <PlayerListItem key={p.id} player={p} addLink />
          ))}
        </List>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <Button
        component={RouterLink}
        to="/dxi/p/new"
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
      >
        新增成績單
      </Button>
    </QueryResult>
  )
}

export default UserPlayers
