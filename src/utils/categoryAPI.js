import fetchOpts from './fetchOpts';
const api = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = `${api}/categories`;

export const categoriesAPI = () => {
	console.log(categoriesEndpoint);
	return fetch(categoriesEndpoint, fetchOpts).then(res => res.json());
};
