import { post } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { CommentAPI } from '../utils/apis';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';

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
			effect: post(CommentAPI.commentEndpoint, comment, postOpts)
		}
	};
};
