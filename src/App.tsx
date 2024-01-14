import { lazy, Suspense } from "react"
import { Link, RouterProvider } from "react-aria-components"
import { Route, Router, useLocation } from "wouter"
import classes from "./App.module.css"
import UserBox from "./common/components/UserBox"
import "./fonts.css"
import "./global.css"
import Logo from "./logo/favicon.svg"

const Home = lazy(async () => await import("./common/pages/Home"))
const Forget = lazy(async () => await import("./common/pages/Forget"))
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
        <UserBox />
      </div>
      <div className={classes.container}>
        <Suspense fallback={<></>}>
          <RouterProvider navigate={navigate}>
            <Router>
              <Route path="/" component={Home} />
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
    </>
  )
}

export default App
