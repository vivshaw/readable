//@flow

import { completeOfflineAction, busy } from './actions';

const waitFor = (timeout: number) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
};

const doEffect = (action: any, dispatch: any) => {
	const effect = action.offlineAction.effect;
	return fetch(effect.url, effect.opts).then(res => res.json());
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
		const currentAction = queue_offline.queuedActions[0];

		doEffect(currentAction, store.dispatch)
			.then(data => {
				console.log(data);
				store.dispatch(completeOfflineAction());
				store.dispatch(busy(false));
			})
			.catch(error => {
				console.log(error);

				if (currentAction.offlineAction.rollback) {
					store.dispatch(currentAction.offlineAction.rollback);
				}

				store.dispatch(completeOfflineAction());
				store.dispatch(busy(false));
			});
	}

	return result;
};
