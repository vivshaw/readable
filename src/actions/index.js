import map from 'lodash/map';

import { CategoryAPI } from '../utils/apis';
import { fetchOpts } from '../utils/apis/apiHelpers';
import { get } from '../enhancer';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export const receiveCategories = categories => {
	return {
		type: GET_CATEGORIES,
		payload: categories,
		offlineAction: {
			effect: get(CategoryAPI.categoryEndpoint, fetchOpts)
		}
	};
};

export const fetchCategories = () => dispatch =>
	CategoryAPI.getAllCategories()
		.then(data => map(data.categories, 'name'))
		.then(categoryNames => dispatch(receiveCategories(categoryNames)));

export const receivePosts = posts => {
	return {
		type: GET_POSTS_BY_CATEGORY,
		payload: posts
	};
};

export const fetchPostsByCategory = category => dispatch =>
	CategoryAPI.getCategoryPosts(category).then(data =>
		dispatch(receivePosts(data))
	);
