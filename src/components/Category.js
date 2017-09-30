// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import difference from 'lodash/difference';
import get from 'lodash/get';

import {
	fetchPostComments,
	fetchCategoryPosts,
	upvote,
	downvote
} from '../actions';

class Category extends Component {
	componentDidMount() {
		this.props.getPosts();
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

		const postList = map(posts, ({ id, author, title, voteScore }) => {
			const comments = commentsByPost[id] || [];

			return (
				<div key={id}>
					<Link to={`/posts/${id}`}>{title}</Link>
					<p>Author: {author}</p>
					<p>
						{voteScore} <button onClick={() => voteUp(id)}>up</button>{' '}
						<button onClick={() => voteDown(id)}>down</button>
					</p>
					<p>{comments.length} comments</p>
				</div>
			);
		});

		return (
			<div>
				<h1>{category}</h1>
				<div>{postList}</div>
			</div>
		);
	}
}

const mapStateToProps = ({ posts, comments }, ownProps) => {
	const category = ownProps.match.params.category;
	const categoryPosts = filter(posts, post => post.category === category);
	const postIds = map(categoryPosts, 'id');
	const commentsByPost = reduce(
		comments,
		(byParent, { parentId, id }) => {
			if (postIds.includes(parentId)) {
				byParent[parentId] = get(byParent, parentId, []).concat(id);
			}

			return byParent;
		},
		{}
	);

	return {
		posts: categoryPosts,
		commentsByPost: commentsByPost
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const category = ownProps.match.params.category;

	return {
		getPosts() {
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
