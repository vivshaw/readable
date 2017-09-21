import { post } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { PostAPI } from '../utils/apis';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';

export const receivePosts = posts => {
	return {
		type: RECEIVE_POSTS,
		payload: posts
	};
};

export const createPost = newPost => {
	return {
		type: CREATE_POST,
		payload: newPost,
		offlineAction: {
			effect: post(PostAPI.allPostsEndpoint, newPost, postOpts)
		}
	};
};
