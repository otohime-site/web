import { ResultOf } from "@graphql-typed-document-node/core"
import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { formatRelative } from "../../common/utils/datetime"
import {
  classRankNames,
  gradeNames,
  legacyCourseRankNames,
} from "../models/constants"
import { dxIntlPlayersFields } from "../models/fragments"
import classes from "./PlayerItem.module.css"

const getGradeOrRanks = (record: {
  grade?: number | null
  course_rank?: number | null
  class_rank?: number | null
}): string => {
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
  player: ResultOf<typeof dxIntlPlayersFields>
): string =>
  player.updated_at != null ? formatRelative(new Date(player.updated_at)) : "?"

const PlayerItem = ({
  player,
  forAutoComplete,
}: {
  player: ResultOf<typeof dxIntlPlayersFields>
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
      {player.private ? <IconLock /> : <IconPublic />}
    </div>
  )
}

export default PlayerItem
