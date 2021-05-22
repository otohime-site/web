import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"

import Grade1 from "./grades/1.svg"
import Grade2 from "./grades/2.svg"
import Grade3 from "./grades/3.svg"
import Grade4 from "./grades/4.svg"
import Grade5 from "./grades/5.svg"
import Grade6 from "./grades/6.svg"
import Grade7 from "./grades/7.svg"
import Grade8 from "./grades/8.svg"
import Grade9 from "./grades/9.svg"
import Grade10 from "./grades/10.svg"
import Grade11 from "./grades/11.svg"
import Grade12 from "./grades/12.svg"
import Grade13 from "./grades/13.svg"
import Grade14 from "./grades/14.svg"
import Grade15 from "./grades/15.svg"
import Grade16 from "./grades/16.svg"
import Grade17 from "./grades/17.svg"
import Grade18 from "./grades/18.svg"
import Grade19 from "./grades/19.svg"
import Grade20 from "./grades/20.svg"
import Grade21 from "./grades/21.svg"
import Grade22 from "./grades/22.svg"
import Grade23 from "./grades/23.svg"
import Grade24 from "./grades/24.svg"
import Grade25 from "./grades/25.svg"

// eslint-disable-next-line no-sparse-arrays
export const gradeNames = [
  ,
  // start from 1
  "初心者",
  "見習い",
  "駆け出し",
  "修行中",
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
  "皆伝",
  "壱皆伝",
  "弐皆伝",
  "参皆伝",
  "肆皆伝",
  "伍皆伝",
  "陸皆伝",
  "漆皆伝",
  "捌皆伝",
  "玖皆伝",
  "拾皆伝",
] as const

const GradeContainer = styled("img")`
  height: 2em;
`

const getGradeImage = (grade: number): any => {
  switch (grade) {
    case 1:
      return Grade1
    case 2:
      return Grade2
    case 3:
      return Grade3
    case 4:
      return Grade4
    case 5:
      return Grade5
    case 6:
      return Grade6
    case 7:
      return Grade7
    case 8:
      return Grade8
    case 9:
      return Grade9
    case 10:
      return Grade10
    case 11:
      return Grade11
    case 12:
      return Grade12
    case 13:
      return Grade13
    case 14:
      return Grade14
    case 15:
      return Grade15
    case 16:
      return Grade16
    case 17:
      return Grade17
    case 18:
      return Grade18
    case 19:
      return Grade19
    case 20:
      return Grade20
    case 21:
      return Grade21
    case 22:
      return Grade22
    case 23:
      return Grade23
    case 24:
      return Grade24
    case 25:
      return Grade25
  }
  return ""
}

const Grade: FunctionComponent<{
  grade: number
}> = ({ grade }) => <GradeContainer src={getGradeImage(grade)} />

export default Grade
