import styled from '../../styled'
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
    :after {
      content: 'FC';
      color: ${indigo[500]};
    }
  }
  &.fc-gold {
    :after {
      content: 'FC';
      color: ${amber[800]};
    }
  }
  &.ap {
    :after {
      content: 'AP';
      color: ${deepOrange[500]};
    }
  }
  &.ap-plus {
    :after {
      content: 'AP+';
      color: ${deepOrange[900]};
    }
  }
  &.one-hundred {
    :after {
      content: '100'
    }
  }
`
const Flags: FunctionComponent<FlagProps> = ({ rawFlags }) => {
  let flagResults = []
  const rawFlagList = rawFlags.split('|')
  let firstFlagClass = ''
  let secondFlagClass = ''
  // Combo / Perfect
  if (rawFlagList.indexOf('ap_plus') >= 0) {
    firstFlagClass = 'ap-plus'
  } else if (rawFlagList.indexOf('ap') >= 0) {
    firstFlagClass = 'ap'
  } else if (rawFlagList.indexOf('fc_gold') >= 0) {
    firstFlagClass = 'fc-gold'
  } else if (rawFlagList.indexOf('fc_silver') >= 0) {
    firstFlagClass = 'fc-silver'
  }
   // Sync
  if (rawFlagList.indexOf('100') >= 0) {
    secondFlagClass = 'one-hundred'
  }
  return (
    <FlagsRoot>
      <SingleFlag className={firstFlagClass}/>
      <SingleFlag className={secondFlagClass}/>
    </FlagsRoot>
  )
}

export default Flags
