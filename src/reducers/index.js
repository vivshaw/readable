import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import posts from './posts';
import categories from './categories';

const rootReducer = combineReducers({
	categories: persistentReducer(categories),
	posts
});

export default rootReducer;
