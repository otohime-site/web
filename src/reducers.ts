import { combineReducers } from 'redux'
import laundryReducers, { LaundryAction } from './laundry/reducers'
import { StateType } from 'typesafe-actions'

const rootReducers = combineReducers({ laundry: laundryReducers })
export type RootAction = LaundryAction
export type RootState = StateType<typeof rootReducers>

export default rootReducers
