import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from './reducers/mainReducer';
// import itemReducer from './reducers/itemReducer';
// import roomReducer from './reducers/roomReducer';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './components/App';

let middleware = applyMiddleware(thunkMiddleware, logger);
let store = createStore(mainReducer, middleware);

render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>, 
	document.getElementById('root')
);
