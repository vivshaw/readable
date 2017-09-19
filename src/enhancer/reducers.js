// @flow

import { updateOnline, ONLINE, CLEAR_OFFLINE_ACTIONS } from './actions';
import { persistentReducer } from 'redux-pouchdb';

const initialState = {
	online: navigator.onLine,
	queuedActions: []
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
				return {
					...state,
					queuedActions: [...state.queuedActions, action]
				};
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
