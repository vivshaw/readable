// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';

import { fetchPost } from '../actions';

class Post extends Component {
	componentWillMount() {
		this.props.getPost();
	}

	render() {
		return <div>{this.props.post && <p>{this.props.post.title}</p>}</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	const post = ownProps.match.params.post;

	return {
		post: state.posts[post]
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const post = ownProps.match.params.post;

	return {
		getPost() {
			dispatch(fetchPost(post));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
