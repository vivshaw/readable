import { CategoryAPI } from '../utils/apis';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const receiveCategories = categories => {
	return {
		type: GET_CATEGORIES,
		payload: categories
	};
};

export const fetchCategories = () => dispatch =>
	CategoryAPI.getAllCategories()
		.then(data => data.categories.map(category => category.name))
		.then(categoryNames => dispatch(receiveCategories(categoryNames)));
