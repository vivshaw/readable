// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';
import get from 'lodash/get';

import PostList from './PostList';

import { fetchPostComments, fetchAllPosts, upvote, downvote } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.getAllPosts();
	}

	componentWillUpdate(nextProps) {
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

const selectPostIds = (posts: PostsWrapper_T) => map(posts, 'id');

const groupCommentsByPosts = (
	comments: CommentsWrapper_T,
	posts: PostsWrapper_T
) => {
	const postIds = selectPostIds(posts);

	return reduce(
		comments,
		(byParent, { parentId, id }) => {
			if (postIds.includes(parentId)) {
				byParent[parentId] = get(byParent, parentId, []).concat(id);
			}

			return byParent;
		},
		{}
	);
};

const mapStateToProps = state => {
	return {
		posts: state.posts,
		commentsByPost: groupCommentsByPosts(state.comments, state.posts)
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const ownCategory = ownProps.match.params.category;

	return {
		getAllPosts() {
			dispatch(fetchAllPosts(ownCategory));
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
