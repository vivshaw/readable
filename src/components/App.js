import React, { Component } from 'react';
import { fetchCategories, fetchCategoryPosts, createPost } from '../actions';
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

		const testId = '6ni6ok3ym7mf1p33lnez';

		const {
			categories,
			posts,
			queue_offline,
			getCategories,
			getPostsByCategory,
			makeTestPost
		} = this.props;

		let categoryList, postList, actionList;
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
					Post: {post.title}, {post.id}
				</li>
			));
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
					<button onClick={() => getCategories()}>Fetch</button>
					<button onClick={() => makeTestPost(testPost)}>Create Post</button>
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
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories,
	posts: state.posts,
	queue_offline: state.queue_offline
});

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(fetchCategories()),
	getPostsByCategory: category => dispatch(fetchCategoryPosts(category)),
	makeTestPost: post => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
