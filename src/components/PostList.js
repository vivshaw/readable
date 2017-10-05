// @flow

import React from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

import PostListItem from './PostListItem';

const PostListWrapper = styled.ol`
	padding-left: 10px;
	padding-right: 1.25em;
	margin-top: 1em;
	margin-bottom: 0.5em;
	list-style-type: decimal;
	list-style-position: outside;
`;

const PostList = ({ commentsByPost, posts, voteUp, voteDown }) => {
	const postList = map(posts, (post, index) => {
		const comments = commentsByPost[post.id] || [];

		return (
			<PostListItem
				key={post.id}
				index={index + 1}
				post={post}
				comments={comments}
				upvote={() => voteUp(post.id)}
				downvote={() => voteDown(post.id)}
			/>
		);
	});

	return (
		<div>
			<PostListWrapper>{postList}</PostListWrapper>
			<div style={{ clear: 'both' }} />
		</div>
	);
};

export default PostList;
