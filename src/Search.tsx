import SearchIcon from "@mui/icons-material/Search"
import WarningIcon from "@mui/icons-material/Warning"
import { Autocomplete, InputBase } from "@mui/material"
import { styled } from "@mui/material/styles"
import { AutocompleteChangeReason } from "@mui/material/useAutocomplete"
import { FunctionComponent, useState } from "react"
import { useHistory } from "react-router"
import { useQuery } from "urql"
import { useAuth } from "./auth"
import PlayerListItem from "./dx_intl/PlayerListItem"
import {
  DxIntlPlayersWithKeywordAnonymousDocument,
  DxIntlPlayersWithKeywordUserDocument,
} from "./generated/graphql"

const SearchContainer = styled("div")(
  ({ theme }) =>
    `
  display: flex;
  align-items: center;
  border-radius: ${theme.shape.borderRadius}px;
  background-color: white;
  width: auto;
  position: relative;
  margin-left: 32px;
  ${theme.breakpoints.down("sm")} {
    position: absolute;
    top: 0;
    left: 8px;
    right: 8px;
    margin-top: 4px;
    margin-left: 0;
    display: flex;
    margin: ${theme.spacing(1)}
    .MuiAutocomplete-root {
      flex-grow: 1;
    }
  }
  &:hover {
    background-color: #fafafa;
  }
`
)

const SearchIconHolder = styled("div")`
  position: absolute;
  top: 5px;
  left: 8px;
  color: #cccccc;
`

const StyledInputBase = styled(InputBase)(
  ({ theme }) =>
    `
  display: flex;
  padding-left: 36px;
  input {
    padding: ${theme.spacing(1, 1, 1, 0)};
    width: 16em;
  }
`
)

const escapeForLike = (keyword: string): string =>
  keyword.replace(/%/g, "\\%").replace(/_/g, "\\_")

const Search: FunctionComponent<{
  hideSearch: () => void
  shouldAutoFocus: boolean
}> = ({ hideSearch, shouldAutoFocus }) => {
  const [user, loading] = useAuth()
  const history = useHistory()
  const [keyword, setKeyword] = useState("")
  const [keywordAnonResult] = useQuery({
    query: DxIntlPlayersWithKeywordAnonymousDocument,
    variables: {
      nickname_like: `${escapeForLike(keyword)}%`,
    },
    pause: loading || user != null || keyword.length === 0,
  })
  const [keywordUserResult] = useQuery({
    query: DxIntlPlayersWithKeywordUserDocument,
    variables: {
      nickname_like: `${escapeForLike(keyword)}%`,
      userId: user?.uid ?? "",
    },
    pause: loading || user == null || keyword.length === 0,
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

  const onItemChange = (
    _: React.ChangeEvent<{}>,
    value: string | typeof options[0],
    reason: AutocompleteChangeReason
  ): void => {
    if (typeof value === "string") {
      return
    }
    history.push(`/dxi/p/${value.nickname}`)
  }

  const onInputChange = (_: React.ChangeEvent<{}>, value: string): void => {
    setKeyword(value)
  }

  return (
    <SearchContainer>
      <SearchIconHolder>
        {hasError ? <WarningIcon /> : <SearchIcon />}
      </SearchIconHolder>
      <Autocomplete
        freeSolo
        disableClearable
        options={options}
        getOptionLabel={(option) => ""}
        filterOptions={(option) => option}
        groupBy={(option) => option.from}
        onChange={onItemChange}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <StyledInputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            placeholder="搜尋玩家暱稱..."
            onBlur={hideSearch}
            autoFocus={shouldAutoFocus}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <PlayerListItem player={option} forAutoComplete={true} />
          </li>
        )}
      />
    </SearchContainer>
  )
}

export default Search
