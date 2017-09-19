// @flow

import { queueOfflineReducer, enhanceReducer } from './reducers';
import { checkBrowserOnline } from './utils';

export const queueOffline = (persist: any) => (createStore: any) => (
	reducer: any,
	preloadedState: any,
	enhancer: any
) => {
	let offlineEnhancedReducer;
	if (persist) {
		offlineEnhancedReducer = enhanceReducer(persist(reducer));
	} else {
		offlineEnhancedReducer = enhanceReducer(reducer);
	}

	const store = createStore(offlineEnhancedReducer, preloadedState, enhancer);

	const onlineListener = checkBrowserOnline(store.dispatch, store.getState);
	window.addEventListener('online', onlineListener);
	window.addEventListener('offline', onlineListener);

	return store;
};
