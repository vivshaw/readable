import React, { Component } from 'react';

class Comment extends Component {
	render() {
		const { comment, upvote, downvote } = this.props;

		return (
			<li>
				{comment.body}, {comment.author}, {comment.voteScore}{' '}
				<button onClick={() => upvote()}>up</button>{' '}
				<button onClick={() => downvote()}>down</button>
			</li>
		);
	}
}

export default Comment;
