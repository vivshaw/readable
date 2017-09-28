// @flow

import omit from 'lodash/omit';

import { getOpts } from './apiHelpers';

import type { Endpoint_T, Get_T } from './index';

/*
 | Endpoints
 */

export const allPostsEndpoint: Endpoint_T = (endpoint: string) => endpoint;

export const postEndpoint: Endpoint_T = (endpoint: string) => (id: string) =>
	`${endpoint}/${id}`;

export const postCommentEndpoint: Endpoint_T = (endpoint: string) => (
	id: string
) => `${endpoint}/${id}/comments`;

/*
 | Top endpoint, /posts
 */

export const getAllPosts: Get_T = (endpoint: string) => () => {
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

export const getPost: Get_T = (endpoint: string) => (id: string) => {
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

export const getPostComments: Get_T = (endpoint: string) => (id: string) => {
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
