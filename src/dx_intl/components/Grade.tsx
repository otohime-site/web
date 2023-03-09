import { FunctionComponent } from "react"
import Grade1 from "../images/grades/1.svg"
import Grade10 from "../images/grades/10.svg"
import Grade11 from "../images/grades/11.svg"
import Grade12 from "../images/grades/12.svg"
import Grade13 from "../images/grades/13.svg"
import Grade14 from "../images/grades/14.svg"
import Grade15 from "../images/grades/15.svg"
import Grade16 from "../images/grades/16.svg"
import Grade17 from "../images/grades/17.svg"
import Grade18 from "../images/grades/18.svg"
import Grade19 from "../images/grades/19.svg"
import Grade2 from "../images/grades/2.svg"
import Grade20 from "../images/grades/20.svg"
import Grade21 from "../images/grades/21.svg"
import Grade22 from "../images/grades/22.svg"
import Grade23 from "../images/grades/23.svg"
import Grade24 from "../images/grades/24.svg"
import Grade25 from "../images/grades/25.svg"
import Grade3 from "../images/grades/3.svg"
import Grade4 from "../images/grades/4.svg"
import Grade5 from "../images/grades/5.svg"
import Grade6 from "../images/grades/6.svg"
import Grade7 from "../images/grades/7.svg"
import Grade8 from "../images/grades/8.svg"
import Grade9 from "../images/grades/9.svg"
import classes from "./Grade.module.css"

const getGradeImage = (grade: number) => {
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
}> = ({ grade }) => <img className={classes.grade} src={getGradeImage(grade)} />

export default Grade
