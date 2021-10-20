import GitHubIcon from "@mui/icons-material/GitHub"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import {
  Toolbar,
  Typography,
  IconButton,
  Link,
  Hidden,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { FunctionComponent, lazy, Suspense, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Route, Link as RouterLink, Switch } from "react-router-dom"
import AppBar from "./AppBar"
import AppDrawer from "./AppDrawer"
import Search from "./Search"
import UserBox from "./UserBox"
import "./global.css"
import LogoIcon from "./logo/logo.svg"

const Home = lazy(async () => await import("./Home"))
const Forget = lazy(async () => await import("./Forget"))
const DxIntl = lazy(async () => await import("./dx_intl/index"))

const AppDiv = styled("div")`
  display: flex;
  flex-grow: 1;
`

const Title = styled(Typography)`
  font-family: "McLaren", cursive;
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    img {
      height: 1.6em;
      margin-right: 0.3em;
    }
  }
  a:hover {
    text-decoration: none;
  }
`
const AppMenuButton = styled(IconButton)(
  ({ theme }) => `
  margin-right: ${theme.spacing(2)};
`
)
const StyledMain = styled("main")(
  ({ theme }) => `
  margin-top: ${theme.spacing(6)};
  padding: ${theme.spacing(1)};
  flex: 1;
  min-width: 0;
`
)

const StyledFooter = styled("footer")(
  ({ theme }) => `
  margin-top: ${theme.spacing(2)};
  padding-left: ${theme.spacing(2)};
  padding-top: ${theme.spacing(2)};
  border-top: 1px solid #cccccc;
  color: #999999;
`
)

const StyledLink = styled(Link)(
  ({ theme }) => `
  margin: 0 ${theme.spacing(2)};
`
)

const Spacing = styled("div")`
  flex-grow: 1;
`

const SearchButton = styled(Button)(
  ({ theme }) => `
  &.search-shown {
    display: none;
  }
  ${theme.breakpoints.up("sm")} {
    display: none;
  }
`
)
const UserBoxPlaceholder = styled("div")(
  ({ theme }) => `
  ${theme.breakpoints.down("sm")} {
    display: block;
    &.search-shown {
      display: none;
    }
  }
`
)

const App: FunctionComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchShown, setSearchShown] = useState(false)
  const theme = useTheme()
  const searchCollapsible = useMediaQuery(theme.breakpoints.down("sm"))

  const showSearch = (): void => {
    setSearchShown(true)
  }

  const hideSearch = (): void => {
    setSearchShown(false)
  }

  const toggleDrawerOpen = (): void => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = (): void => {
    setDrawerOpen(false)
  }

  return (
    <AppDiv>
      <Helmet>
        <title>Otohime</title>
      </Helmet>
      <AppBar position="fixed" className={drawerOpen ? "open" : ""}>
        <Toolbar>
          <AppMenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </AppMenuButton>
          <Title variant="h6">
            <Link component={RouterLink} to="/">
              <img src={LogoIcon} />
              Otohime
            </Link>
          </Title>
          {!searchCollapsible || searchShown ? (
            <Search
              hideSearch={hideSearch}
              shouldAutoFocus={searchCollapsible}
            />
          ) : (
            <></>
          )}
          <Spacing />
          <SearchButton
            className={searchShown ? "search-shown" : ""}
            color="inherit"
            onClick={showSearch}
          >
            <SearchIcon />
          </SearchButton>
          <UserBoxPlaceholder className={searchShown ? "search-shown" : ""}>
            <UserBox />
          </UserBoxPlaceholder>
        </Toolbar>
      </AppBar>
      <Hidden smUp={true}>
        <AppDrawer
          variant="temporary"
          drawerOpen={drawerOpen}
          closeDrawer={closeDrawer}
        />
      </Hidden>
      <Hidden smDown={true} implementation="css">
        <AppDrawer
          variant="permanent"
          drawerOpen={drawerOpen}
          closeDrawer={closeDrawer}
        />
      </Hidden>
      <StyledMain>
        <Suspense fallback={<></>}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/forget" exact={true} component={Forget} />
            <Route path="/dxi" component={DxIntl} />
          </Switch>
        </Suspense>
        <StyledFooter>
          <Typography variant="body2" color="textSecondary">
            &copy; 2020－2021 Otohime Team。Otohime 是一個開源專案。
            <StyledLink
              href="https://github.com/otohime-site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ marginRight: "8px" }} fontSize="inherit" />
              GitHub
            </StyledLink>
            <StyledLink
              href="https://littlebtc.gitbook.io/otohime-docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              關於我們
            </StyledLink>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Otohime
            團隊與本站中所支援遊戲的相關遊戲公司皆無關聯。我們不為任何造成的問題提供擔保。
          </Typography>
          <Typography variant="body2" color="textSecondary">
            您在本站中的個人資料受台灣《個人資料保護法》和/或您居住地的個資法律保護。
          </Typography>
        </StyledFooter>
      </StyledMain>
    </AppDiv>
  )
}

export default App
