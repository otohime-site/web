import { Combobox, createListCollection } from "@ark-ui/react/combobox"
import { Field } from "@ark-ui/react/field"
import { useState } from "react"
import { useQuery } from "urql"
import { Link } from "wouter"
import { dxIntlPlayersFields } from "../../dx_intl/models/fragments"
import { graphql, readFragment } from "../../graphql"
import { useUser } from "../contexts"
import PlayerItem from "./PlayerItem"

const dxIntlPlayersWithKeywordAnonymousDocument = graphql(
  `
    query dxIntlPlayersWithKeywordAnonymous($nickname_like: String!) {
      other_players: dx_intl_players(
        where: { nickname: { _ilike: $nickname_like }, dx_intl_record: {} }
        order_by: { nickname: asc }
        limit: 10
      ) {
        ...dxIntlPlayersFields
      }
    }
  `,
  [dxIntlPlayersFields],
)
const dxIntlPlayersWithKeywordUserDocument = graphql(
  `
    query dxIntlPlayersWithKeywordUser(
      $userId: String!
      $nickname_like: String!
    ) {
      user_players: dx_intl_players(
        where: {
          user_id: { _eq: $userId }
          nickname: { _ilike: $nickname_like }
          dx_intl_record: {}
        }
        order_by: { nickname: asc }
      ) {
        ...dxIntlPlayersFields
      }
      other_players: dx_intl_players(
        where: {
          user_id: { _neq: $userId }
          nickname: { _ilike: $nickname_like }
          dx_intl_record: {}
        }
        order_by: { nickname: asc }
        limit: 10
      ) {
        ...dxIntlPlayersFields
      }
    }
  `,
  [dxIntlPlayersFields],
)

const escapeForLike = (keyword: string): string =>
  keyword.replace(/%/g, "\\%").replace(/_/g, "\\_")

const Search = () => {
  const user = useUser()
  // const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const [keywordAnonResult] = useQuery({
    query: dxIntlPlayersWithKeywordAnonymousDocument,
    variables: {
      nickname_like: `${escapeForLike(keyword)}%`,
    },
    pause: user != null || keyword.length === 0,
  })
  const [keywordUserResult] = useQuery({
    query: dxIntlPlayersWithKeywordUserDocument,
    variables: {
      nickname_like: `${escapeForLike(keyword)}%`,
      userId: user?.uid ?? "",
    },
    pause: user == null || keyword.length === 0,
  })

  const hasError =
    user == null
      ? keywordAnonResult.error != null
      : keywordUserResult.error != null
  const userPlayers = user == null ? [] : keywordUserResult.data?.user_players
  const otherPlayers =
    user == null
      ? keywordAnonResult.data?.other_players
      : keywordUserResult.data?.other_players

  const collection = createListCollection({
    items: [
      ...readFragment(dxIntlPlayersFields, userPlayers ?? []).map((p) => ({
        ...p,
        type: "user",
      })),
      ...readFragment(dxIntlPlayersFields, otherPlayers ?? []).map((p) => ({
        ...p,
        type: "others",
      })),
    ],
    itemToValue: (p) => p.nickname,
    groupBy: (p) => p.type,
  })

  return (
    <Field.Root invalid={hasError}>
      <Combobox.Root
        collection={collection}
        onInputValueChange={(e) => {
          setKeyword(e.inputValue)
        }}
      >
        <Combobox.Control>
          <Combobox.Input placeholder="搜尋玩家暱稱..."></Combobox.Input>
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.group().map(([type, group]) => (
              <Combobox.ItemGroup key={type}>
                <Combobox.ItemGroupLabel>
                  {type == "user" ? "你的成績單" : "大家的成績單"}
                </Combobox.ItemGroupLabel>
                {group.map((item) => (
                  <Combobox.Item key={item.nickname} item={item} asChild>
                    <Link href={`/dxi/p/${item.nickname}`}>
                      <PlayerItem player={item} />
                    </Link>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
      <Field.ErrorText>
        {hasError ? "搜尋發生錯誤。" : undefined}
      </Field.ErrorText>
    </Field.Root>
  )
}

export default Search
