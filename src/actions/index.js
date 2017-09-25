export {
	GET_CATEGORIES,
	receiveCategories,
	fetchCategories,
	fetchCategoryPosts
} from './categories';

export {
	RECEIVE_POSTS,
	CREATE_POST,
	UPVOTE,
	DOWNVOTE,
	EDIT_POST,
	receivePosts,
	createPost,
	fetchAllPosts,
	fetchPost,
	upvote,
	downvote,
	fetchPostComments,
	editPost
} from './posts';

export {
	RECEIVE_COMMENTS,
	CREATE_COMMENT,
	receiveComments,
	createComment,
	getComment,
	upvoteComment,
	downvoteComment
} from './comments';
