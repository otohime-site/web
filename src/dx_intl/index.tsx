import React, { FunctionComponent } from "react"
import { Route, RouteComponentProps, Switch } from "react-router-dom"
import Overview from "./Overview"
import Player from "./Player"
import PlayerForm from "./PlayerForm"
import PlayerHistory from "./PlayerHistory"
import SongStats from "./SongStats"

const DxIntl: FunctionComponent<RouteComponentProps<{}>> = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/p/new`} component={PlayerForm} />
    <Route path={`${match.url}/p/:nickname/edit`} component={PlayerForm} />
    <Route
      path={`${match.url}/p/:nickname/history/:hash?`}
      component={PlayerHistory}
    />
    <Route path={`${match.url}/p/:nickname`} component={Player} exact={true} />
    <Route
      path={`${match.url}/s/:songId([0-9a-z]+)/:variant(std|dx)?/:difficulty([01234])?`}
      component={SongStats}
      exact={true}
    />
    <Route path={`${match.url}`} component={Overview} exact={true} />
  </Switch>
)
export default DxIntl
