import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/* Plain actions */

export const receiveComments = comments => {
	return {
		type: RECEIVE_COMMENTS,
		comments
	};
};

/* Offline actions */

export const createComment = comment => {
	const formattedComment = {};
	formattedComment[comment.id] = { ...comment, voteScore: 0 };

	return {
		type: RECEIVE_COMMENTS,
		comments: formattedComment,
		offlineAction: {
			effect: post(CommentAPI.allCommentsEndpoint, comment, postOpts)
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
			)
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
			)
		}
	};
};

export const editComment = (id, changes) => {
	return {
		type: EDIT_COMMENT,
		id,
		changes,
		offlineAction: {
			effect: put(CommentAPI.commentEndpoint(id), changes, postOpts)
		}
	};
};

export const deleteComment = (id, commentChanges) => {
	return {
		type: DELETE_COMMENT,
		id,
		offlineAction: {
			effect: deleteMethod(CommentAPI.commentEndpoint(id), postOpts)
		}
	};
};

/* Thunks */

export const getComment = id => dispatch => {
	CommentAPI.getComment(id).then(comment => dispatch(receiveComments(comment)));
};
