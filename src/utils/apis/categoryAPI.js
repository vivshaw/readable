import fetchOpts from './fetchOpts';

export const allCategories = endpoint => () => {
	console.log(endpoint);
	return fetch(endpoint, fetchOpts).then(res => res.json());
};
