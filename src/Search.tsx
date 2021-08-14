import styled from "@emotion/styled"
import { InputBase } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import WarningIcon from "@material-ui/icons/Warning"
import { Autocomplete, AutocompleteChangeReason } from "@material-ui/lab"
import React, { FunctionComponent, useState } from "react"
import firebase from "firebase/app"
import { useQuery } from "urql"
import { useHistory } from "react-router"
import { useAuth } from "./auth"

import {
  DxIntlPlayersWithKeywordAnonymousDocument,
  DxIntlPlayersWithKeywordUserDocument,
} from "./generated/graphql"
import PlayerListItem from "./dx_intl/PlayerListItem"

const SearchContainer = styled("div")`
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: white;
  margin-left: ${(props) => props.theme.spacing(4)}px;
  width: auto;
  position: relative;
  ${(props) => props.theme.breakpoints.down("xs")} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    margin: ${(props) => props.theme.spacing(1)}px;
    .MuiAutocomplete-root {
      flex-grow: 1;
    }
  }
  &:hover {
    background-color: #fafafa;
  }
`

const SearchIconHolder = styled("div")`
  position: absolute;
  top: 5px;
  left: 8px;
  color: #cccccc;
`

const StyledInputBase = styled(InputBase)`
  display: flex;
  padding-left: 36px;
  input {
    padding: ${(props) => props.theme.spacing(1, 1, 1, 0)};
    width: 16em;
  }
`

const escapeForLike = (keyword: string): string =>
  keyword.replace(/%/g, "\\%").replace(/_/g, "\\_")

const Search: FunctionComponent<{
  hideSearch: () => void
  shouldAutoFocus: boolean
}> = ({ hideSearch, shouldAutoFocus }) => {
  const [user] = useAuth(firebase.auth())
  const history = useHistory()
  const [keyword, setKeyword] = useState("")
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

  const onItemChange = (
    _: React.ChangeEvent<{}>,
    value: string | typeof options[0],
    reason: AutocompleteChangeReason
  ): void => {
    if (typeof value === "string" || reason !== "select-option") {
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
        renderOption={(option) => (
          <PlayerListItem player={option} forAutoComplete={true} />
        )}
      />
    </SearchContainer>
  )
}

export default Search
