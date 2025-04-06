import { useState } from "react"
import {
  Collection,
  ComboBox,
  FieldError,
  Header,
  Input,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
} from "react-aria-components"
import { useQuery } from "urql"
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
  const options =
    keyword.length === 0 ||
    (userPlayers ?? []).length + (otherPlayers ?? []).length === 0
      ? []
      : [
          {
            name: "你的成績單",
            id: "user",
            children: readFragment(dxIntlPlayersFields, userPlayers ?? []),
          },

          {
            name: "大家的成績單",
            id: "others",
            children: readFragment(dxIntlPlayersFields, otherPlayers ?? []),
          },
        ]

  return (
    <ComboBox
      items={options}
      inputValue={keyword}
      onInputChange={setKeyword}
      allowsCustomValue
    >
      <div>
        <Input placeholder="搜尋玩家暱稱..." />
      </div>
      <FieldError>{hasError ? "搜尋發生錯誤。" : undefined}</FieldError>
      <Popover>
        <ListBox>
          {(section: (typeof options)[number]) => (
            <ListBoxSection id={section.id}>
              {section.children.length > 0 ? (
                <>
                  <Header>{section.name}</Header>
                  <Collection items={section.children}>
                    {(item) => (
                      <ListBoxItem
                        id={item.id}
                        href={`/dxi/p/${item.nickname}`}
                      >
                        <PlayerItem player={item} />
                      </ListBoxItem>
                    )}
                  </Collection>
                </>
              ) : null}
            </ListBoxSection>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  )
}

export default Search
