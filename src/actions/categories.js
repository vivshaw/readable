// @flow

import { CategoryAPI } from '../utils/apis';
import { receivePosts } from './posts';

/*
 | Action types
 */

export const GET_CATEGORIES = 'GET_CATEGORIES';

/*
 | Plain actions
 */

export const receiveCategories = (categories: Array<string>) => {
	return {
		type: GET_CATEGORIES,
		payload: categories
	};
};

/*
 | Thunks
 */

export const fetchCategories = () => (dispatch: any) =>
	CategoryAPI.getAllCategories().then(categories =>
		dispatch(receiveCategories(categories))
	);

export const fetchCategoryPosts = (category: string) => (dispatch: any) =>
	CategoryAPI.getCategoryPosts(category).then(data =>
		dispatch(receivePosts(data))
	);
