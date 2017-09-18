import { categoriesAPI } from '../utils/categoryAPI';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const receiveCategories = categories => {
	return {
		type: GET_CATEGORIES,
		payload: categories
	};
};

export const fetchCategories = () => dispatch =>
	categoriesAPI()
		.then(data => data.categories.map(category => category.name))
		.then(categoryNames => dispatch(receiveCategories(categoryNames)));
