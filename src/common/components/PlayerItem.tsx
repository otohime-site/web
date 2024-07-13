import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import {
  classRankNames,
  gradeNames,
  legacyCourseRankNames,
} from "../../dx_intl/models/constants"
import { dxIntlPlayersFields } from "../../dx_intl/models/fragments"
import { classNames } from "../../finale/models/constants"
import { finalePlayersFields } from "../../finale/models/fragments"
import { ResultOf } from "../../graphql"
import { formatRelative } from "../utils/datetime"
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
  player:
    | ResultOf<typeof dxIntlPlayersFields>
    | ResultOf<typeof finalePlayersFields>,
): string =>
  player.updated_at != null ? formatRelative(new Date(player.updated_at)) : "?"

const PlayerItem = ({
  player,
  forAutoComplete,
}: {
  player:
    | ResultOf<typeof dxIntlPlayersFields>
    | ResultOf<typeof finalePlayersFields>
  selected?: boolean
  forAutoComplete?: boolean
  onSelect?: (id: number) => void
}) => {
  const record =
    "dx_intl_record" in player ? player.dx_intl_record : player.finale_record
  return (
    <div className={classes["player-item"]}>
      {player.private ? <IconLock /> : <IconPublic />}
      <div>
        <p slot="label">{player.nickname}</p>
        <p slot="description">
          {"dx_intl_record" in player ? null : "舊版 maimai / "}
          {record == null ? (
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
              {record.card_name}
              {forAutoComplete ?? false ? (
                <></>
              ) : (
                <>
                  / {record.rating}{" "}
                  {"course_rank" in record ? getGradeOrRanks(record) : null}
                  {"class" in record
                    ? classNames[record.class.split("_")[0]]
                    : null}
                  {` / ${formatUpdatedAt(player)}更新`}
                </>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default PlayerItem
