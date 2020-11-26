import { Tooltip } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { DxIntlRecordWithScoresQuery } from '../generated/graphql'
import styled from '../styled'
import Grade from './Grade'

const Subtitle = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 20em;
`

const CardName = styled('div')`
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  width: 15em;
  background: white;
  border: 0.1em solid #CCCCCC;
  border-radius: 0.2em;
  font-size: 133%;
  font-weight: bold;
  font-family: 'Kosugi Maru';
`

const Title = styled('div')`
  width: 20em;
  text-align: center;
  overflow: hidden;
  border-radius: 0.4em;
  border: 0.1em solid;
  color: white;
  -webkit-text-stroke: 0.06em #000000;
  font-weight: bold;
  font-family: 'Kosugi Maru';
  margin-bottom: 0.5em;
  &.normal {
    background: linear-gradient(#F9F9F9 0%, #F9F9F9 60%, #DADADA 60%, #DADADA 100%);
    border-color: #B8B8B8;
    box-shadow: 0 0.2em #666666;
  }
  &.bronze {
    background: linear-gradient(#FB9966 0%, #FB9966 60%, #DD7733 60%, #DD7733 100%);
    border-color: #B8B8B8;
    box-shadow: 0 0.2em #803300 ;
  }
  &.silver {
    background: linear-gradient(#E3E3F0 0%, #E3E3F0 60%, #96B6E3 60%, #96B6E3 100%);
    border-color: #B6D3F3;
    box-shadow: 0 0.2em #3333AA ;
  }
  &.gold {
    background: linear-gradient(#FFDF4B 0%, #FFDF4B 60%, #FABF00 60%, #FABA00 100%);
    border-color: #FFE366;
    box-shadow: 0 0.2em #BB3E00 ;
  }
  &.rainbow {
    background-image:
      linear-gradient(to right,
        #fdc9aa 0%, #fdc9aa 5%, #fdcea9 7%,
        #fdfd9c 16%, #fdfd92 28%, #fdfd92 40%,
        #fdfd94 41%, #ecfd98 43%, #e1fd9f 44%,
        #ddfda7 46%, #ddfdc6 48%, #ddfdf5 51%,
        #ddfdfd 52%, #ddfdfd 66%, #e7fdfd 68%,
        #fdfdfd 71%, #fdfdfd 75%, #fdebfd 78%,
        #fde4fd 80%, #fde4fd 87%, #fdedfd 91%,
        #e1f5fd 97%,#dff6fd 100%),
      linear-gradient(to right,
        #faaa8b 0%, #faaa8b 4%, #faaf8a 5%,
        #fae87b 16%, #fafa77 21%, #fafa73 27%,
        #fafa73 38%, #e7fa73 39%, #cdfa79 42%,
        #befa86 45%, #befa93 46%, #befab7 49%,
        #befad6 51%, #befafa 57%, #befafa 65%,
        #c8fafa 68%, #dcfafa 70%, #f9e4fa 74%,
        #faccfa 78%, #fac5fa 80%, #fac6fa 87%,
        #c8d4fa 95%, #c0d7fa 98%, #c0d7fa 100%),
      repeating-linear-gradient(rgba(128, 128, 128, 0.5) 0%, rgba(128, 128, 128, 0.5) 100%),
      repeating-linear-gradient(
        300deg,
        #7ADEF9 0%,
        #7ADEF9 27.6%,
        #BDF340 27.6%,
        #BDF340 47.6%,
        #FFED6E 47.6%,
        #FFED6E 67.6%,
        #FFD360  67.6%,
        #FFD360 87.6%,
        #FF6E53 87.6%,
        #FF6E53 100%
      );
    background-position: left top, left bottom, left bottom, 0;
    background-repeat: no-repeat, no-repeat, no-repeat, repeat;
    background-origin: content-box, content-box, border-box, border-box;
    background-clip: content-box, content-box, border-box, border-box;
    background-size: auto 50%, auto 50%, auto 0.2em, 19em auto;
    border-color: transparent;
    border-bottom-width: 0.3em;
    margin-bottom: 0.3em;
  }
`

const Rating = styled('div')`
  background: linear-gradient(#333333 0, #333333 50%, #666666 50%, #666666 100%);
  border-radius: 0.3em;
  border: 0.1em solid #000000;
  width: 4em;
  font-family: 'M plus 1p';
  font-weight: 900;
  color: #EECC66;
  text-align: right;
  cursor: pointer;
`

const Record: FunctionComponent<{
  record: DxIntlRecordWithScoresQuery['dx_intl_records'][0]
}> = ({ record }) => (
  <div>
    <Subtitle>
      <Tooltip title={`Max: ${record.max_rating}`}>
        <Rating>{record.rating}</Rating>
      </Tooltip>
      <Grade grade={record.grade} />
    </Subtitle>
    <CardName>{record.card_name}</CardName>
    <Tooltip title={record.title}>
      <Title className={record.trophy}>{record.title}</Title>
    </Tooltip>
  </div>
)

export default Record