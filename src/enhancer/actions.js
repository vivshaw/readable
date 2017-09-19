export const ONLINE = '@@ONLINE';
export const CLEAR_OFFLINE_ACTIONS = 'CLEAR_OFFLINE_ACTIONS';

export const updateOnline = (online: boolean) => ({
	type: ONLINE,
	payload: online
});

export const clearActions = () => {
	return {
		type: CLEAR_OFFLINE_ACTIONS
	};
};
