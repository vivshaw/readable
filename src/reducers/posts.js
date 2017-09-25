import omit from 'lodash/omit';

import { RECEIVE_POSTS, DELETE_POST, EDIT_POST } from '../actions';

const posts = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, ...action.payload };
		case EDIT_POST:
			const { id, changes } = action.payload;
			const editedPost = Object.assign({}, state[id], changes);
			return { ...state, [id]: editedPost };
		case DELETE_POST:
			return omit(state, action.payload);
		default:
			return state;
	}
};

export default posts;
