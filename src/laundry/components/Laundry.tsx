import React from 'react'
import { Switch, Route } from 'react-router-dom'
import User from './User'
import Player from './Player'
import Timeline from './Timeline'

export default function Laundry () {
  return (
    <div>
      <Route path='/mai/:nickname/timeline' component={Timeline} />
      <Switch>
        {/* Ambiguous Matches */}
        <Route exact={true} path='/mai/me' component={User} />
        <Route exact={true} path='/mai/:nickname' component={Player} />
      </Switch>
    </div>
  )
}
