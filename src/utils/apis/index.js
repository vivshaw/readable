// @flow

import * as unboundCategoryApi from './CategoryAPI';
import * as unboundPostApi from './PostAPI';
import * as unboundCommentApi from './CommentAPI';
import { bindApiToEndpoint } from './apiHelpers';

export type Endpoint_T = (endpoint: string) => string | (string => string);
export type Get_T = (endpoint: string) => (() => any) | (string => any);
export type API_T = { [string]: Endpoint_T | Get_T };

const apiRoot = process.env.REACT_APP_READABLE_API || 'http://localhost:3001';
const categoriesEndpoint = apiRoot;
const postsEndpoint = `${apiRoot}/posts`;
const commentsEndpoint = `${apiRoot}/comments`;

export const CategoryAPI = bindApiToEndpoint(unboundCategoryApi)(
	categoriesEndpoint
);

export const PostAPI = bindApiToEndpoint(unboundPostApi)(postsEndpoint);
export const CommentAPI = bindApiToEndpoint(unboundCommentApi)(
	commentsEndpoint
);
