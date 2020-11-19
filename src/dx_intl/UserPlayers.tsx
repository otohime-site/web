import firebase from 'firebase/app'
import React, { FunctionComponent } from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useQuery } from 'urql'
import { useAuth } from '../auth'
import { DxIntlPlayersDocument } from '../generated/graphql'
import { QueryResult } from '../QueryResult'
import { Link as RouterLink } from 'react-router-dom'

const UserPlayers: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [playersResult] = useQuery({query: DxIntlPlayersDocument, variables: { userId: user?.uid }})
  const players = playersResult.data?.dx_intl_players

  if (user == null) { return <></> }
  return (
    <QueryResult result={playersResult}>
      {(players != null && players.length > 0)
        ? players.map(p => p.nickname)
        : '目前沒有玩家紀錄。請新增一個！'
      }
      <Button component={RouterLink} to='/dxi/up/new' variant='contained' color='secondary' startIcon={<AddIcon />}>新增玩家</Button>
    </QueryResult>
  ) 
}

export default UserPlayers
