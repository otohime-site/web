import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { formatDate } from "../../common/utils/datetime"
import { ResultOf } from "../../graphql"
import { finaleRecordsFields } from "../models/fragments"
import Class from "./Class"
import Rating from "./Rating"
import classes from "./Record.module.css"

const Record = ({
  record,
  updatedAt,
  isPrivate,
}: {
  record: ResultOf<typeof finaleRecordsFields>
  updatedAt?: string | null
  isPrivate: boolean
}) => (
  <div>
    <div className={classes["info-row"]}>
      <Rating rating={record.rating} />
      {record.max_rating >= 0 ? `(Max: ${record.max_rating})` : ""}
      {record.class != null ? <Class rawClass={record.class} /> : ""}
    </div>
    <div className={classes["info-row"]}>
      <div className={classes["card-name"]}>{record.card_name}</div>
    </div>
    <div className={classes.title} title={record.title}>
      {record.title}
    </div>
    <div className={classes["info-row"]}>
      {updatedAt != null ? formatDate(new Date(updatedAt)) : ""}
      更新
      {isPrivate ? <IconLock /> : <IconPublic />}
    </div>
  </div>
)

export default Record
