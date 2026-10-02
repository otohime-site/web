import { Route, Switch } from "wouter"
import NotFound from "../common/pages/NotFound"
import Player from "./pages/Player"
import PlayerHistory from "./pages/PlayerHistory"

const Finale = () => (
  <Switch>
    <Route path="/p/:nickname/history" component={PlayerHistory} />
    <Route path="/p/:nickname/history/:hash" component={PlayerHistory} />
    <Route path="/p/:nickname" component={Player} />
    <Route component={NotFound} />
  </Switch>
)

export default Finale
