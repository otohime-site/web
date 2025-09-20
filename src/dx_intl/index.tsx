import { lazy } from "react"
import { Route, Switch } from "wouter"
import Overview from "./pages/Overview"
import Player from "./pages/Player"
import PlayerForm from "./pages/PlayerForm"
import SongStats from "./pages/SongStats"

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
    <Route path="/s/:songId" component={SongStats} />
    <Route path="/s/:songId/:variant" component={SongStats} />
    <Route path="/s/:songId/:variant/:difficulty" component={SongStats} />
    <Route path="/" component={Overview} />
  </>
)
export default DxIntl
