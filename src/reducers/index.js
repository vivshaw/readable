import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import { GET_CATEGORIES, RECEIVE_POSTS } from '../actions';

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

const posts = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default combineReducers({
	categories: persistentReducer(categories),
	posts
});
