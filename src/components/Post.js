// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchPost,
	upvote,
	downvote,
	upvoteComment,
	downvoteComment
} from '../actions';
import { selectCommentsByPost } from '../reducers';

class Post extends Component {
	componentWillMount() {
		this.props.getPost();
	}

	render() {
		const { post, comments, voteUpComment, voteDownComment } = this.props;

		const commentList = comments.map(comment => (
			<li key={comment.id}>
				{comment.body}, {comment.author}, {comment.voteScore}{' '}
				<button onClick={() => voteUpComment(comment.id)}>up</button>{' '}
				<button onClick={() => voteDownComment(comment.id)}>down</button>
			</li>
		));

		return (
			<div>
				{post && (
					<div>
						<p>{post.title}</p>
						<p>{post.author}</p>
						<p>{post.body}</p>
						<p>{post.voteScore}</p>
					</div>
				)}
				<h3>Comments</h3>
				<ul>{commentList}</ul>
			</div>
		);
	}
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
	const post = ownProps.match.params.post;

	return {
		post: posts[post],
		comments: selectCommentsByPost(post, comments)
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const post = ownProps.match.params.post;

	return {
		getPost() {
			dispatch(fetchPost(post));
		},

		voteUp(id) {
			dispatch(upvote(id));
		},

		voteDown(id) {
			dispatch(downvote(id));
		},

		voteUpComment(id) {
			dispatch(upvoteComment(id));
		},

		voteDownComment(id) {
			dispatch(downvoteComment(id));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
