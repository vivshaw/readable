// @flow

/* Posts */

export type Post_T = {
	id: string,
	timestamp: number,
	title: string,
	body: string,
	author: string,
	category: string,
	voteScore: number
};

/* Comments */

export type Comment_T = {
	id: string,
	timestamp: number,
	body: string,
	author: string,
	parentId: string,
	voteScore: string
};

/* An object with keys corresponding to object ids and values that are the comment with that key */
export type CommentsWrapper_T = { [string]: Comment_T };

/* An object with a timestamp and a string body, used for POSTing changes to comments */
export type CommentChanges_T = { timestamp: number, body: string };

/* Actions */

export type ReceiveComments_T = {
	type: 'RECEIVE_COMMENTS',
	comments: CommentsWrapper_T,
	id?: string
};
