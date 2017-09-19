import { updateOnline } from './actions';

export const checkBrowserOnline = (dispatch: any, getState: any) => (
	event: any
) => {
	const newOnlineState = navigator.onLine;
	const currentOnlineState = getState().queue_offline.online;

	if (newOnlineState !== currentOnlineState) {
		dispatch(updateOnline(newOnlineState));
	}
};
