import styled from "@emotion/styled"
import { ListItemText, ListItem, ListItemIcon } from "@material-ui/core"
import { FunctionComponent } from "react"
import { Link as RouterLink } from "react-router-dom"
import PublicIcon from "@material-ui/icons/Public"
import LockIcon from "@material-ui/icons/Lock"
import { formatDistance } from "date-fns"
import { zhTW } from "date-fns/locale"
import { DxIntlPlayersQuery, Dx_Intl_Records } from "../generated/graphql"
import { gradeNames } from "./Grade"
import { courseRankNames, classRankNames } from "./Ranks"

const getGradeOrRanks = (
  record: Pick<Dx_Intl_Records, "grade" | "course_rank" | "class_rank">
): string => {
  if (record.grade != null) {
    return gradeNames[record.grade] ?? ""
  }
  if (record.course_rank != null && record.class_rank != null) {
    const courseRepr = courseRankNames[record.course_rank] ?? ""
    const classRepr = classRankNames[record.class_rank] ?? ""
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${courseRepr} ${classRepr}`
  }
  // It should not happen but TypeScript won't know it
  return ""
}

const StyledListItem = styled(ListItem)`
  &.for-autocomplete {
    padding: 0;
    margin-left: -8px;
    .MuiListItemIcon-root {
      min-width: 40px;
    }
  }
  &.for-autocomplete:hover {
    background: transparent;
  }
`

const Description = styled("span")`
  font-size: 90%;
  color: ${(props) => props.theme.palette.text.secondary};
`

const formatUpdatedAt = (
  player: DxIntlPlayersQuery["dx_intl_players"][0]
): string =>
  player.updated_at != null
    ? formatDistance(new Date(player.updated_at), new Date(), {
        locale: zhTW,
      })
    : "?"

const PlayerListItem: FunctionComponent<{
  player: DxIntlPlayersQuery["dx_intl_players"][0]
  selected?: boolean
  addLink?: boolean
  forAutoComplete?: boolean
  onSelect?: (id: number) => void
}> = ({ player, selected, addLink, forAutoComplete, onSelect }) => {
  const handleSelect = (): void => {
    if (onSelect != null) onSelect(player.id)
  }
  const props =
    addLink ?? false
      ? {
          component: RouterLink,
          to: `/dxi/p/${player.nickname}`,
        }
      : {}
  return (
    <StyledListItem
      button
      selected={selected}
      onClick={handleSelect}
      className={forAutoComplete ?? false ? "for-autocomplete" : undefined}
      {...props}
    >
      <ListItemIcon>
        {player.private ? <LockIcon /> : <PublicIcon />}
      </ListItemIcon>
      <ListItemText
        primary={player.nickname}
        secondary={
          player.dx_intl_record == null ? (
            <Description>
              尚無紀錄
              {forAutoComplete ?? false ? (
                <></>
              ) : (
                <>
                  {" "}
                  /{" "}
                  {formatDistance(new Date(player.created_at), new Date(), {
                    locale: zhTW,
                  })}
                  前建立
                </>
              )}
            </Description>
          ) : (
            <Description>
              {player.dx_intl_record.card_name}
              {forAutoComplete ?? false ? (
                <></>
              ) : (
                <>
                  / {player.dx_intl_record.rating}{" "}
                  {getGradeOrRanks(player.dx_intl_record)}
                  {` / ${formatUpdatedAt(player)} 前更新`}
                </>
              )}
            </Description>
          )
        }
      />
    </StyledListItem>
  )
}

export default PlayerListItem
