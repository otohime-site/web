import { Tooltip, Typography } from "@material-ui/core"
import React, { FunctionComponent } from "react"

import PublicIcon from "@material-ui/icons/Public"
import LockIcon from "@material-ui/icons/Lock"
import styled from "@emotion/styled"

import { formatDistance } from "date-fns"
import { zhTW } from "date-fns/locale"

import { Dx_Intl_Records } from "../generated/graphql"
import Grade from "./Grade"
import Rating from "./Rating"
import { classRankNames, courseRankNames } from "./Ranks"

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
  font-weight: bold;
  font-family: "Kosugi Maru";
`

const Title = styled("div")`
  width: 22em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 0.4em;
  border: 0.1em solid;
  color: white;
  -webkit-text-stroke: 0.06em #000000;
  font-weight: bold;
  font-family: "Kosugi Maru";
  margin-bottom: 0.5em;
  &.normal {
    background: linear-gradient(
      #f9f9f9 0%,
      #f9f9f9 60%,
      #dadada 60%,
      #dadada 100%
    );
    border-color: #b8b8b8;
    box-shadow: 0 0.2em #666666;
  }
  &.bronze {
    background: linear-gradient(
      #fb9966 0%,
      #fb9966 60%,
      #dd7733 60%,
      #dd7733 100%
    );
    border-color: #b8b8b8;
    box-shadow: 0 0.2em #803300;
  }
  &.silver {
    background: linear-gradient(
      #e3e3f0 0%,
      #e3e3f0 60%,
      #96b6e3 60%,
      #96b6e3 100%
    );
    border-color: #b6d3f3;
    box-shadow: 0 0.2em #3333aa;
  }
  &.gold {
    background: linear-gradient(
      #ffdf4b 0%,
      #ffdf4b 60%,
      #fabf00 60%,
      #faba00 100%
    );
    border-color: #ffe366;
    box-shadow: 0 0.2em #bb3e00;
  }
  &.rainbow {
    background-image: linear-gradient(
        to right,
        #fdc9aa 0%,
        #fdc9aa 5%,
        #fdcea9 7%,
        #fdfd9c 16%,
        #fdfd92 28%,
        #fdfd92 40%,
        #fdfd94 41%,
        #ecfd98 43%,
        #e1fd9f 44%,
        #ddfda7 46%,
        #ddfdc6 48%,
        #ddfdf5 51%,
        #ddfdfd 52%,
        #ddfdfd 66%,
        #e7fdfd 68%,
        #fdfdfd 71%,
        #fdfdfd 75%,
        #fdebfd 78%,
        #fde4fd 80%,
        #fde4fd 87%,
        #fdedfd 91%,
        #e1f5fd 97%,
        #dff6fd 100%
      ),
      linear-gradient(
        to right,
        #faaa8b 0%,
        #faaa8b 4%,
        #faaf8a 5%,
        #fae87b 16%,
        #fafa77 21%,
        #fafa73 27%,
        #fafa73 38%,
        #e7fa73 39%,
        #cdfa79 42%,
        #befa86 45%,
        #befa93 46%,
        #befab7 49%,
        #befad6 51%,
        #befafa 57%,
        #befafa 65%,
        #c8fafa 68%,
        #dcfafa 70%,
        #f9e4fa 74%,
        #faccfa 78%,
        #fac5fa 80%,
        #fac6fa 87%,
        #c8d4fa 95%,
        #c0d7fa 98%,
        #c0d7fa 100%
      ),
      repeating-linear-gradient(
        rgba(128, 128, 128, 0.5) 0%,
        rgba(128, 128, 128, 0.5) 100%
      ),
      repeating-linear-gradient(
        300deg,
        #7adef9 0%,
        #7adef9 27.6%,
        #bdf340 27.6%,
        #bdf340 47.6%,
        #ffed6e 47.6%,
        #ffed6e 67.6%,
        #ffd360 67.6%,
        #ffd360 87.6%,
        #ff6e53 87.6%,
        #ff6e53 100%
      );
    background-position: left top, left bottom, left bottom, 0;
    background-repeat: no-repeat, no-repeat, no-repeat, repeat;
    background-origin: content-box, content-box, border-box, border-box;
    background-clip: content-box, content-box, border-box, border-box;
    background-size: auto 50%, auto 50%, auto 0.2em, 19em auto;
    border-color: transparent;
    border-bottom-width: 0.3em;
    margin-bottom: 0.3em;
  }
`

const AlignedTypo = styled(Typography)`
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
        <div>
          {courseRankNames[record.course_rank]} /{" "}
          {classRankNames[record.class_rank]}
        </div>
      ) : (
        ""
      )}
    </Subtitle>
    <Tooltip title={record.title}>
      <Title className={record.trophy}>{record.title}</Title>
    </Tooltip>
  </div>
)

export default Record
