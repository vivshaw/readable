// @flow

import { applyMiddleware } from 'redux';

import { enhanceReducer } from './reducers';
import { queueOfflineMiddleware } from './middleware';
import { checkBrowserOnline } from './utils';

/* Flow types */

type HeaderType = { [string]: string };

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

export const get = (url: string, opts: ?HeaderType = {}) => {
	return {
		url,
		opts: {
			...opts
		}
	};
};

export const post = (url: string, body: any, opts: ?HeaderType = {}) => {
	const result = {
		url,
		opts: {
			...opts,
			method: 'post',
			body: JSON.stringify(body)
		}
	};

	return result;
};

export const put = (url: string, body: any, opts: ?HeaderType = {}) => {
	const result = {
		url,
		opts: {
			...opts,
			method: 'put',
			body: JSON.stringify(body)
		}
	};

	return result;
};

export const deleteMethod = (url: string, opts: ?HeaderType = {}) => {
	return {
		url,
		opts: {
			...opts,
			method: 'delete'
		}
	};
};
