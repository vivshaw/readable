import * as unboundCategoryApi from './categoryAPI';
import { bindApiToEndpoint } from './apiHelpers';

const apiRoot = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = apiRoot;

export const CategoryAPI = bindApiToEndpoint(unboundCategoryApi)(
	categoriesEndpoint
);
