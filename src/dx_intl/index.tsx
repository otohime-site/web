import React, { FunctionComponent } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import Player from './Player'
import PlayerForm from './PlayerForm'

const DxIntl: FunctionComponent<RouteComponentProps<{}>> = ({ match }) => (
  <>
    <Route path={`${match.url}/p/new`} component={PlayerForm} />
    <Route path={`${match.url}/p/:nickname/edit`} component={PlayerForm} />
    <Route path={`${match.url}/p/:nickname`} component={Player} exact={true} />
  </>
)
export default DxIntl
