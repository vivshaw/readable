import { combineReducers } from 'redux';

import { GET_CATEGORIES } from '../actions';

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

export default combineReducers({
	categories,
	actions
});
