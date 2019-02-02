import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import laundryReducers from './laundry/reducers'
import { StateType } from 'typesafe-actions'

const rootReducers = combineReducers({ laundry: laundryReducers, form: formReducer })
export type RootState = StateType<typeof rootReducers>

export default rootReducers
