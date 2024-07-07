import { Route } from "wouter"
import Player from "./pages/Player"
/* import PlayerForm from "./pages/PlayerForm"
import PlayerHistory from "./pages/PlayerHistory"
import SongStats from "./pages/SongStats"*/

const Finale = () => (
  <>
    {/*<Route path="/p/:nickname/edit" component={PlayerForm} />
<Route path="/p/:nickname/history" component={PlayerHistory} />
<Route path="/p/:nickname/history/:hash" component={PlayerHistory} />*/}
    <Route path="/p/:nickname" component={Player} />
  </>
)

export default Finale
