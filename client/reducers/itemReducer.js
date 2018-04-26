import {
  REMOVEDITEM_FUL,
  // REMOVEDITEM_REJ,
  TOGGLEDITEM_FUL,
  // TOGGLEDITEM_REJ,
  GETITEMS_FUL,
  // GETITEMS_REJ,
  ADDEDITEM_FUL,
  // ADDEDITEM_REJ
} from '../actions/itemActions';

const initialState = {
  items: []
}

var itemReducer = function (state = initialState, action) {
  // var newState = Object.assign({}, state, {});
  // if (action.type === REMOVEDITEM_FUL) {
    // newState.splice(action.data._id, 1);
  // } else if (action.type === TOGGLEDITEM_FUL) {
    // newState[action.data._id] = action.data;
  // } else 
  if (action.type === GETITEMS_FUL) {
    // return {
    //   items: action.data
    // }
    return Object.assign({}, state, {items: action.data});
  }
  // } else if (action.type === ADDEDITEM_FUL) {
    // newState[action.data._id] = action.data;
  // }
  return state;
};

export default itemReducer;