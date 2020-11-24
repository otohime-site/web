import React, { FunctionComponent } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import Player from './Player'

const DxIntl: FunctionComponent<RouteComponentProps<{}>> = ({ match }) => (
  <>
    <Route path={`${match.url}/p/:nickname`} component={Player} />
  </>
)
export default DxIntl
