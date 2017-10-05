// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Comment from './Comment';

import {
	fetchPost,
	upvote,
	downvote,
	upvoteComment,
	downvoteComment
} from '../actions';
import { selectCommentsByPost } from '../reducers';

const ListItem = styled.li`
	margin-top: 15px;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
`;

const PostTitle = styled.div`
	font-size: 18px;
	color: ${props => props.theme.palette.accent2Color};
`;

const TitleLink = styled(Link)`
	font-size: 18px;
	color: ${props => props.theme.palette.accent1Color};
	text-decoration: none;
`;

const PostMeta = styled.div`
	color: ${props => props.theme.palette.accent2Color};
`;

const Author = styled.span`font-weight: bold;`;

const MetaLink = styled(Link)`
	color: ${props => props.theme.palette.accent2Color};
	text-decoration: none;
`;

const VoteButtons = styled.div`margin-left: 10px;`;

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
			<div>
				{post && (
					<ListItem>
						<VoteButtons>
							<div onClick={() => voteUp()}>u</div>
							<div onClick={() => voteDown()}>d</div>
						</VoteButtons>
						<VoteButtons>
							<PostTitle>
								<TitleLink to={`/${post.category}/${post.id}`}>
									{post.title}
								</TitleLink>
							</PostTitle>

							<PostMeta>
								{post.voteScore} points by <Author>{post.author}</Author>{' '}
								<TimeAgo date={post.timestamp} /> |{' '}
								<MetaLink to={`/${post.category}/${post.id}`}>
									{comments.length} comments
								</MetaLink>{' '}
							</PostMeta>
						</VoteButtons>
					</ListItem>
				)}

				<ul>{commentList}</ul>
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
