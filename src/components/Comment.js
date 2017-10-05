import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

const Author = styled.span`font-weight: bold;`;
const VoteButtons = styled.div`margin-right: 10px;`;
const ListItem = styled.li`
	display: block;
	list-style-type: none;
	list-style-position: inside;
	padding-left: 10px;
	margin-top: 30px;
	margin-bottom: 15px;
`;

const CommentMeta = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.palette.accent2Color};
`;
const CommentBody = styled.div`margin-bottom: 15px;`;

class Comment extends Component {
	render() {
		const { comment, upvote, downvote } = this.props;

		return (
			<ListItem>
				<CommentMeta>
					<VoteButtons>
						<div onClick={() => upvote()}>u</div>
						<div onClick={() => downvote()}>d</div>
					</VoteButtons>
					<Author>{comment.author}</Author> <TimeAgo date={comment.timestamp} />{' '}
					| {comment.voteScore} points
				</CommentMeta>
				<CommentBody>
					<p>{comment.body}</p>
				</CommentBody>
			</ListItem>
		);
	}
}

export default Comment;
