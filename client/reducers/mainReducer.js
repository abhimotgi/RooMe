import { combineReducers } from 'redux';
// import authReducer from './authReducer';
// import tweetListReducer from './tweetListReducer';
// import tweetReducer from './tweetReducer';
// import profileReducer from './profileReducer';
// import messageReducer from './messageReducer';
// import discoverReducer from './discoverReducer';
import itemReducer from './itemReducer';

// you should somehow * combine reducers * hint hint
// so that the reducer looks like
// {
//  authReducer: authReducer
//  tweetList: tweetListReducer
//  tweet: tweetReducer
//  profileReducer: profileReducer
//  messageReducer: messageReducer
//  discoverReducer
// }
// store this reducer in a variable 'tweetApp'

var roomeApp = combineReducers({
  itemReducer: itemReducer
});
/*var tweetApp = function(state, action) {
   return state;
}*/


export default roomeApp = itemReducer;
