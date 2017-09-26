import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/* Plain actions */

export const receiveComments = (comments, id) => {
	let action = {
		type: RECEIVE_COMMENTS,
		comments
	};

	if (id) {
		action.id = id;
	}

	return action;
};

/* Offline actions */

export const createComment = comment => {
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

export const upvoteComment = id => {
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

export const downvoteComment = id => {
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

export const editComment = (comment, changes) => {
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

export const deleteComment = comment => {
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

export const getComment = id => dispatch => {
	CommentAPI.getComment(id).then(comment =>
		dispatch(receiveComments(comment, id))
	);
};
