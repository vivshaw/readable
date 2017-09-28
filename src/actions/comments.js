// @flow

import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

import type {
	Post_T,
	Comment_T,
	CommentsWrapper_T,
	CommentChanges_T,
	ReceiveComments_T
} from '../utils/types';

export const RECEIVE_COMMENTS: 'RECEIVE_COMMENTS' = 'RECEIVE_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/* Plain actions */

export const receiveComments = (comments: CommentsWrapper_T, id: string) => {
	let action: ReceiveComments_T = {
		type: RECEIVE_COMMENTS,
		comments
	};

	if (id) {
		action.id = id;
	}

	return action;
};

/* Offline actions */

export const createComment = (comment: Comment_T) => {
	const formattedComment = {};
	const { id } = comment;

	formattedComment[id] = { ...comment, voteScore: 0 };

	return {
		type: RECEIVE_COMMENTS,
		comments: formattedComment,
		id,
		offlineAction: {
			effect: post(CommentAPI.allCommentsEndpoint, comment, postOpts),
			rollback: {
				type: DELETE_COMMENT,
				id
			}
		}
	};
};

export const upvoteComment = (id: string) => {
	return {
		type: UPVOTE_COMMENT,
		id,
		offlineAction: {
			effect: post(
				CommentAPI.commentEndpoint(id),
				{ option: 'upVote' },
				postOpts
			),
			rollback: {
				type: DOWNVOTE_COMMENT,
				id
			}
		}
	};
};

export const downvoteComment = (id: string) => {
	return {
		type: DOWNVOTE_COMMENT,
		id,
		offlineAction: {
			effect: post(
				CommentAPI.commentEndpoint(id),
				{ option: 'downVote' },
				postOpts
			),
			rollback: {
				type: UPVOTE_COMMENT,
				id
			}
		}
	};
};

export const editComment = (comment: Comment_T, changes: CommentChanges_T) => {
	const { id } = comment;

	return {
		type: EDIT_COMMENT,
		id,
		changes,
		offlineAction: {
			effect: put(CommentAPI.commentEndpoint(id), changes, postOpts),
			rollback: receiveComments({ [id]: comment }, id)
		}
	};
};

export const deleteComment = (comment: Comment_T) => {
	const { id } = comment;

	return {
		type: DELETE_COMMENT,
		id,
		offlineAction: {
			effect: deleteMethod(CommentAPI.commentEndpoint(id), postOpts),
			rollback: receiveComments({ [id]: comment }, id)
		}
	};
};

/* Thunks */

export const getComment = (id: string) => (dispatch: any) => {
	CommentAPI.getComment(id).then(comment =>
		dispatch(receiveComments(comment, id))
	);
};
