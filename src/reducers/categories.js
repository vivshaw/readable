// @flow

import filter from 'lodash/filter';

import { GET_CATEGORIES } from '../actions';

const categories = (state: Array<string> = [], action: any) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

export default categories;

/*
 | Selectors
 */

export const selectPostsByCategory = (
	posts: PostsWrapper_T,
	category: string
) => filter(posts, post => post.category === category);
