import React, { Component } from 'react';
import { fetchCategories, fetchPostsByCategory } from '../actions';
import { connect } from 'react-redux';
import map from 'lodash/map';

class App extends Component {
	render() {
		const {
			categories,
			posts,
			queue_offline,
			getCategories,
			getPostsByCategory
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
			postList = map(posts, post => <li>Post: {post.title}</li>);
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
					<button onClick={() => getCategories()}>Clear</button>
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
	getPostsByCategory: category => dispatch(fetchPostsByCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
