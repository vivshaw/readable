import { getOpts } from './apiHelpers';

/*
 | Endpoints
 */

export const allCommentsEndpoint = endpoint => {
	return `${endpoint}`;
};

export const commentEndpoint = endpoint => id => {
	return `${endpoint}/${id}`;
};

export const getComment = endpoint => id => {
	const thisCommentEndpoint = `${endpoint}/${id}`;

	return fetch(thisCommentEndpoint, getOpts)
		.then(res => res.json())
		.then(data => {
			let comment = {};
			comment[data.id] = data;
			return comment;
		});
};
