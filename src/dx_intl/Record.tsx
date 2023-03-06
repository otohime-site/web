import LockIcon from "@mui/icons-material/Lock"
import PublicIcon from "@mui/icons-material/Public"
import { Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { formatDistance } from "date-fns"
import { zhTW } from "date-fns/locale"
import { FunctionComponent } from "react"
import { Dx_Intl_Records } from "../generated/graphql"
import Grade from "./Grade"
import classes from "./pages/Record.module.css"
import { ClassRank, CourseRank } from "./Ranks"
import Rating from "./Rating"

const Subtitle = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 22em;
`

const CardName = styled("div")`
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  width: 9em;
  background: white;
  border: 0.1em solid #cccccc;
  border-radius: 0.2em;
  font-size: 133%;
  font-weight: 800;
  font-family: "M PLUS Rounded 1c";
`

const AlignedTypo = styled(Typography)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AlignedDiv = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Record: FunctionComponent<{
  record: Pick<
    Dx_Intl_Records,
    | "card_name"
    | "title"
    | "trophy"
    | "rating"
    | "rating_legacy"
    | "max_rating"
    | "grade"
    | "course_rank"
    | "class_rank"
  >
  isPrivate: boolean
  updatedAt: string | null | undefined
}> = ({ record, isPrivate, updatedAt }) => (
  <div>
    <Subtitle>
      <Rating rating={record.rating} legacy={record.rating_legacy} />
      <AlignedTypo variant="body2">
        {updatedAt != null
          ? formatDistance(new Date(updatedAt), new Date(), {
              locale: zhTW,
            })
          : ""}
        前更新
        {isPrivate ? <LockIcon /> : <PublicIcon />}
      </AlignedTypo>
    </Subtitle>
    <Subtitle>
      <CardName>{record.card_name}</CardName>
      {record.max_rating >= 0 ? `(Max: ${record.max_rating})` : ""}
      {record.grade != null ? <Grade grade={record.grade} /> : ""}
      {record.course_rank != null && record.class_rank != null ? (
        <AlignedDiv>
          <CourseRank courseRank={record.course_rank} />
          <ClassRank classRank={record.class_rank} />
        </AlignedDiv>
      ) : (
        ""
      )}
    </Subtitle>
    <Tooltip title={record.title}>
      <div className={`${classes.title} ${classes[record.trophy]}`}>
        {record.title}
      </div>
    </Tooltip>
  </div>
)

export default Record
