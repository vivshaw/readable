import map from 'lodash/map';

import { CategoryAPI } from '../utils/apis';
import { receivePosts } from './posts';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const receiveCategories = categories => {
	return {
		type: GET_CATEGORIES,
		payload: categories
	};
};

export const fetchCategories = () => dispatch =>
	CategoryAPI.getAllCategories()
		.then(data => map(data.categories, 'name'))
		.then(categoryNames => dispatch(receiveCategories(categoryNames)));

export const fetchCategoryPosts = category => dispatch =>
	CategoryAPI.getCategoryPosts(category).then(data =>
		dispatch(receivePosts(data))
	);
