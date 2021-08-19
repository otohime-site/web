import { FunctionComponent } from "react"
import styled from "@emotion/styled"

import course0 from "./course_ranks/0.svg"
import course1 from "./course_ranks/1.svg"
import course2 from "./course_ranks/2.svg"
import course3 from "./course_ranks/3.svg"
import course4 from "./course_ranks/4.svg"
import course5 from "./course_ranks/5.svg"
import course6 from "./course_ranks/6.svg"
import course7 from "./course_ranks/7.svg"
import course8 from "./course_ranks/8.svg"
import course9 from "./course_ranks/9.svg"
import course10 from "./course_ranks/10.svg"
import courseShin1 from "./course_ranks/shin1.svg"
import courseShin2 from "./course_ranks/shin2.svg"
import courseShin3 from "./course_ranks/shin3.svg"
import courseShin4 from "./course_ranks/shin4.svg"
import courseShin5 from "./course_ranks/shin5.svg"
import courseShin6 from "./course_ranks/shin6.svg"
import courseShin7 from "./course_ranks/shin7.svg"
import courseShin8 from "./course_ranks/shin8.svg"
import courseShin9 from "./course_ranks/shin9.svg"
import courseShin10 from "./course_ranks/shin10.svg"
import courseShinKaiden from "./course_ranks/shinkaiden.svg"

export const courseRankNames = [
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

export const classRankNames = [
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

const RankContainer = styled("img")`
  height: 2em;
`

const getCourseRankImage = (courseRank: number): any => {
  switch (courseRank) {
    case 0:
      return course0
    case 1:
      return course1
    case 2:
      return course2
    case 3:
      return course3
    case 4:
      return course4
    case 5:
      return course5
    case 6:
      return course6
    case 7:
      return course7
    case 8:
      return course8
    case 9:
      return course9
    case 10:
      return course10
    case 12:
      return courseShin1
    case 13:
      return courseShin2
    case 14:
      return courseShin3
    case 15:
      return courseShin4
    case 16:
      return courseShin5
    case 17:
      return courseShin6
    case 18:
      return courseShin7
    case 19:
      return courseShin8
    case 20:
      return courseShin9
    case 21:
      return courseShin10
    case 22:
      return courseShinKaiden
  }
  return ""
}
const CourseRank: FunctionComponent<{
  courseRank: number
}> = ({ courseRank }) => <RankContainer src={getCourseRankImage(courseRank)} />

export default CourseRank
