import omit from 'lodash/omit';

import { RECEIVE_POSTS, DELETE_POST } from '../actions';

const posts = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, ...action.payload };
		case DELETE_POST:
			return omit(state, action.payload);
		default:
			return state;
	}
};

export default posts;
