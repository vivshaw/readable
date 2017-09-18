import { allCategories } from './categoryAPI';

const api = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = `${api}/categories`;

export const CategoryAPI = {
	getAllCategories: allCategories(categoriesEndpoint)
};
