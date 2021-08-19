import styled from "@emotion/styled"

import React, { FunctionComponent, lazy, Suspense, useState } from "react"
import { Route, Link as RouterLink, Switch } from "react-router-dom"
import {
  Toolbar,
  Typography,
  IconButton,
  Link,
  Hidden,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import GitHubIcon from "@material-ui/icons/GitHub"
import SearchIcon from "@material-ui/icons/Search"

import { Helmet } from "react-helmet-async"
import AppBar from "./AppBar"
import AppDrawer from "./AppDrawer"
import UserBox from "./UserBox"

import "./global.css"
import Search from "./Search"

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
  }
  a:hover {
    text-decoration: none;
  }
`
const AppMenuButton = styled(IconButton)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
`
const StyledMain = styled("main")`
  margin-top: ${(props) => props.theme.spacing(6)}px;
  padding: ${(props) => props.theme.spacing(1)}px;
  flex: 1;
  min-width: 0;
`

const StyledFooter = styled("footer")`
  margin-top: ${(props) => props.theme.spacing(2)}px;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  border-top: 1px solid #cccccc;
  color: #999999;
`

const StyledLink = styled(Link)`
  margin: 0 ${(props) => props.theme.spacing(2)}px;
`

const Spacing = styled("div")`
  flex-grow: 1;
`

const SearchButton = styled(Button)`
  &.search-shown {
    display: none;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: none;
  }
`
const UserBoxPlaceholder = styled("div")`
  ${(props) => props.theme.breakpoints.down("xs")} {
    display: block;
    &.search-shown {
      display: none;
    }
  }
`

const App: FunctionComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchShown, setSearchShown] = useState(false)
  const theme = useTheme()
  const searchCollapsible = useMediaQuery(theme.breakpoints.down("xs"))

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
      <Hidden xsDown={true} implementation="css">
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
            &copy; 2020 Otohime Team。Otohime 是一個開源專案。
            <StyledLink
              href="https://github.com/otohime-site/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ marginRight: "8px" }} fontSize="inherit" />
              GitHub
            </StyledLink>
            <StyledLink>關於我們</StyledLink>
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
