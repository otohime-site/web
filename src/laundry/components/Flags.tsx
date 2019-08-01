import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { indigo, amber, deepOrange } from '@material-ui/core/colors'
import './Flags.css'

interface FlagProps {
  rawFlags: string
}
const FlagsRoot = styled('span')`
  display: flex;
  flex-direction: row;
`

const SingleFlag = styled('span')`
  margin-left: 2px;
  letter-spacing: 0;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 12px;
  background: #FAFAFA;
  border: 1px solid #EEEEEE;
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
  margin-left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: #FAFAFA;
  border: 1px solid #EEEEEE;
  opacity: 0.6;
`
const Flags: FunctionComponent<FlagProps> = ({ rawFlags }) => {
  let flagResults = []
  const rawFlagList = rawFlags.split('|')
  // Combo / Perfect
  if (rawFlagList.indexOf('ap_plus') >= 0) {
    flagResults.push(<SingleFlag className='flag ap-plus'>AP<sup>+</sup></SingleFlag>)
  } else if (rawFlagList.indexOf('ap') >= 0) {
    flagResults.push(<SingleFlag className='flag ap'>AP</SingleFlag>)
  } else if (rawFlagList.indexOf('fc_gold') >= 0) {
    flagResults.push(<SingleFlag className='flag fc-gold'>FC</SingleFlag>)
  } else if (rawFlagList.indexOf('fc_silver') >= 0) {
    flagResults.push(<SingleFlag className='flag fc-silver'>FC</SingleFlag>)
  } else {
    flagResults.push(<EmptyFlag />)
  }
  // Sync
  if (rawFlagList.indexOf('100') >= 0) {
    flagResults.push(<SingleFlag className='flag one-hundred'>100</SingleFlag>)
  } else {
    flagResults.push(<EmptyFlag />)
  }

  return (
    <FlagsRoot>
      {flagResults}
    </FlagsRoot>
  )
}

export default Flags
