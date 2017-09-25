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

			if (data.id) {
				comment[data.id] = data;
			} else {
				comment.error = `Comment ${id} does not exist!`;
			}

			return comment;
		});
};
