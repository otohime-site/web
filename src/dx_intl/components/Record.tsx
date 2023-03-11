import { formatDistance } from "date-fns"
import { zhTW } from "date-fns/locale"
import { MdLock, MdPublic } from "react-icons/md"
import { Dx_Intl_Records } from "../../generated/graphql"
import Grade from "./Grade"
import { ClassRank, CourseRank } from "./Ranks"
import Rating from "./Rating"
import classes from "./Record.module.css"

const Record = ({
  record,
  isPrivate,
  updatedAt,
}: {
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
}) => (
  <div>
    <div className={classes["info-row"]}>
      <Rating rating={record.rating} legacy={record.rating_legacy} />
      <div className={classes["inner-col"]}>
        {updatedAt != null
          ? formatDistance(new Date(updatedAt), new Date(), {
              locale: zhTW,
            })
          : ""}
        前更新
        {isPrivate ? <MdLock /> : <MdPublic />}
      </div>
    </div>
    <div className={classes["info-row"]}>
      <div className={classes["card-name"]}>{record.card_name}</div>
      {record.max_rating >= 0 ? `(Max: ${record.max_rating})` : ""}
      {record.grade != null ? <Grade grade={record.grade} /> : ""}
      {record.course_rank != null && record.class_rank != null ? (
        <div className={classes["inner-col"]}>
          <CourseRank courseRank={record.course_rank} />
          <ClassRank classRank={record.class_rank} />
        </div>
      ) : (
        ""
      )}
    </div>
    <div
      className={`${classes.title} ${classes[record.trophy]}`}
      title={record.title}
    >
      {record.title}
    </div>
  </div>
)

export default Record
