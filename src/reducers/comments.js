import omit from 'lodash/omit';

import { RECEIVE_COMMENTS, DELETE_COMMENT, EDIT_COMMENT } from '../actions';

const comments = (state = {}, action) => {
	const { id, comments, changes } = action;

	switch (action.type) {
		case RECEIVE_COMMENTS:
			return { ...state, ...comments };
		case EDIT_COMMENT:
			const editedComment = Object.assign({}, state[id], changes);
			return { ...state, [id]: editedComment };
		case DELETE_COMMENT:
			return omit(state, id);
		default:
			return state;
	}
};

export default comments;
