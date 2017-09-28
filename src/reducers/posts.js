// @flow

import omit from 'lodash/omit';

import {
	RECEIVE_POSTS,
	DELETE_POST,
	EDIT_POST,
	UPVOTE,
	DOWNVOTE
} from '../actions';

import type { PostsWrapper_T } from '../utils/types';

const posts = (state: PostsWrapper_T = {}, action: any) => {
	const { id, posts, changes } = action;

	switch (action.type) {
		case RECEIVE_POSTS:
			if (!posts.error) {
				return { ...state, ...posts };
			} else if (id) {
				return omit(state, id);
			}
			return state;
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
			return omit(state, id);
		default:
			return state;
	}
};

export default posts;
