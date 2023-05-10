import { MdLock, MdPublic } from "react-icons/md"
import { formatRelative } from "../../common/utils"
import {
  DxIntlPlayersForUserQuery,
  Dx_Intl_Records,
} from "../../generated/graphql"
import {
  classRankNames,
  gradeNames,
  legacyCourseRankNames,
} from "../models/constants"
import classes from "./PlayerItem.module.scss"

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
  player: DxIntlPlayersForUserQuery["dx_intl_players"][0]
): string =>
  player.updated_at != null ? formatRelative(new Date(player.updated_at)) : "?"

const PlayerItem = ({
  player,
  forAutoComplete,
}: {
  player: DxIntlPlayersForUserQuery["dx_intl_players"][0]
  selected?: boolean
  forAutoComplete?: boolean
  onSelect?: (id: number) => void
}) => {
  return (
    <div className={classes["player-item"]}>
      <div>
        <p>{player.nickname}</p>
        <p>
          {player.dx_intl_record == null ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </p>
      </div>
      {player.private ? <MdLock /> : <MdPublic />}
    </div>
  )
}

export default PlayerItem
