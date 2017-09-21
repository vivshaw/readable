import { getOpts } from './apiHelpers';

export const allPostsEndpoint = endpoint => endpoint;

export const postEndpoint = endpoint => id => `${endpoint}/${id}`;
