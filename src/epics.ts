import * as laundryEpics from './laundry/epics'
import { combineEpics } from 'redux-observable'

export default combineEpics(...Object.values(laundryEpics))
