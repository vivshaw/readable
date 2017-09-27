import omit from 'lodash/omit';

import { getOpts } from './apiHelpers';

import { EndpointType, GetType } from './index';

/*
 | Endpoints
 */

export const allCommentsEndpoint: EndpointType = endpoint: string => {
	return `${endpoint}`;
};

export const commentEndpoint: EndpointType = (endpoint: string) => (id: string) => {
	return `${endpoint}/${id}`;
};

export const getComment: GetType = (endpoint: string) => (id: string) => {
	const thisCommentEndpoint = `${endpoint}/${id}`;

	return fetch(thisCommentEndpoint, getOpts)
		.then(res => res.json())
		.then(data => {
			let comment = {};

			if (data.id) {
				comment[data.id] = omit(data, 'deleted');
			} else {
				comment.error = `Comment ${id} does not exist!`;
			}

			return comment;
		});
};
