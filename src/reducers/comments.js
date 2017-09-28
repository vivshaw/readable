// @flow

import omit from 'lodash/omit';

import {
	RECEIVE_COMMENTS,
	DELETE_COMMENT,
	EDIT_COMMENT,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT
} from '../actions';

import type { CommentsWrapper_T } from '../utils/types';

const comments = (state: CommentsWrapper_T = {}, action: any) => {
	const { id, comments, changes } = action;

	switch (action.type) {
		case RECEIVE_COMMENTS:
			if (!comments.error) {
				return { ...state, ...comments };
			} else if (id) {
				return omit(state, id);
			}
			return state;
		case EDIT_COMMENT:
			const editedComment = Object.assign({}, state[id], changes);
			return { ...state, [id]: editedComment };
		case UPVOTE_COMMENT:
			const upvotedScore = state[id].voteScore + 1;
			return { ...state, [id]: { ...state[id], voteScore: upvotedScore } };
		case DOWNVOTE_COMMENT:
			const downvotedScore = state[id].voteScore - 1;
			return { ...state, [id]: { ...state[id], voteScore: downvotedScore } };
		case DELETE_COMMENT:
			return omit(state, id);
		default:
			return state;
	}
};

export default comments;
