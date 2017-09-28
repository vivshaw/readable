// @flow

import map from 'lodash/map';

import { getOpts } from './apiHelpers';

import type { Endpoint_T, Get_T } from './index';

/*
 | Endpoints
 */

export const categoryEndpoint: Endpoint_T = (endpoint: string) => {
	return `${endpoint}/categories`;
};

/*
 | Top endpoint, /categories
 */

export const getAllCategories: Get_T = (endpoint: string) => () => {
	const categoriesEndpoint = `${endpoint}/categories`;

	return fetch(categoriesEndpoint, getOpts)
		.then(res => res.json())
		.then(data => {
			return map(data.categories, 'name');
		});
};

/*
 | Sub endpoint, /:category/posts
 */

export const getCategoryPosts: Get_T = (endpoint: string) => (
	category: string
) => {
	const categoryPostEndpoint = `${endpoint}/${category}/posts`;

	return fetch(categoryPostEndpoint, getOpts)
		.then(res => res.json())
		.then(data =>
			data.reduce((posts, post) => {
				posts[post.id] = post;
				return posts;
			}, {})
		);
};
