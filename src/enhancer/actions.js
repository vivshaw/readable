// @flow

export const ONLINE = '@@ONLINE';
export const BUSY = '@@BUSY';
export const COMPLETE_OFFLINE_ACTION = 'COMPLETE_OFFLINE_ACTION';

export const updateOnline = (online: boolean) => ({
	type: ONLINE,
	payload: online
});

export const completeOfflineAction = () => {
	return {
		type: COMPLETE_OFFLINE_ACTION
	};
};

export const busy = (busyState: boolean) => {
	return {
		type: BUSY,
		busyState
	};
};
