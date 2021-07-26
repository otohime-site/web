import firebase from "firebase/app"
import React, { FunctionComponent } from "react"
import { Button, List } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useQuery } from "urql"
import { Link as RouterLink } from "react-router-dom"
import { useAuth } from "../auth"
import { DxIntlPlayersDocument } from "../generated/graphql"
import { QueryResult } from "../QueryResult"
import PlayerListItem from "./PlayerListItem"

const UserPlayers: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [playersResult] = useQuery({
    query: DxIntlPlayersDocument,
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
