import { Redirect, Route, Switch, useLocation } from "wouter"
import Player from "./pages/Player"
import PlayerForm from "./pages/PlayerForm"
import Stats from "./pages/Stats"

const NewPlayerDialog = () => {
  const [, navigate] = useLocation()

  return (
    <PlayerForm
      params={{}}
      open
      onOpenChange={(open) => {
        if (!open) navigate("~/", { replace: true })
      }}
    />
  )
}

const DxIntl = () => (
  <>
    <Switch>
      <Route path="/p/new" component={NewPlayerDialog} />
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
