import { ListBox, ListBoxItem } from "react-aria-components"
import { useQuery } from "urql"
import { navigate } from "wouter/use-browser-location"
import IconAdd from "~icons/mdi/add"
import PlayerItem from "../../common/components/PlayerItem"
import { QueryResult } from "../../common/components/QueryResult"
import { LinkButton } from "../../common/components/ui/Button"
import { useUser } from "../../common/contexts"
import { finalePlayersFields } from "../../finale/models/fragments"
import { graphql, readFragment } from "../../graphql"
import { dxIntlPlayersFields } from "../models/fragments"

const dxIntlPlayersForUserDocument = graphql(
  `
    query playersForUser($userId: String!) {
      dx_intl_players(where: { user_id: { _eq: $userId } }) {
        ...dxIntlPlayersFields
      }
      finale_players(where: { user_id: { _eq: $userId } }) {
        ...finalePlayersFields
      }
    }
  `,
  [dxIntlPlayersFields, finalePlayersFields],
)

const UserPlayers = () => {
  const user = useUser()
  const [playersResult] = useQuery({
    query: dxIntlPlayersForUserDocument,
    variables: { userId: user?.uid ?? "" },
    requestPolicy: "network-only",
  })
  const players = readFragment(
    dxIntlPlayersFields,
    playersResult.data?.dx_intl_players ?? [],
  )
  const finalePlayers = readFragment(
    finalePlayersFields,
    playersResult.data?.finale_players ?? [],
  )

  if (user == null) {
    return <></>
  }
  return (
    <QueryResult result={playersResult}>
      {players.length + finalePlayers.length > 0 ? (
        <ListBox
          selectionMode="single"
          onSelectionChange={(keys) => {
            if (keys !== "all") {
              const nickname = keys.values().next().value
              if (nickname) {
                navigate(`~/dxi/p/${nickname}`)
              }
            }
          }}
        >
          {players.map((player) => (
            <ListBoxItem
              href={`/dxi/p/${player.nickname}`}
              key={`dxi-${player.id}`}
              id={`dxi-${player.nickname}`}
            >
              <PlayerItem player={player} />
            </ListBoxItem>
          ))}

          {finalePlayers.map((player) => (
            <ListBoxItem
              href={`/fin/p/${player.nickname}`}
              key={`fin-${player.id}`}
              id={`fin-${player.nickname}`}
            >
              <PlayerItem player={player} />
            </ListBoxItem>
          ))}
        </ListBox>
      ) : (
        "目前沒有成績單。請新增一個！"
      )}
      <LinkButton href="~/dxi/p/new">
        <IconAdd />
        新增成績單
      </LinkButton>
    </QueryResult>
  )
}
export default UserPlayers
