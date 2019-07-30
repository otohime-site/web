import React, { FunctionComponent } from 'react'
import './Flags.css'

interface FlagProps {
  rawFlags: string
}

const Flags: FunctionComponent<FlagProps> = ({ rawFlags }) => {
  const getFlag = (flag: string) => {
    switch (flag) {
      case 'fc_silver':
        return (<span key='fc-silver' className='flag flag-fc-silver'>FC</span>)
      case 'fc_gold':
        return (<span key='fc-gold' className='flag flag-fc-gold'>FC</span>)
      case 'ap':
        return (<span key='ap' className='flag flag-ap'>AP</span>)
      case 'ap_plus':
        return (<span key='ap-plus' className='flag flag-ap-plus'>AP+</span>)
      case '100':
        return (<span key='100' className='flag flag-100'>100</span>)
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
