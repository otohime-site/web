import { TabContext, TabPanel } from "@mui/lab"
import { Typography, Paper, Grid, Tabs, Tab, Link, Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import { FunctionComponent, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link as RouterLink } from "react-router-dom"
import Token from "../../Token"
import { useAuth } from "../../auth"
import DxUserPlayers from "../../dx_intl/UserPlayers"
import Screenshot from "../../screenshot.jpg"

const StyledGrid = styled(Grid)`
  padding: 16px;
`

const SpacedContainer = styled("div")`
  padding: 8px;
`

const PaddedPaper = styled(Paper)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};
`
)
const SpacedTypo = styled(Typography)(
  ({ theme }) => `
  margin-bottom: ${theme.spacing(2)};
`
)

const HomeComponent: FunctionComponent = () => {
  const [user, loading] = useAuth()
  const [tabValue, setTabValue] = useState("dx")
  if (loading) {
    return <></>
  }
  if (user == null) {
    return (
      <>
        <Helmet>
          <title>Otohime: 音 Game 成績單網站</title>
        </Helmet>
        <Grid container spacing={2} alignItems="center">
          <StyledGrid item md={6}>
            <SpacedTypo variant="h5">音 Game 成績，輕鬆記錄</SpacedTypo>
            <Typography variant="body1">
              Otohime
              可以把您遊戲機台的成績整理至單一的成績單頁面，將其設為公開或自己才能閱覽。
              目前支援 maimai DX 國際版。
              <ul>
                <li>目前採用 Facebook 登入</li>
                <li>適用桌面與可使用 Bookmarklet 的手機瀏覽器</li>
              </ul>
            </Typography>
          </StyledGrid>
          <Grid item md={6}>
            <img src={Screenshot} style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </>
    )
  }
  return (
    <SpacedContainer>
      <Helmet>
        <title>首頁 - Otohime</title>
      </Helmet>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <PaddedPaper>
            <SpacedTypo variant="h6">您的成績單</SpacedTypo>
            <TabContext value={tabValue}>
              <Tabs
                value={tabValue}
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth"
                onChange={(_, val): void => setTabValue(val)}
              >
                <Tab value="dx" label="maimai DX 國際版" />
                <Tab value="laundry" label="maimai (舊版)" />
              </Tabs>
              <TabPanel value="dx">
                <DxUserPlayers />
              </TabPanel>
              <TabPanel value="laundry">
                如果您曾經有使用過 Semiquaver（
                <Link href="https://smq.moe">https://smq.moe</Link>），
                我們將會於近期開放您匯入之前您在該網站上的成績。
              </TabPanel>
            </TabContext>
            <Button variant="contained" component={RouterLink} to="/forget">
              忘記我
            </Button>
          </PaddedPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaddedPaper>
            <SpacedTypo variant="h6">Bookmarklet</SpacedTypo>
            <SpacedTypo variant="body1">
              新增好成績單後，您需要透過書籤從瀏覽器將成績匯入到 Otohime。
              <Link
                href="https://littlebtc.gitbook.io/otohime-docs/bookmarklet-help"
                target="_blank"
              >
                詳細圖文說明
              </Link>
              。
            </SpacedTypo>
            <Token />
          </PaddedPaper>
        </Grid>
      </Grid>
    </SpacedContainer>
  )
}
export default HomeComponent
