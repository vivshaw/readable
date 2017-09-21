import { getOpts } from './apiHelpers';

export const allPostsEndpoint = endpoint => endpoint;

export const postEndpoint = endpoint => id => `${endpoint}/${id}`;

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
