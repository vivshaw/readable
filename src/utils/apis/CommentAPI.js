// @flow

import omit from 'lodash/omit';

import { getOpts } from './apiHelpers';

import type { Endpoint_T, Get_T } from './index';

/*
 | Endpoints
 */

export const allCommentsEndpoint: Endpoint_T = (endpoint: string) => {
	return `${endpoint}`;
};

export const commentEndpoint: Endpoint_T = (endpoint: string) => (
	id: string
) => {
	return `${endpoint}/${id}`;
};

export const getComment: Get_T = (endpoint: string) => (id: string) => {
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
