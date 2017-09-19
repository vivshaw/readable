import { clearActions } from './actions';

export const queueOfflineMiddleware = (store: any) => (next: any) => (
	action: any
) => {
	const result = next(action);
	const queue_offline = store.getState().queue_offline;

	console.log(store.getState());

	if (queue_offline.queuedActions.length > 0 && queue_offline.online) {
		store.dispatch(clearActions());
	}

	return result;
};
