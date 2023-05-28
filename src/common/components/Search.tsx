import { useState } from "react"
import { useQuery } from "urql"
import { graphql } from "../../gql"
import { useUser } from "../contexts"

const dxIntlPlayersWithKeywordAnonymousDocument = graphql(`
  query dxIntlPlayersWithKeywordAnonymous($nickname_like: String!) {
    other_players: dx_intl_players(
      where: { nickname: { _ilike: $nickname_like }, dx_intl_record: {} }
      order_by: { nickname: asc }
      limit: 10
    ) {
      ...dxIntlPlayersFields
    }
  }
`)
const dxIntlPlayersWithKeywordUserDocument = graphql(`
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
`)

const escapeForLike = (keyword: string): string =>
  keyword.replace(/%/g, "\\%").replace(/_/g, "\\_")

const Search = () => {
  const user = useUser()
  // const navigate = useNavigate()
  const [keyword] = useState("")
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
    keyword.length === 0
      ? []
      : [
          ...(userPlayers ?? []).map((player) => ({
            ...player,
            from: "你的成績單",
          })),
          ...(otherPlayers ?? []).map((player) => ({
            ...player,
            from: "大家的成績單",
          })),
        ]

  console.log(hasError)
  console.log(options)

  return <></>
}

export default Search
