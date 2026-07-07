import { lazy } from "react"
import { Redirect, Route, Switch } from "wouter"
import Player from "./pages/Player"
import PlayerForm from "./pages/PlayerForm"
import RatingTarget from "./pages/RatingTarget"
import SongStats from "./pages/SongStats"
import Statistics from "./pages/Statistics"

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
    <Switch>
      <Route path="/s" component={Statistics} />
      <Route path="/s/rt/:rating" component={RatingTarget} />
      <Route path="/s/:songId" component={SongStats} />
      <Route path="/s/:songId/:variant" component={SongStats} />
      <Route path="/s/:songId/:variant/:difficulty" component={SongStats} />
      <Route path="/">
        <Redirect to="/s" replace />
      </Route>
    </Switch>
  </>
)
export default DxIntl
