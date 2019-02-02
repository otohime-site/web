import React, { FunctionComponent } from 'react'
import './Flags.css'

interface FlagProps {
  rawFlags: string
}

const Flags: FunctionComponent<FlagProps> = ({ rawFlags }) => {
  const getFlag = (flag: string) => {
    switch (flag) {
      case 'fc_silver':
        return (<span className='flag flag-fc-silver'>FC</span>)
      case 'fc_gold':
        return (<span className='flag flag-fc-gold'>FC</span>)
      case 'ap':
        return (<span className='flag flag-ap'>AP</span>)
      case 'ap_plus':
        return (<span className='flag flag-ap-plus'>AP+</span>)
      case '100':
        return (<span className='flag flag-100'>100</span>)
      default:
        return (<span>&nbsp;</span>)
    }
  }
  return (
    <span className='flags'>
      {rawFlags.split('|').map(getFlag)}
    </span>
  )
}

export default Flags
