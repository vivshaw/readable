import { getOpts } from './apiHelpers';

/*
 | Endpoints
 */

export const allPostsEndpoint = endpoint => endpoint;

export const postEndpoint = endpoint => id => `${endpoint}/${id}`;

/*
 | Top endpoint, /posts
 */

export const getAllPosts = endpoint => () => {
	return fetch(endpoint, getOpts)
		.then(res => res.json())
		.then(data =>
			data.reduce((posts, post) => {
				posts[post.id] = post;
				return posts;
			}, {})
		);
};
