// @flow

import { GET_CATEGORIES } from '../actions';

const categories = (state: Array<string> = [], action: any) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

export default categories;
