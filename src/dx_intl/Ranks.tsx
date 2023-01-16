import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import classA1 from "./class_ranks/A1.svg"
import classA2 from "./class_ranks/A2.svg"
import classA3 from "./class_ranks/A3.svg"
import classA4 from "./class_ranks/A4.svg"
import classA5 from "./class_ranks/A5.svg"
import classB1 from "./class_ranks/B1.svg"
import classB2 from "./class_ranks/B2.svg"
import classB3 from "./class_ranks/B3.svg"
import classB4 from "./class_ranks/B4.svg"
import classB5 from "./class_ranks/B5.svg"
import classLegend from "./class_ranks/LEGEND.svg"
import classS1 from "./class_ranks/S1.svg"
import classS2 from "./class_ranks/S2.svg"
import classS3 from "./class_ranks/S3.svg"
import classS4 from "./class_ranks/S4.svg"
import classS5 from "./class_ranks/S5.svg"
import classSS1 from "./class_ranks/SS1.svg"
import classSS2 from "./class_ranks/SS2.svg"
import classSS3 from "./class_ranks/SS3.svg"
import classSS4 from "./class_ranks/SS4.svg"
import classSS5 from "./class_ranks/SS5.svg"
import classSSS1 from "./class_ranks/SSS1.svg"
import classSSS2 from "./class_ranks/SSS2.svg"
import classSSS3 from "./class_ranks/SSS3.svg"
import classSSS4 from "./class_ranks/SSS4.svg"
import classSSS5 from "./class_ranks/SSS5.svg"
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
import courseUraKaiden from "./course_ranks/urakaiden.svg"

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
  "裏皆伝",
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

const courseRankImages = [
  course0,
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
  course7,
  course8,
  course9,
  course10,
  undefined,
  courseShin1,
  courseShin2,
  courseShin3,
  courseShin4,
  courseShin5,
  courseShin6,
  courseShin7,
  courseShin8,
  courseShin9,
  courseShin10,
  courseShinKaiden,
  courseUraKaiden,
]

const classRankImages = [
  classB5,
  classB4,
  classB3,
  classB2,
  classB1,
  classA5,
  classA4,
  classA3,
  classA2,
  classA1,
  classS5,
  classS4,
  classS3,
  classS2,
  classS1,
  classSS5,
  classSS4,
  classSS3,
  classSS2,
  classSS1,
  classSSS5,
  classSSS4,
  classSSS3,
  classSSS2,
  classSSS1,
  classLegend,
]

const RankContainer = styled("img")`
  height: 2em;
`

export const CourseRank: FunctionComponent<{
  courseRank: number
}> = ({ courseRank }) => (
  <RankContainer
    src={courseRankImages[courseRank]}
    alt={courseRankNames[courseRank]}
  />
)

export const ClassRank: FunctionComponent<{
  classRank: number
}> = ({ classRank }) => (
  <RankContainer
    src={classRankImages[classRank]}
    alt={classRankNames[classRank]}
  />
)
