import { getOpts } from './apiHelpers';

import { EndpointType, GetType } from './index';

/*
 | Endpoints
 */

export const categoryEndpoint: EndpointType = (endpoint: string) => {
	return `${endpoint}/categories`;
};

/*
 | Top endpoint, /categories
 */

export const getAllCategories: EndpointType = (endpoint: string) => () => {
	const categoriesEndpoint = `${endpoint}/categories`;

	return fetch(categoriesEndpoint, getOpts).then(res => res.json());
};

/*
 | Sub endpoint, /:category/posts
 */

export const getCategoryPosts: GetType = (endpoint: string) => (
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
