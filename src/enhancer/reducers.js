// @flow

import { ONLINE, CLEAR_OFFLINE_ACTIONS } from './actions';

const initialState = {
	online: navigator.onLine,
	queuedActions: [],
	trying: false
};

const enqueue = (state, action) => {
	const queue = state.queuedActions;
	return {
		...state,
		queuedActions: [...queue, action]
	};
};

const dequeue = state => {
	const [, ...rest] = state.queuedActions;
	return {
		...state,
		queuedActions: rest
	};
};

export const queueOfflineReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case ONLINE:
			return {
				...state,
				online: action.payload
			};
		case CLEAR_OFFLINE_ACTIONS:
			return {
				...state,
				queuedActions: []
			};
		default:
			if (state.online) {
				return state;
			} else {
				return enqueue(state, action);
			}
	}
};

export const enhanceReducer = (reducer: any, persist: any) => (
	state: any,
	action: any
) => {
	let queueOfflineState, restState;
	if (state) {
		const { queue_offline, ...rest } = state;
		queueOfflineState = queue_offline;
		restState = rest;
	}

	const offlineReducer = persist
		? persist(queueOfflineReducer)
		: queueOfflineReducer;

	return {
		...reducer(restState, action),
		queue_offline: offlineReducer(queueOfflineState, action)
	};
};
