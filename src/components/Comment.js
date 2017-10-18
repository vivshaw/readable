import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { editComment } from '../actions';

const Author = styled.span`font-weight: bold;`;
const VoteButtons = styled.div`margin-right: 10px;`;
const ListItem = styled.li`
	display: block;
	list-style-type: none;
	list-style-position: inside;
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
	state = {
		editing: false,
		body: this.props.comment.body
	};

	toggleEdit = () => {
		this.setState(state => ({
			editing: !state.editing
		}));
	};

	submitEdit = () => {
		const changes = {
			body: this.state.body,
			timestamp: Date.now()
		};

		this.props.edit(this.props.comment, changes);
		this.toggleEdit();
	};

	discard = () => {
		this.setState(state => ({
			body: this.props.comment.body,
			editing: false
		}));
	};

	onChangeBody = event => {
		this.setState({ body: event.target.value });
	};

	render() {
		const { comment, upvote, downvote } = this.props;
		const { editing, body } = this.state;

		if (!editing) {
			return (
				<ListItem>
					<CommentMeta>
						<VoteButtons>
							<div onClick={() => upvote()}>u</div>
							<div onClick={() => downvote()}>d</div>
						</VoteButtons>
						<Author>{comment.author}</Author>{' '}
						<TimeAgo date={comment.timestamp} /> | {comment.voteScore} points
					</CommentMeta>
					<CommentBody>
						<p>
							{comment.body}
							<button onClick={this.toggleEdit}>Edit</button>
						</p>
					</CommentBody>
				</ListItem>
			);
		} else {
			return (
				<ListItem>
					<CommentMeta>
						<VoteButtons>
							<div onClick={() => upvote()}>u</div>
							<div onClick={() => downvote()}>d</div>
						</VoteButtons>
						<Author>{comment.author}</Author>{' '}
						<TimeAgo date={comment.timestamp} /> | {comment.voteScore} points
					</CommentMeta>
					<CommentBody>
						<p>
							<input name="body" value={body} onChange={this.onChangeBody} />
							<button onClick={this.discard}>Discard</button>
							<button onClick={this.submitEdit}>Submit</button>
						</p>
					</CommentBody>
				</ListItem>
			);
		}
	}
}

const mapDispatchToProps = dispatch => ({
	edit(comment, changes) {
		dispatch(editComment(comment, changes));
	}
});

export default connect(null, mapDispatchToProps)(Comment);
