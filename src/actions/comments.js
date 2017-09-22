import { post } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const receiveComments = comments => {
	return {
		type: RECEIVE_COMMENTS,
		payload: comments
	};
};
