import { tryOfflineAction, busy } from './actions';

const waitFor = timeout => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const doEffect = (action, dispatch) => {
	const effect = action.offlineAction.effect;
	fetch(effect.url, effect.opts)
		.then(res => res.json())
		.then(data => console.log(data));
};

export const queueOfflineMiddleware = (store: any) => (next: any) => (
	action: any
) => {
	const result = next(action);
	const queue_offline = store.getState().queue_offline;

	// console.log(store.getState());

	if (
		queue_offline.queuedActions.length > 0 &&
		queue_offline.online &&
		!queue_offline.busy
	) {
		store.dispatch(busy(true));
		waitFor(3000).then(() => {
			doEffect(queue_offline.queuedActions[0], store.dispatch);
			store.dispatch(tryOfflineAction());
			store.dispatch(busy(false));
		});
	}

	return result;
};
