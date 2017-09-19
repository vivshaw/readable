import { fetchOpts } from './apiHelpers';

export const categoryEndpoint = endpoint => {
	return `${endpoint}/categories`;
};

export const getAllCategories = endpoint => () => {
	const categoriesEndpoint = `${endpoint}/categories`;

	return fetch(categoriesEndpoint, fetchOpts).then(res => res.json());
};

export const getCategoryPosts = endpoint => category => {
	const categoryPostEndpoint = `${endpoint}/${category}/posts`;

	return fetch(categoryPostEndpoint, fetchOpts)
		.then(res => res.json())
		.then(data =>
			data.reduce((posts, post) => {
				posts[post.id] = post;
				return posts;
			}, {})
		);
};
