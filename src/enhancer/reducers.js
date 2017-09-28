// @flow

import { ONLINE, COMPLETE_OFFLINE_ACTION, BUSY } from './actions';

/* Flow types */

type queueOfflineState = {
	online: boolean,
	queuedActions: Array<any>,
	trying: boolean,
	busy: boolean
};

const initialState: queueOfflineState = {
	online: navigator.onLine,
	queuedActions: [],
	trying: false,
	busy: false
};

const enqueue = (state: queueOfflineState, action: any) => {
	const queue = state.queuedActions;

	return {
		...state,
		queuedActions: [...queue, action]
	};
};

const dequeue = (state: queueOfflineState) => {
	const [, ...rest] = state.queuedActions;
	return {
		...state,
		queuedActions: rest
	};
};

export const queueOfflineReducer = (
	state: queueOfflineState = initialState,
	action: any
) => {
	switch (action.type) {
		case ONLINE:
			return {
				...state,
				online: action.payload
			};
		case COMPLETE_OFFLINE_ACTION:
			return dequeue(state);
		case BUSY:
			const { busyState } = action;
			return {
				...state,
				busy: busyState
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
