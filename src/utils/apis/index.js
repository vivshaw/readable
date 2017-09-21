import * as unboundCategoryApi from './CategoryAPI';
import * as unboundPostApi from './PostAPI';
import { bindApiToEndpoint } from './apiHelpers';

const apiRoot = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = apiRoot;
const postsEndpoint = `${apiRoot}/posts`;

export const CategoryAPI = bindApiToEndpoint(unboundCategoryApi)(
	categoriesEndpoint
);

export const PostAPI = bindApiToEndpoint(unboundPostApi)(postsEndpoint);
