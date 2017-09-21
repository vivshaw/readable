export const ONLINE = '@@ONLINE';
export const TRY_OFFLINE_ACTION = 'TRY_OFFLINE_ACTION';

export const updateOnline = (online: boolean) => ({
	type: ONLINE,
	payload: online
});

export const clearActions = () => {
	return {
		type: TRY_OFFLINE_ACTION
	};
};
