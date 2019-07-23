import { combineReducers } from 'redux'
import laundryReducers from './laundry/reducers'
import { StateType } from 'typesafe-actions'

const rootReducers = combineReducers({ laundry: laundryReducers })
export type RootState = StateType<typeof rootReducers>

export default rootReducers
