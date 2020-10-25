import styled from '../../styled'
import React, { FunctionComponent } from 'react'
import { yellow, pink } from '@material-ui/core/colors'

const StyledSVG = styled('svg')`
  text {
    font-family: 'M PLUS Rounded 1c';
    font-size: 18px;
    font-weight: bold;
    stroke-width: 3px;
  }
  text.outer {
    fill: none;
    stroke-width: 5px;
    stroke: #333333;
  }
  &.class-silver text.inner {
    fill: white;
  }
  &.class-gold text.inner {
    fill: ${yellow[300]};
  }
  &.class-gold-black text.inner {
    fill: #333333;
    stroke: ${yellow[200]};
  }
  &.class-gold-red text.inner {
    fill: ${pink[800]};
    stroke: ${yellow[200]};
  }
`

const getClassName = (rawClassName: string) => {
  switch (rawClassName) {
    case '01': return '初段'
    case '02': return '二段'
    case '03': return '三段'
    case '04': return '四段'
    case '05': return '五段'
    case '06': return '六段'
    case '07': return '七段'
    case '08': return '八段'
    case '09': return '九段'
    case '10': return '十段'
    case '11': return '皆伝'
    default: return ''
  }
}

const getClassLevel = (rawLevel: string) => {
  switch (rawLevel) {
    case '08': return 'silver'
    case '09': return 'gold'
    case '10': return 'gold-black'
    case '11': return 'gold-red'
    default: return ''
  }
}

interface ClassProps {
  rawClass: string
}

const Class: FunctionComponent<ClassProps> = ({ rawClass }) => {
  if (!rawClass) {
    return (<span />)
  }
  const classParts = rawClass.split('_')
  const className = getClassName(classParts[0])
  const classLevel = getClassLevel(classParts[1])
  if (!className || !classLevel) {
    return (<span />)
  }
  return (
    <StyledSVG className={`player-class class-silver`} width='60' height='28'>
      <text className='outer' paintOrder='stroke' x='10' y='20'>
        {className}
      </text>
      <text className='inner' paintOrder='stroke' x='10' y='20'>
        {className}
      </text>
    </StyledSVG>
  )
}

export default Class
