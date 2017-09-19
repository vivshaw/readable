// @flow

const ONLINE = '@@ONLINE';

const updateOnline = (online: boolean) => ({
	type: ONLINE,
	payload: online
});

const checkBrowserOnline = (dispatch: any, getState: any) => (event: any) => {
	const newOnlineState = navigator.onLine;
	const currentOnlineState = getState().queue_offline.online;

	if (newOnlineState !== currentOnlineState) {
		dispatch(updateOnline(newOnlineState));
	}
};

const initialState = {
	online: navigator.onLine,
	queuedActions: []
};

const queueOfflineReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case ONLINE:
			return {
				...state,
				online: action.payload
			};
		default:
			return state;
	}
};

const enhanceReducer = (reducer: any) => (state: any, action: any) => {
	let queueOfflineState, restState;
	if (state) {
		const { queue_offline, ...rest } = state;
		queueOfflineState = queue_offline;
		restState = rest;
	}

	return {
		...reducer(restState, action),
		queue_offline: queueOfflineReducer(queueOfflineState, action)
	};
};

export const queueOffline = () => (createStore: any) => (
	reducer: any,
	preloadedState: any,
	enhancer: any
) => {
	const offlineEnhancedReducer = enhanceReducer(reducer);
	const store = createStore(offlineEnhancedReducer, preloadedState, enhancer);

	const onlineListener = checkBrowserOnline(store.dispatch, store.getState);
	window.addEventListener('online', onlineListener);
	window.addEventListener('offline', onlineListener);

	return store;
};
