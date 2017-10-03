// @flow

import { combineReducers } from 'redux';
import { persistentReducer } from 'redux-pouchdb';

import posts from './posts';
import categories from './categories';
import comments from './comments';

const rootReducer = combineReducers({
	categories: persistentReducer(categories),
	posts,
	comments
});

export default rootReducer;

export { groupCommentsByPosts } from './comments';
export { selectPostsByCategory } from './categories';
