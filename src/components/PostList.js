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

import PostListItem from './PostListItem';

import type { CommentsWrapper_T, PostsWrapper_T } from '../utils/types';

const PostListWrapper = styled.ol`
	padding-left: 3em;
	padding-right: 1.25em;
	margin-top: 1em;
	margin-bottom: 0.5em;
	list-style-type: decimal;
	list-style-position: outside;
`;

const PostList = ({ commentsByPost, posts, category, voteUp, voteDown }) => {
	const postList = map(posts, post => {
		const comments = commentsByPost[post.id] || [];

		return (
			<PostListItem
				key={post.id}
				post={post}
				comments={comments}
				category={category}
				upvote={() => voteUp(post.id)}
				downvote={() => voteDown(post.id)}
			/>
		);
	});

	return (
		<div>
			<PostListWrapper>
				{postList}
				{postList}
				{postList}
			</PostListWrapper>
			<div style={{ clear: 'both' }} />
		</div>
	);
};

export default PostList;
