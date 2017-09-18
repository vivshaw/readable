import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import { GET_CATEGORIES, GET_POSTS_BY_CATEGORY } from '../actions';

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

const actions = (state = [], action) => {
	return state.concat(action);
};

const posts = (state = [], action) => {
	switch (action.type) {
		case GET_POSTS_BY_CATEGORY:
			console.log(action.payload[0]);
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default combineReducers({
	categories: persistentReducer(categories),
	actions,
	posts
});
