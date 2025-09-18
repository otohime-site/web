import { createListCollection, Listbox } from "@ark-ui/react/listbox"
import { useQuery } from "urql"
import { Link } from "wouter"
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

  const collection = createListCollection({
    items: [
      ...players.map((p) => ({ ...p, type: "dxi" as const })),
      ...finalePlayers.map((p) => ({ ...p, type: "fin" as const })),
    ],
    itemToValue: (item) => `${item.type}-${item.nickname}`,
  })

  return (
    <QueryResult result={playersResult}>
      {players.length + finalePlayers.length > 0 ? (
        <Listbox.Root collection={collection}>
          <Listbox.Content>
            {collection.items.map((item) => (
              <Listbox.Item key={`${item.type}-${item.id}`} item={item}>
                <Listbox.ItemText asChild>
                  <Link href={`~/${item.type}/p/${item.nickname}`}>
                    <PlayerItem player={item} />
                  </Link>
                </Listbox.ItemText>
              </Listbox.Item>
            ))}
          </Listbox.Content>
        </Listbox.Root>
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
