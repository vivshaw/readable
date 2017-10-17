// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Comment from './Comment';
import EditablePostView from './EditablePostView';

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
		const {
			post,
			comments,
			voteUp,
			voteDown,
			voteUpComment,
			voteDownComment
		} = this.props;

		const commentList = comments.map(comment => (
			<Comment
				key={comment.id}
				comment={comment}
				upvote={() => voteUpComment(comment.id)}
				downvote={() => voteDownComment(comment.id)}
			/>
		));

		return (
			<div style={{ marginLeft: '10px' }}>
				{post && (
					<EditablePostView
						post={post}
						comments={comments}
						voteUp={voteUp}
						voteDown={voteDown}
						editing={true}
					/>
				)}

				<ul style={{ paddingLeft: '0' }}>{commentList}</ul>
			</div>
		);
	}
}

const mapStateToProps = (
	{ posts, comments },
	{ match: { params: { post } } }
) => ({
	post: posts[post],
	comments: selectCommentsByPost(post, comments)
});

const mapDispatchToProps = (dispatch, { match: { params: { post } } }) => ({
	getPost() {
		dispatch(fetchPost(post));
	},

	voteUp() {
		dispatch(upvote(post));
	},

	voteDown() {
		dispatch(downvote(post));
	},

	voteUpComment(id) {
		dispatch(upvoteComment(id));
	},

	voteDownComment(id) {
		dispatch(downvoteComment(id));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
