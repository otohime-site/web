import { useState } from "react"
import { useQuery } from "urql"
import {
  DxIntlPlayersWithKeywordAnonymousDocument,
  DxIntlPlayersWithKeywordUserDocument,
} from "../../generated/graphql"
import { useUser } from "../contexts"

const escapeForLike = (keyword: string): string =>
  keyword.replace(/%/g, "\\%").replace(/_/g, "\\_")

const Search = () => {
  const user = useUser()
  // const navigate = useNavigate()
  const [keyword] = useState("")
  const [keywordAnonResult] = useQuery({
    query: DxIntlPlayersWithKeywordAnonymousDocument,
    variables: {
      nickname_like: `${escapeForLike(keyword)}%`,
    },
    pause: user != null || keyword.length === 0,
  })
  const [keywordUserResult] = useQuery({
    query: DxIntlPlayersWithKeywordUserDocument,
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
