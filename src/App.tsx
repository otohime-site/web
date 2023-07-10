import { lazy, Suspense } from "react"
import { Route, Router } from "wouter"
import { NestedRoutes } from "./common/components/NestedRoutes"
import "./global.css"

const Home = lazy(async () => await import("./common/pages/Home"))
const Forget = lazy(async () => await import("./common/pages/Forget"))
const DxIntl = lazy(async () => await import("./dx_intl/index"))
const Finale = lazy(async () => await import("./finale/index"))

const App = () => {
  return (
    <div>
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
  )
}

export default App
