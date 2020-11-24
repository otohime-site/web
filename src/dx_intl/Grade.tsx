import React, { FunctionComponent } from 'react'
import styled from '../styled'
import Grade14 from './grades/14.svg'

export const gradeNames = [
  '', // start from 1 :(
  '初心者', '見習い', '駆け出し', '修行中',
  '初段', '二段', '三段', '四段', '五段',
  '六段', '七段', '八段', '九段', '十段',
  '皆伝',
  '壱皆伝', '弐皆伝', '参皆伝', '肆皆伝', '伍皆伝',
  '陸皆伝', '漆皆伝', '捌皆伝', '玖皆伝', '拾皆伝'
] as const

const GradeContainer = styled('img')`
  height: 2em;
`

const Grade: FunctionComponent<{
  grade: number
}> = ({ grade }) => (
  <GradeContainer src={Grade14} />
)

export default Grade
