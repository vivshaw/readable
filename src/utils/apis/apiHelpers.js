import reduce from 'lodash/reduce';

export const fetchOpts = {
	headers: { Authorization: 'whatever-you-want' }
};

export const bindApiToEndpoint = api => endpoint =>
	reduce(
		api,
		(bound, apiFunc, apiName) => {
			bound[apiName] = apiFunc(endpoint);
			return bound;
		},
		{}
	);
