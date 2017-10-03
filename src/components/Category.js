// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';
import get from 'lodash/get';
import styled from 'styled-components';

import {
	fetchPostComments,
	fetchCategoryPosts,
	upvote,
	downvote
} from '../actions';

import PostList from './PostList';
import PostListItem from './PostListItem';

import type { CommentsWrapper_T, PostsWrapper_T } from '../utils/types';

class Category extends Component {
	componentDidMount() {
		this.props.initializePosts();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category !== this.props.category) {
			this.props.getPosts(nextProps.category);
		}
	}

	componentWillUpdate(nextProps) {
		if (nextProps.posts !== this.props.posts) {
			const newPosts = difference(nextProps.posts, this.props.posts);
			newPosts.map(post => this.props.getPostComments(post.id));
		}
	}

	render() {
		const {
			posts,
			commentsByPost,
			voteUp,
			voteDown,
			match: { params: { category } }
		} = this.props;

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

const selectPostsByCategory = (posts: PostsWrapper_T, category: string) =>
	filter(posts, post => post.category === category);

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

const mapStateToProps = ({ posts, comments }, ownProps) => {
	const category = ownProps.match.params.category;

	return {
		category,
		posts: selectPostsByCategory(posts, category),
		commentsByPost: groupCommentsByPosts(comments, posts)
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const ownCategory = ownProps.match.params.category;

	return {
		initializePosts() {
			dispatch(fetchCategoryPosts(ownCategory));
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
