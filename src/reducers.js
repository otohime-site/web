import { combineReducers } from 'redux';
import laundryReducers from './laundry/reducers';

export default combineReducers({ laundry: laundryReducers });
