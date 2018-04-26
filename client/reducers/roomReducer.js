import {
  LOGIN_FUL,
  LOGIN_REJ,
  REGISTER_FUL,
  REGISTER_REJ,
  LOGOUT_FUL,
  GETROOMS_REJ,
  GETROOMS_FUL,
} from '../actions/roomActions';

const initialState = {
  // isAuthenticated: localStore.getItem('token') ? true : false,
  rooms: []
}

var roomReducer = function (state = initialState, action) {
  if (action.type === 'GETROOMS_FUL') {
    return Object.assign({}, state, {rooms: action.data});
    // return {rooms: action.data};
  }
  return state;
}

export default roomReducer;