import { post } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

export const receiveComments = comments => {
	return {
		type: RECEIVE_COMMENTS,
		payload: comments
	};
};

export const createComment = comment => {
	return {
		type: CREATE_COMMENT,
		payload: comment,
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