// @flow

import { applyMiddleware, compose } from 'redux';

import { enhanceReducer } from './reducers';
import { queueOfflineMiddleware } from './middleware';
import { checkBrowserOnline } from './utils';

export const queueOffline = (persist: any) => (createStore: any) => (
	reducer: any,
	preloadedState: any,
	enhancer: any
) => {
	let offlineEnhancedReducer;

	if (persist) {
		offlineEnhancedReducer = enhanceReducer(reducer, persist);
	} else {
		offlineEnhancedReducer = enhanceReducer(reducer);
	}

	const queueOfflineEnhancer = compose(enhancer);

	const store = createStore(
		offlineEnhancedReducer,
		preloadedState,
		applyMiddleware(queueOfflineMiddleware)
	);

	const onlineListener = checkBrowserOnline(store.dispatch, store.getState);
	window.addEventListener('online', onlineListener);
	window.addEventListener('offline', onlineListener);

	return store;
};

export const get = (url, opts = {}) => {
	return {
		url,
		opts: {
			method: 'GET',
			...opts
		}
	};
};
