import clsx from "clsx"
import { useLayoutEffect, useRef } from "react"
import { ResultOf } from "../../graphql"
import { dxIntlRecordsFields } from "../models/fragments"
import Grade from "./Grade"
import { ClassRank, CourseRank } from "./Ranks"
import Rating from "./Rating"
import classes from "./Record.module.css"

const Record = ({
  record,
  condensed = false,
}: {
  record: ResultOf<typeof dxIntlRecordsFields>
  // Compact variant hides the title once the top bar becomes sticky.
  condensed?: boolean
}) => {
  const titleRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (titleRef.current) {
      const content = titleRef.current.querySelector("span") as HTMLElement
      if (content) {
        content.style.animationDuration = `${
          content.clientWidth > titleRef.current.clientWidth
            ? Math.round(
                (content.clientWidth / titleRef.current.clientWidth) * 5,
              )
            : 0
        }s`
      }
    }
  }, [record.title, condensed])

  return (
    <div className={clsx(classes.record, condensed && classes.condensed)}>
      <div className={classes["primary-row"]}>
        <Rating rating={record.rating} legacy={record.rating_legacy} />
        <div className={classes["card-name"]}>{record.card_name}</div>
      </div>
      {condensed ? null : (
        <div className={classes["secondary-row"]}>
          <div
            ref={titleRef}
            className={clsx(classes.title, classes[record.trophy])}
            title={record.title}
          >
            <span>{record.title}</span>
          </div>
          <div className={classes.ranks}>
            {record.class_rank != null ? (
              <ClassRank classRank={record.class_rank} />
            ) : null}
            {record.course_rank != null ? (
              <CourseRank courseRank={record.course_rank} />
            ) : null}
            {record.class_rank == null &&
            record.course_rank == null &&
            record.grade != null ? (
              <Grade grade={record.grade} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default Record
