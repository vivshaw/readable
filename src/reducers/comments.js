import { RECEIVE_COMMENTS } from '../actions';

const comments = (state = {}, action) => {
	const { id, comments, changes } = action;

	switch (action.type) {
		case RECEIVE_COMMENTS:
			return { ...state, ...comments };
		default:
			return state;
	}
};

export default comments;
