// @flow

import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import get from 'lodash/get';

import {
	RECEIVE_COMMENTS,
	DELETE_COMMENT,
	EDIT_COMMENT,
	UPVOTE_COMMENT,
	DOWNVOTE_COMMENT
} from '../actions';

import { selectPostIds } from './posts';

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

/*
 | Selectors
 */

export const groupCommentsByPosts = (
	comments: CommentsWrapper_T,
	posts: PostsWrapper_T
) => {
	const postIds = selectPostIds(posts);

	return reduce(
		comments,
		(byParent, { parentId, id }) => {
			if (postIds.includes(parentId)) {
				byParent[parentId] = get(byParent, parentId, []).concat(id);
			}

			return byParent;
		},
		{}
	);
};
