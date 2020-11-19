import { Typography, Stepper, Step, StepLabel } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { FunctionComponent } from 'react'
import { useAuth } from './auth'
import Token from './Token'

const HomeComponent: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  if (user == null) {
    return (<>
      <Typography variant='h5'>
        Otohime - 音 Game 成績單網站
      </Typography>
      <Typography variant='body1'>
        目前支援 maimai DX 國際版的成績集記與排名。
      </Typography>
      <Typography variant='h6'>
        如何使用
      </Typography>
      <Stepper orientation='vertical' activeStep={-1}>
        <Step>
          <StepLabel>到官方成績單網站註冊，並登錄卡片</StepLabel>
        </Step>
        <Step>
          <StepLabel>以 Facebook 帳號登入 Otohime，新增一個玩家紀錄</StepLabel>
        </Step>
        <Step>
          <StepLabel>取得 Bookmarklet 加入您的瀏覽器書籤</StepLabel>
        </Step>
        <Step>
          <StepLabel>進入官方成績單後觸發 Bookmarklet</StepLabel>
        </Step>
        <Step>
          <StepLabel>選擇玩家紀錄匯入成績即可！</StepLabel>
        </Step>
      </Stepper>
    </>)
  }
  return <Token />
}
export default HomeComponent
