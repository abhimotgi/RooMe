import { combineReducers } from 'redux';

import itemReducer from './itemReducer';
import roomReducer from './roomReducer';

var mainReducer = combineReducers({
  itemReducer: itemReducer,
  roomReducer: roomReducer
});



export default mainReducer = roomReducer;
