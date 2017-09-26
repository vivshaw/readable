import { post, put, deleteMethod } from '../enhancer';
import { postOpts } from '../utils/apis/apiHelpers';
import { PostAPI } from '../utils/apis';

import { receiveComments } from './comments';

/*
 | Action types
 */

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

/*
 | Plain actions
 */

export const receivePosts = (posts, id) => {
	let action = {
		type: RECEIVE_POSTS,
		posts
	};

	if (id) {
		action.id = id;
	}

	return action;
};

export const createPost = newPost => {
	const formattedPost = {};
	const { id } = newPost;
	formattedPost[id] = { ...newPost, voteScore: 0 };

	return {
		type: RECEIVE_POSTS,
		posts: formattedPost,
		offlineAction: {
			effect: post(PostAPI.allPostsEndpoint, newPost, postOpts),
			rollback: {
				type: DELETE_POST,
				id
			}
		}
	};
};

export const upvote = id => {
	return {
		type: UPVOTE,
		id,
		offlineAction: {
			effect: post(PostAPI.postEndpoint(id), { option: 'upVote' }, postOpts),
			rollback: {
				type: DOWNVOTE,
				id
			}
		}
	};
};

export const downvote = id => {
	return {
		type: DOWNVOTE,
		id,
		offlineAction: {
			effect: post(PostAPI.postEndpoint(id), { option: 'downVote' }, postOpts),
			rollback: {
				type: UPVOTE,
				id
			}
		}
	};
};

export const editPost = (post, changes) => {
	const { id } = post;

	return {
		type: EDIT_POST,
		id,
		changes,
		offlineAction: {
			effect: put(PostAPI.postEndpoint(id), changes, postOpts),
			rollback: receivePosts({ [id]: post }, id)
		}
	};
};

export const deletePost = post => {
	const { id } = post;

	return {
		type: DELETE_POST,
		id,
		offlineAction: {
			effect: deleteMethod(PostAPI.postEndpoint(id), postOpts),
			rollback: receivePosts({ [id]: post }, id)
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
		dispatch(receivePosts(post, id));
	});
};

export const fetchPostComments = id => dispatch => {
	PostAPI.getPostComments(id).then(comments =>
		dispatch(receiveComments(comments))
	);
};
