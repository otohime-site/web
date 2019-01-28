import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import laundryReducers from './laundry/reducers'

export default combineReducers({ laundry: laundryReducers, form: formReducer })
