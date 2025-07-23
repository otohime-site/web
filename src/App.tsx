import { lazy, Suspense } from "react"
import { Link, RouterProvider } from "react-aria-components"
import { Route, Router, useLocation } from "wouter"
import GitHubIcon from "~icons/grommet-icons/github"
import classes from "./App.module.css"
import { AuthMigrate } from "./common/components/AuthMigrate"
import Search from "./common/components/Search"
import UserBox from "./common/components/UserBox"
import "./fonts.css"
import "./global.css"
import Logo from "./logo/favicon.svg"

const Home = lazy(async () => await import("./common/pages/Home"))
const Forget = lazy(async () => await import("./common/pages/Forget"))
const Transfer = lazy(async () => await import("./common/pages/Transfer"))
const DxIntl = lazy(async () => await import("./dx_intl/index"))
const Finale = lazy(async () => await import("./finale/index"))

const App = () => {
  const [, navigate] = useLocation()
  return (
    <>
      <div className={classes.top}>
        <Link href="/" className={classes.title}>
          <img src={Logo} /> <p>Otohime</p>
        </Link>
        <Search />
        <div className={classes.space} />
        <UserBox />
      </div>
      <div className={classes.container}>
        <AuthMigrate />
        <Suspense fallback={<></>}>
          <RouterProvider navigate={navigate}>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/transfer" component={Transfer} />
              <Route path="/forget" component={Forget} />
              <Route path="/dxi" nest>
                <DxIntl />
              </Route>
              <Route path="/fin" nest>
                <Finale />
              </Route>
            </Router>
          </RouterProvider>
        </Suspense>
      </div>
      <div className={classes.footer}>
        <div>
          &copy; 2018－2025 Otohime Team.
          <a
            href="https://github.com/otohime-site/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon style={{ marginRight: "8px" }} fontSize="inherit" />
            GitHub
          </a>
          <a
            href="https://littlebtc.gitbook.io/otohime-docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            關於我們
          </a>{" "}
          <a
            href="https://littlebtc.gitbook.io/otohime-docs/data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            隱私權與資料使用政策
          </a>{" "}
        </div>
        <div>
          Otohime
          與本站中所支援遊戲的相關遊戲公司皆無關聯；本站中使用部分其他版權來源的圖片，僅用於識別樂曲用途。我們不為任何造成的問題提供擔保。
        </div>
      </div>
    </>
  )
}

export default App
