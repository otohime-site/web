import LockIcon from "@mui/icons-material/Lock"
import PublicIcon from "@mui/icons-material/Public"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { styled } from "@mui/material/styles"
import { formatDistance, zhTW } from "date-fns"
import { FunctionComponent } from "react"
import { Link as RouterLink } from "react-router-dom"
import { DxIntlPlayersQuery, Dx_Intl_Records } from "../generated/graphql"
import { gradeNames } from "./models/constants"
import { classRankNames, courseRankNames } from "./Ranks"

const getGradeOrRanks = (
  record: Pick<Dx_Intl_Records, "grade" | "course_rank" | "class_rank">
): string => {
  if (record.grade != null) {
    return gradeNames[record.grade] ?? ""
  }
  if (record.course_rank != null && record.class_rank != null) {
    const courseRepr = courseRankNames[record.course_rank] ?? ""
    const classRepr = classRankNames[record.class_rank] ?? ""
    return `${courseRepr} ${classRepr}`
  }
  // It should not happen but TypeScript won't know it
  return ""
}

const StyledListItemButton = styled(ListItemButton)`
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

const Description = styled("span")(
  ({ theme }) => `
  font-size: 90%;
  color: ${theme.palette.text.secondary};
`
)

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
    <StyledListItemButton
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
    </StyledListItemButton>
  )
}

export default PlayerListItem
