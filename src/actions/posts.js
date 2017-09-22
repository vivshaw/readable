import { post } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { PostAPI } from '../utils/apis';

/*
 | Action types
 */

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

/*
 | Plain actions
 */

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

export const upvote = id => {
	return {
		type: UPVOTE,
		payload: id,
		offlineAction: {
			effect: post(PostAPI.postEndpoint(id), { option: 'upVote' }, postOpts)
		}
	};
};

export const downvote = id => {
	return {
		type: DOWNVOTE,
		offlineAction: {
			effect: post(PostAPI.postEndpoint(id), { option: 'downVote' }, postOpts)
		}
	};
};

/*
 | Thunks
 */

export const fetchAllPosts = () => dispatch => {
	PostAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)));
};

export const fetchPost = id => dispatch => {
	PostAPI.getPost(id).then(post => dispatch(receivePosts({ id: post })));
};
