import { lazy } from "react"
import { Redirect, Route, Switch } from "wouter"
import Player from "./pages/Player"
import PlayerForm from "./pages/PlayerForm"
import Stats from "./pages/Stats"

const PlayerHistory = lazy(async () => await import("./pages/PlayerHistory"))

const DxIntl = () => (
  <>
    <Switch>
      <Route path="/p/new" component={PlayerForm} />
      <Route path="/p/:nickname/edit" component={PlayerForm} />
      <Route path="/p/:nickname/history" component={PlayerHistory} />
      <Route path="/p/:nickname/history/:hash" component={PlayerHistory} />
      <Route path="/p/:nickname" component={Player} />
    </Switch>
    <Route path="/s" nest component={Stats} />
    <Route path="/">
      <Redirect to="/s" replace />
    </Route>
  </>
)
export default DxIntl
