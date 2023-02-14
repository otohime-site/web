import { formatDistance } from "date-fns"
import zhTW from "date-fns/locale/zh-TW"
import { MdLock, MdPublic } from "react-icons/md"
import { DxIntlPlayersQuery, Dx_Intl_Records } from "../generated/graphql"
import { gradeNames } from "./models/constants"

const courseRankNames = [
  "初心者",
  "初段",
  "二段",
  "三段",
  "四段",
  "五段",
  "六段",
  "七段",
  "八段",
  "九段",
  "十段",
  "", // intentionally left blank
  "真初段",
  "真二段",
  "真三段",
  "真四段",
  "真五段",
  "真六段",
  "真七段",
  "真八段",
  "真九段",
  "真十段",
  "真皆伝",
] as const

const classRankNames = [
  "B5",
  "B4",
  "B3",
  "B2",
  "B1",
  "A5",
  "A4",
  "A3",
  "A2",
  "A1",
  "S5",
  "S4",
  "S3",
  "S2",
  "S1",
  "SS5",
  "SS4",
  "SS3",
  "SS2",
  "SS1",
  "SSS5",
  "SSS4",
  "SSS3",
  "SSS2",
  "SSS1",
  "LEGEND",
]

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

const formatUpdatedAt = (
  player: DxIntlPlayersQuery["dx_intl_players"][0]
): string =>
  player.updated_at != null
    ? formatDistance(new Date(player.updated_at), new Date(), {
        locale: zhTW,
      })
    : "?"

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
                  /{" "}
                  {formatDistance(new Date(player.created_at), new Date(), {
                    locale: zhTW,
                  })}
                  前建立
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
                  {` / ${formatUpdatedAt(player)} 前更新`}
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
