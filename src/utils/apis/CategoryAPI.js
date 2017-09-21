import { getOpts } from './apiHelpers';

/*
 | Endpoints
 */

export const categoryEndpoint = endpoint => {
	return `${endpoint}/categories`;
};

/*
 | Top endpoint, /categories
 */

export const getAllCategories = endpoint => () => {
	const categoriesEndpoint = `${endpoint}/categories`;

	return fetch(categoriesEndpoint, getOpts).then(res => res.json());
};

/*
 | Sub endpoint, /:category/posts
 */

export const getCategoryPosts = endpoint => category => {
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
