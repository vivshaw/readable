// @flow

import reduce from 'lodash/reduce';

import type { ApiType } from './index';

export const getOpts = {
	headers: { Authorization: 'whatever-you-want' }
};

export const postOpts = {
	headers: {
		Authorization: 'whatever-you-want',
		'Content-Type': 'application/json'
	}
};

export const bindApiToEndpoint = (api: ApiType) => (endpoint: string) =>
	reduce(
		api,
		(bound, apiFunc, apiName) => {
			bound[apiName] = apiFunc(endpoint);
			return bound;
		},
		{}
	);
