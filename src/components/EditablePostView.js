import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { editPost } from '../actions';

import NewComment from './NewComment';

const ListItem = styled.div`
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

const VoteButtons = styled.div`margin-right: 10px;`;

class EditablePostView extends Component {
	state = {
		editing: false,
		title: this.props.post.title,
		body: this.props.post.body
	};

	toggleEdit = () => {
		this.setState(state => ({
			editing: !state.editing
		}));
	};

	submitEdit = () => {
		const changes = {
			title: this.state.title,
			body: this.state.body
		};

		this.props.edit(changes);
		this.toggleEdit();
	};

	discard = () => {
		this.setState(state => ({
			body: this.props.post.body,
			title: this.props.post.title,
			editing: false
		}));
	};

	onChangeTitle = event => {
		this.setState({ title: event.target.value });
	};

	onChangeBody = event => {
		this.setState({ body: event.target.value });
	};

	render() {
		const { post, comments, voteUp, voteDown } = this.props;
		const { editing, title, body, author } = this.state;

		if (editing) {
			return (
				<div>
					<ListItem>
						<VoteButtons>
							<div onClick={() => voteUp()}>u</div>
							<div onClick={() => voteDown()}>d</div>
						</VoteButtons>
						<VoteButtons>
							<PostTitle>
								<input
									name="title"
									value={title}
									onChange={this.onChangeTitle}
								/>
							</PostTitle>

							<PostMeta>
								{post.voteScore} points by <Author>{post.author}</Author>{' '}
								<TimeAgo date={post.timestamp} /> |{' '}
								<MetaLink to={`/${post.category}/${post.id}`}>
									{comments.length} comments
								</MetaLink>
							</PostMeta>
						</VoteButtons>
					</ListItem>
					<p>
						<input name="body" value={body} onChange={this.onChangeBody} />
					</p>
					<button onClick={this.discard}>Discard</button>
					<button onClick={this.submitEdit}>Submit</button>
					<p>New comment:</p>
					<NewComment parentId={post.id} />
				</div>
			);
		} else {
			return (
				<div>
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
								</MetaLink>
							</PostMeta>
						</VoteButtons>
					</ListItem>
					<p>{post.body}</p>
					<button onClick={this.toggleEdit}>Edit</button>
					<p>New comment:</p>
					<NewComment parentId={post.id} />
				</div>
			);
		}
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	edit(changes) {
		dispatch(editPost(ownProps.post, changes));
	}
});

export default connect(null, mapDispatchToProps)(EditablePostView);
