import { ResultOf } from "@graphql-typed-document-node/core"
import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { formatRelative } from "../../common/utils/datetime"
import { dxIntlRecordsFields } from "../models/fragments"
import Grade from "./Grade"
import { ClassRank, CourseRank } from "./Ranks"
import Rating from "./Rating"
import classes from "./Record.module.css"

const Record = ({
  record,
  isPrivate,
  updatedAt,
}: {
  record: ResultOf<typeof dxIntlRecordsFields>
  isPrivate: boolean
  updatedAt: string | null | undefined
}) => (
  <div>
    <div className={classes["info-row"]}>
      <Rating rating={record.rating} legacy={record.rating_legacy} />
      <div className={classes["inner-col"]}>
        {updatedAt != null ? formatRelative(new Date(updatedAt)) : ""}
        更新
        {isPrivate ? <IconLock /> : <IconPublic />}
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
