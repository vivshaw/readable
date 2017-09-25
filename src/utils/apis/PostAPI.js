import omit from 'lodash/omit';

import { getOpts } from './apiHelpers';

/*
 | Endpoints
 */

export const allPostsEndpoint = endpoint => endpoint;

export const postEndpoint = endpoint => id => `${endpoint}/${id}`;

export const postCommentEndpoint = endpoint => id =>
	`${endpoint}/${id}/comments`;

/*
 | Top endpoint, /posts
 */

export const getAllPosts = endpoint => () => {
	return fetch(endpoint, getOpts)
		.then(res => res.json())
		.then(data =>
			data.reduce((posts, post) => {
				posts[post.id] = omit(post, 'deleted');
				return posts;
			}, {})
		);
};

/*
 | Sub endpoint, /posts/:id
 */

export const getPost = endpoint => id => {
	const thisPostEndpoint = `${endpoint}/${id}`;

	return fetch(thisPostEndpoint, getOpts)
		.then(res => res.json())
		.then(data => {
			let post = {};

			if (data.id) {
				post[data.id] = omit(data, 'deleted');
			} else {
				post.error = `Post ${id} does not exist!`;
			}

			return post;
		});
};

export const getPostComments = endpoint => id => {
	const thisPostEndpoint = `${endpoint}/${id}/comments`;

	return fetch(thisPostEndpoint, getOpts)
		.then(res => res.json())
		.then(data =>
			data.reduce((comments, comment) => {
				comments[comment.id] = omit(comment, 'deleted');
				return comments;
			}, {})
		);
};
