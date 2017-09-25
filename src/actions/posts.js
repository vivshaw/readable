import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { PostAPI } from '../utils/apis';

import { receiveComments } from './comments';

/*
 | Action types
 */

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

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

export const editPost = (id, postChanges) => {
	return {
		type: EDIT_POST,
		offlineAction: {
			effect: put(PostAPI.postEndpoint(id), postChanges, postOpts)
		}
	};
};

export const deletePost = id => {
	return {
		type: DELETE_POST,
		offlineAction: {
			effect: deleteMethod(PostAPI.postEndpoint(id), postOpts)
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
	PostAPI.getPost(id).then(post => {
		dispatch(receivePosts(post));
	});
};

export const fetchPostComments = id => dispatch => {
	PostAPI.getPostComments(id).then(comments =>
		dispatch(receiveComments(comments))
	);
};
