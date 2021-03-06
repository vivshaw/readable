import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistentStore, persistentReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb';
import { queueOffline } from './enhancer';

const db = new PouchDB('storedb');

const composeEnhancers = compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(thunk),
		persistentStore(db),
		queueOffline(persistentReducer)
	)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
