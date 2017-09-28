// @flow

import reduce from 'lodash/reduce';

import type { API_T } from './index';

export const getOpts = {
	headers: { Authorization: 'whatever-you-want' }
};

export const postOpts = {
	headers: {
		Authorization: 'whatever-you-want',
		'Content-Type': 'application/json'
	}
};

export const bindApiToEndpoint = (api: API_T) => (endpoint: string) =>
	reduce(
		api,
		(bound, apiFunc, apiName) => {
			bound[apiName] = apiFunc(endpoint);
			return bound;
		},
		{}
	);
