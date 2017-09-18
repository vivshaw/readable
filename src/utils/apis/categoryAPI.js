import { fetchOpts } from './apiHelpers';

export const getAllCategories = endpoint => () => {
	return fetch(endpoint, fetchOpts).then(res => res.json());
};
