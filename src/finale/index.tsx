import { Route, Switch } from "wouter"
import Player from "./pages/Player"
import PlayerHistory from "./pages/PlayerHistory"

const Finale = () => (
  <Switch>
    <Route path="/p/:nickname/history" component={PlayerHistory} />
    <Route path="/p/:nickname/history/:hash" component={PlayerHistory} />
    <Route path="/p/:nickname" component={Player} />
  </Switch>
)

export default Finale
