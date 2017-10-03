// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import difference from 'lodash/difference';
import map from 'lodash/map';

import PostList from './PostList';

import { fetchPostComments, fetchAllPosts, upvote, downvote } from '../actions';
import { groupCommentsByPosts } from '../reducers';

class Home extends Component {
	componentDidMount() {
		this.props.getAllPosts();
	}

	componentWillReceiveProps(nextProps) {
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

const mapStateToProps = ({ comments, posts }) => ({
	posts: map(posts, post => post),
	commentsByPost: groupCommentsByPosts(comments, posts)
});

const mapDispatchToProps = dispatch => ({
	getAllPosts() {
		dispatch(fetchAllPosts());
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
