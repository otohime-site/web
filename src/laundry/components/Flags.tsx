import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { indigo, amber, deepOrange } from '@material-ui/core/colors'
import './Flags.css'

interface FlagProps {
  rawFlags: string
}

const SingleFlag = styled('span')`
  display: inline-block;
  margin-left: 2px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 12px;
  background: #FFFFFF;
  opacity: 0.6;
  font-size: 10px;
  font-family: 'Roboto Slab';
  font-weight: 700;

  &.fc-silver {
    color: ${indigo[500]};
  }
  &.fc-gold {
    color: ${amber[800]};
  }
  &.ap {
    color: ${deepOrange[500]};
  }
  &.ap-plus {
    color: ${deepOrange[900]};
  }
`
const EmptyFlag = styled('span')`
  display: inline-block;
  width: 24px;
  height: 24px;
`
const Flags: FunctionComponent<FlagProps> = ({ rawFlags }) => {
  const getFlag = (flag: string) => {
    switch (flag) {
      case 'fc_silver':
        return (<SingleFlag key='fc-silver' className='flag fc-silver'>FC</SingleFlag>)
      case 'fc_gold':
        return (<SingleFlag key='fc-gold' className='flag fc-gold'>FC</SingleFlag>)
      case 'ap':
        return (<SingleFlag key='ap' className='flag ap'>AP</SingleFlag>)
      case 'ap_plus':
        return (<SingleFlag key='ap-plus' className='flag ap-plus'>AP+</SingleFlag>)
      case '100':
        return (<SingleFlag key='100' className='flag one-hundred'>100</SingleFlag>)
      default:
        return (<EmptyFlag key='empty' />)
    }
  }
  return (
    <span className='flags'>
      {rawFlags.split('|').map(getFlag)}
    </span>
  )
}

export default Flags
