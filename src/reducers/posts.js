import omit from 'lodash/omit';

import {
	RECEIVE_POSTS,
	DELETE_POST,
	EDIT_POST,
	UPVOTE,
	DOWNVOTE
} from '../actions';

const posts = (state = {}, action) => {
	const { id, posts, changes } = action;

	switch (action.type) {
		case RECEIVE_POSTS:
			return { ...state, ...posts };
		case EDIT_POST:
			const editedPost = Object.assign({}, state[id], changes);
			return { ...state, [id]: editedPost };
		case UPVOTE:
			const upvotedScore = state[id].voteScore + 1;
			return { ...state, [id]: { ...state[id], voteScore: upvotedScore } };
		case DOWNVOTE:
			const downvotedScore = state[id].voteScore - 1;
			return { ...state, [id]: { ...state[id], voteScore: downvotedScore } };
		case DELETE_POST:
			return omit(state, action.payload);
		default:
			return state;
	}
};

export default posts;
