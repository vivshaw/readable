import fetchOpts from './fetchOpts';

export const getAllCategories = endpoint => () => {
	console.log(endpoint);
	return fetch(endpoint, fetchOpts).then(res => res.json());
};
