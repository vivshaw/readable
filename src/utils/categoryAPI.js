import fetchOpts from './fetchOpts';
const categoriesEndpoint = 'http://localhost:3001/categories';

export const categoriesAPI = () => {
	return fetch(categoriesEndpoint, fetchOpts).then(res => res.json());
};
