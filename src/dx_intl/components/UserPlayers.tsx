import { ListBox, ListBoxItem } from "react-aria-components"
import { useQuery } from "urql"
import { navigate } from "wouter/use-browser-location"
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
    playersResult.data?.dx_intl_players,
  )

  if (user == null) {
    return <></>
  }
  return (
    <QueryResult result={playersResult}>
      {players != null && players.length > 0 ? (
        <ListBox
          selectionMode="single"
          onSelectionChange={(keys) => {
            if (keys !== "all") {
              const nickname = keys.values().next().value
              if (nickname) {
                navigate(`/dxi/p/${nickname}`)
              }
            }
          }}
        >
          {players.map((player) => (
            <ListBoxItem
              href={`/dxi/p/${player.nickname}`}
              key={player.id}
              id={player.nickname}
            >
              <PlayerItem player={player} />
            </ListBoxItem>
          ))}
        </ListBox>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <LinkButton href="/dxi/p/new">
        <IconAdd />
        新增成績單
      </LinkButton>
    </QueryResult>
  )
}
export default UserPlayers
