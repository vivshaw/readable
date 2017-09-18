import * as catt from './categoryAPI';
import { allCategories } from './categoryAPI';
import reduce from 'lodash/reduce';

const apiRoot = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = `${apiRoot}/categories`;

const bindApiToEndpoint = api => endpoint =>
	reduce(
		api,
		(bound, apiFunc, apiName) => {
			bound[apiName] = apiFunc(endpoint);
			return bound;
		},
		{}
	);

export const CategoryAPI = bindApiToEndpoint(catt)(categoriesEndpoint);
