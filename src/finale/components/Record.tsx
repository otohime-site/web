import IconLock from "~icons/mdi/lock"
import IconPublic from "~icons/mdi/public"
import { formatDate } from "../../common/utils/datetime"
import { ResultOf } from "../../graphql"
import { finaleRecordsFields } from "../models/fragments"
import Class from "./Class"
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
      {record.rating}
      <span>
        {updatedAt != null ? formatDate(new Date(updatedAt)) : ""}
        更新
        {isPrivate ? <IconLock /> : <IconPublic />}
      </span>
    </div>
    <div className={classes["info-row"]}>
      <div className={classes["card-name"]}>{record.card_name}</div>
      {record.max_rating >= 0 ? `(Max: ${record.max_rating})` : ""}
      {record.class != null ? <Class rawClass={record.class} /> : ""}
    </div>
    <div title={record.title}>{record.title}</div>
  </div>
)

export default Record
