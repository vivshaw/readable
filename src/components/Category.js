// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import difference from 'lodash/difference';

import {
	fetchPostComments,
	fetchCategoryPosts,
	upvote,
	downvote
} from '../actions';
import { groupCommentsByPosts, selectPostsByCategory } from '../reducers';

import PostList from './PostList';

class Category extends Component {
	componentDidMount() {
		this.props.initializePosts();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category !== this.props.category) {
			this.props.getPosts(nextProps.category);
		}

		if (nextProps.posts !== this.props.posts) {
			const newPosts = difference(nextProps.posts, this.props.posts);
			newPosts.map(post => this.props.getPostComments(post.id));
		}
	}

	render() {
		const { posts, commentsByPost, voteUp, voteDown } = this.props;

		return (
			<PostList
				posts={posts}
				commentsByPost={commentsByPost}
				voteUp={voteUp}
				voteDown={voteDown}
			/>
		);
	}
}

const mapStateToProps = (
	{ posts, comments },
	{ match: { params: { category } } }
) => ({
	category,
	posts: selectPostsByCategory(posts, category),
	commentsByPost: groupCommentsByPosts(comments, posts)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	initializePosts() {
		dispatch(fetchCategoryPosts(ownProps.match.params.category));
	},

	getPosts(category) {
		dispatch(fetchCategoryPosts(category));
	},

	getPostComments(id) {
		dispatch(fetchPostComments(id));
	},

	voteUp(id) {
		dispatch(upvote(id));
	},

	voteDown(id) {
		dispatch(downvote(id));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
