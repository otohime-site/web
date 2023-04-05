import { MdLock, MdPublic } from "react-icons/md"
import { formatRelative } from "../../common/utils"
import { DxIntlPlayersQuery, Dx_Intl_Records } from "../../generated/graphql"
import {
  classRankNames,
  gradeNames,
  legacyCourseRankNames,
} from "../models/constants"

const getGradeOrRanks = (
  record: Pick<Dx_Intl_Records, "grade" | "course_rank" | "class_rank">
): string => {
  if (record.grade != null) {
    return gradeNames[record.grade] ?? ""
  }
  if (record.course_rank != null && record.class_rank != null) {
    const courseRepr = legacyCourseRankNames[record.course_rank] ?? ""
    const classRepr = classRankNames[record.class_rank] ?? ""
    return `${courseRepr} ${classRepr}`
  }
  // It should not happen but TypeScript won't know it
  return ""
}

const formatUpdatedAt = (
  player: DxIntlPlayersQuery["dx_intl_players"][0]
): string =>
  player.updated_at != null ? formatRelative(new Date(player.updated_at)) : "?"

const PlayerListItemNew = ({
  player,
  selected,
  forAutoComplete,
  onSelect,
}: {
  player: DxIntlPlayersQuery["dx_intl_players"][0]
  selected?: boolean
  forAutoComplete?: boolean
  onSelect?: (id: number) => void
}) => {
  const handleSelect = (): void => {
    if (onSelect != null) onSelect(player.id)
  }
  return (
    <div onClick={handleSelect}>
      <div>{player.private ? <MdLock /> : <MdPublic />}</div>
      <div>
        {player.nickname}
        <div>
          {player.dx_intl_record == null ? (
            <div>
              尚無紀錄
              {forAutoComplete ?? false ? (
                <></>
              ) : (
                <>
                  {" "}
                  / {formatRelative(new Date(player.created_at))}
                  建立
                </>
              )}
            </div>
          ) : (
            <div>
              {player.dx_intl_record.card_name}
              {forAutoComplete ?? false ? (
                <></>
              ) : (
                <>
                  / {player.dx_intl_record.rating}{" "}
                  {getGradeOrRanks(player.dx_intl_record)}
                  {` / ${formatUpdatedAt(player)}更新`}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerListItemNew
