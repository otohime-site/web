import clsx from "clsx"
import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { formatRelative } from "../../common/utils/datetime"
import { ResultOf } from "../../graphql"
import { dxIntlRecordsFields } from "../models/fragments"
import Grade from "./Grade"
import { ClassRank, CourseRank } from "./Ranks"
import Rating from "./Rating"
import classes from "./Record.module.css"

const Record = ({
  record,
  updatedAt,
  isPrivate,
}: {
  record: ResultOf<typeof dxIntlRecordsFields>
  updatedAt?: string | null
  isPrivate: boolean
}) => (
  <div>
    <div className={classes["info-row"]}>
      <Rating rating={record.rating} legacy={record.rating_legacy} />
      <span>
        {updatedAt != null ? formatRelative(new Date(updatedAt)) : ""}
        更新
        {isPrivate ? <IconLock /> : <IconPublic />}
      </span>
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
      className={clsx(classes.title, classes[record.trophy])}
      title={record.title}
    >
      {record.title}
    </div>
  </div>
)

export default Record
