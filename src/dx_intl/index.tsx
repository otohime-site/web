import { Redirect, Route, Switch } from "wouter"
import Player from "./pages/Player"
import PlayerForm from "./pages/PlayerForm"
import Stats from "./pages/Stats"

const DxIntl = () => (
  <>
    <Switch>
      <Route path="/p/new" component={PlayerForm} />
      {/* The player routes (scores/edit/history/image) nest under the
          shared player layout with the sticky top bar. */}
      <Route path="/p/:nickname" nest component={Player} />
    </Switch>
    <Route path="/s" nest component={Stats} />
    <Route path="/">
      <Redirect to="/s" replace />
    </Route>
  </>
)
export default DxIntl
