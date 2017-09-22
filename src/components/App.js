import React, { Component } from 'react';
import {
	fetchCategories,
	fetchCategoryPosts,
	createPost,
	fetchAllPosts,
	fetchPost,
	upvote,
	downvote,
	fetchPostComments
} from '../actions';
import { connect } from 'react-redux';
import map from 'lodash/map';
import uuidv4 from 'uuid/v4';

class App extends Component {
	render() {
		const testPost = {
			id: uuidv4(),
			timestamp: Date.now(),
			title: 'Test Post',
			body: 'Please ignore',
			author: 'Testy',
			category: 'redux'
		};

		const testId = '8xf0y6ziyjabvozdd253nd';

		const {
			categories,
			posts,
			queue_offline,
			comments,
			getCategories,
			getPostsByCategory,
			makeTestPost,
			allPosts,
			getPost,
			voteUp,
			voteDown,
			getCommentsByPost
		} = this.props;

		let categoryList, postList, actionList, commentList;
		if (categories) {
			categoryList = categories.map(category => (
				<li>
					<button onClick={() => getPostsByCategory(category)}>
						{category}
					</button>
				</li>
			));
		}

		if (posts) {
			postList = map(posts, post => (
				<li>
					Post: {post.title}, {post.id}, {post.voteScore}
				</li>
			));
		}

		if (comments) {
			commentList = map(comments, comment => <li>Comment: {comment.id}</li>);
		}

		if (queue_offline.queuedActions) {
			actionList = queue_offline.queuedActions.map(action => (
				<li>{action.type}</li>
			));
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>redux test</h2>
					{queue_offline.online ? <h5>Online</h5> : <h5>Offline</h5>}
					<button onClick={() => getCategories()}>Fetch Categories</button>
					<button onClick={() => makeTestPost(testPost)}>Create Post</button>
					<button onClick={() => allPosts()}>All Posts</button>
					<button onClick={() => getPost(testId)}>Get Test Post</button>
					<button onClick={() => voteUp(testId)}>Upvote Test Post</button>
					<button onClick={() => voteDown(testId)}>Downvote Test Post</button>
					<button onClick={() => getCommentsByPost(testId)}>
						Get Test Post Comments
					</button>
				</div>

				{!categories.length && <p>No categories!</p>}
				{categories.length && (
					<div>
						<h3>categories</h3>
						<ul>{categoryList}</ul>

						<h3>offline actions</h3>
						<ul>{actionList}</ul>

						<h3>posts</h3>
						<ul>{postList}</ul>

						<h3>comments</h3>
						<ul>{commentList}</ul>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories,
	posts: state.posts,
	queue_offline: state.queue_offline,
	comments: state.comments
});

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(fetchCategories()),
	getPostsByCategory: category => dispatch(fetchCategoryPosts(category)),
	makeTestPost: post => dispatch(createPost(post)),
	allPosts: () => dispatch(fetchAllPosts()),
	getPost: id => dispatch(fetchPost(id)),
	voteUp: id => dispatch(upvote(id)),
	voteDown: id => dispatch(downvote(id)),
	getCommentsByPost: id => dispatch(fetchPostComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
