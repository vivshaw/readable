// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import map from 'lodash/map';

import { fetchCategoryPosts } from '../actions';

class Home extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		const posts = map(this.props.posts, post => {
			return <div>{post.title}</div>;
		});

		return (
			<div>
				<h1>{this.props.match.params.category}</h1>
				<p>{posts}</p>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const category = ownProps.match.params.category;

	return {
		posts: filter(state.posts, post => post.category === category)
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const category = ownProps.match.params.category;

	return {
		getPosts() {
			dispatch(fetchCategoryPosts(category));
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
