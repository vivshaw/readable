import React, { Component } from 'react';
import { fetchCategories, fetchPostsByCategory } from '../actions';
import { connect } from 'react-redux';
import map from 'lodash/map';

class App extends Component {
	render() {
		const {
			categories,
			actions,
			posts,
			getCategories,
			getPostsByCategory
		} = this.props;

		let categoryList, actionList, postList;
		if (categories && actions) {
			categoryList = categories.map(category => (
				<li>
					<button onClick={() => getPostsByCategory(category)}>
						{category}
					</button>
				</li>
			));
			actionList = actions.map(action => <li>Action: {action.type}</li>);
		}

		if (posts) {
			postList = map(posts, post => <li>Post: {post.title}</li>);
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>redux test</h2>
					<button onClick={() => getCategories()}>Fetch</button>
				</div>

				{!categories.length && <p>No categories!</p>}
				{categories.length && (
					<div>
						<h3>categories</h3>
						<ul>{categoryList}</ul>
						<h3>actions</h3>
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
	actions: state.offlineActions
});

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(fetchCategories()),
	getPostsByCategory: category => dispatch(fetchPostsByCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
