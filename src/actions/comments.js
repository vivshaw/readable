import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const receiveComments = comments => {
	return {
		type: RECEIVE_COMMENTS,
		payload: comments
	};
};

export const createComment = comment => {
	const formattedComment = {};
	formattedComment[comment.id] = { ...comment, voteScore: 0 };

	return {
		type: RECEIVE_COMMENTS,
		payload: formattedComment,
		offlineAction: {
			effect: post(CommentAPI.allCommentsEndpoint, comment, postOpts)
		}
	};
};

export const getComment = id => dispatch => {
	CommentAPI.getComment(id).then(comment => dispatch(receiveComments(comment)));
};

export const upvoteComment = id => {
	return {
		type: UPVOTE_COMMENT,
		payload: id,
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
		payload: id,
		offlineAction: {
			effect: post(
				CommentAPI.commentEndpoint(id),
				{ option: 'downVote' },
				postOpts
			)
		}
	};
};

export const editComment = (id, commentChanges) => {
	return {
		type: EDIT_COMMENT,
		payload: id,
		offlineAction: {
			effect: put(CommentAPI.commentEndpoint(id), commentChanges, postOpts)
		}
	};
};

export const deleteComment = (id, commentChanges) => {
	return {
		type: DELETE_COMMENT,
		payload: id,
		offlineAction: {
			effect: deleteMethod(CommentAPI.commentEndpoint(id), postOpts)
		}
	};
};
