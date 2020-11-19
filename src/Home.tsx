import { Typography, Stepper, Step, StepLabel, Paper, Grid, Tabs, Tab, Link } from '@material-ui/core'
import firebase from 'firebase/app'
import React, { FunctionComponent, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from './auth'
import Token from './Token'
import styled from './styled'
import { TabContext, TabPanel } from '@material-ui/lab'
import DxUserPlayers from './dx_intl/UserPlayers'

const PaddedPaper = styled(Paper)`
  padding: ${props => props.theme.spacing(2)}px;
`
const Header = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
`

const HomeComponent: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [tabValue, setTabValue] = useState('dx')
  if (user == null) {
    return (<>
      <Helmet>
        <title>&#x1F3B5; Otohime: 音 Game 成績單網站</title>
      </Helmet>
      <Header variant='h5'>
        Otohime - 音 Game 成績單網站
      </Header>
      <Typography variant='body1'>
        目前支援 maimai DX 國際版的成績集記與排名。
      </Typography>
      <Header variant='h6'>
        如何使用
      </Header>
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
  return (
    <>
      <Helmet>
        <title>首頁 - Otohime</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <PaddedPaper>
            <Header variant='h6'>您的玩家資料</Header>
            <TabContext value={tabValue}>
              <Tabs value={tabValue} textColor='secondary' variant='fullWidth' onChange={(_, val): void => setTabValue(val)}>
                <Tab value='dx' label='maimai DX 國際版' />
                <Tab value='laundry' label='maimai (舊版)' />
              </Tabs>
              <TabPanel value='dx'>
                <DxUserPlayers />
              </TabPanel>
              <TabPanel value='laundry'>
                如果您曾經有使用過 Semiquaver（<Link href="https://smq.moe">https://smq.moe</Link>），
                我們將會於近期開放您匯入之前您在該網站上的成績。
              </TabPanel>
            </TabContext>
          </PaddedPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaddedPaper>
            <Header variant='h6'>Bookmarklet</Header>
            <Token />
          </PaddedPaper>
        </Grid>
      </Grid>
    </>
  )
}
export default HomeComponent
