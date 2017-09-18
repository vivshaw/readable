import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import {
	GET_CATEGORIES,
	GET_POSTS_BY_CATEGORY,
	CLEAR_OFFLINE_ACTIONS
} from '../actions';

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

const offlineActions = (state = [], action) => {
	if (navigator.onLine) {
		switch (action.type) {
			case CLEAR_OFFLINE_ACTIONS:
				return [];
			default:
				return state;
		}
	} else {
		switch (action.type) {
			default:
				return state.concat(action);
		}
	}
};

const posts = (state = {}, action) => {
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
	offlineActions: persistentReducer(offlineActions),
	posts
});
