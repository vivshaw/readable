import omit from 'lodash/omit';

import { RECEIVE_COMMENTS, DELETE_COMMENT } from '../actions';

const comments = (state = {}, action) => {
	const { id, comments, changes } = action;

	switch (action.type) {
		case RECEIVE_COMMENTS:
			return { ...state, ...comments };
		case DELETE_COMMENT:
			return omit(state, id);
		default:
			return state;
	}
};

export default comments;
