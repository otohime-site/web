import React, { FunctionComponent } from 'react'

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
    <svg className={`player-class class-${classLevel}`} width='60' height='28'>
      <text paintOrder='stroke' x='10' y='20'>
        {className}
      </text>
    </svg>
  )
}

export default Class
