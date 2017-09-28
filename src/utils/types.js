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

/* An object with keys corresponding to post ids and values that are the post with that id */
export type PostsWrapper_T = { [string]: Post_T };

/* An object with a string title and body, used for PUTing changes to posts */
export type PostChanges_T = { title: string, body: string };

/* Comments */

export type Comment_T = {
	id: string,
	timestamp: number,
	body: string,
	author: string,
	parentId: string,
	voteScore: number
};

/* An object with keys corresponding to comment ids and values that are the comment with that id */
export type CommentsWrapper_T = { [string]: Comment_T };

/* An object with a timestamp and a string body, used for PUTing changes to comments */
export type CommentChanges_T = { timestamp: number, body: string };

/* Actions */

export type ReceiveComments_T = {
	type: 'RECEIVE_COMMENTS',
	comments: CommentsWrapper_T,
	id?: string
};

export type ReceivePosts_T = {
	type: 'RECEIVE_POSTS',
	posts: PostsWrapper_T,
	id?: string
};
