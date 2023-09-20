import { lazy, Suspense } from "react"
import { Link, Route, Router } from "wouter"
import classes from "./App.module.css"
import { NestedRoutes } from "./common/components/NestedRoutes"
import UserBox from "./common/components/UserBox"
import "./global.css"
import Logo from "./logo/favicon.svg"

const Home = lazy(async () => await import("./common/pages/Home"))
const Forget = lazy(async () => await import("./common/pages/Forget"))
const DxIntl = lazy(async () => await import("./dx_intl/index"))
const Finale = lazy(async () => await import("./finale/index"))

const App = () => {
  return (
    <>
      <div className={classes.top}>
        <Link href="~/" className={classes.title}>
          <img src={Logo} /> <p>Otohime</p>
        </Link>
        <UserBox />
      </div>
      <div className={classes.container}>
        <Suspense fallback={<></>}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/forget" component={Forget} />
            <NestedRoutes base="/dxi">
              <DxIntl />
            </NestedRoutes>
            <NestedRoutes base="/fin">
              <Finale />
            </NestedRoutes>
          </Router>
        </Suspense>
      </div>
    </>
  )
}

export default App
