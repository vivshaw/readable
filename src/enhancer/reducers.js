// @flow

import { ONLINE, TRY_OFFLINE_ACTION, BUSY } from './actions';

const initialState = {
	online: navigator.onLine,
	queuedActions: [],
	trying: false,
	busy: false
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
		case TRY_OFFLINE_ACTION:
			return dequeue(state);
		case BUSY:
			return {
				...state,
				busy: action.payload
			};
		default:
			if (action.offlineAction) {
				return enqueue(state, action);
			} else {
				return state;
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
