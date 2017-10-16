import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { createPost } from '../actions';

import uuidv4 from 'uuid/v4';

class NewPost extends Component {
	state = {
		title: 'a',
		body: 'b',
		author: 'c'
	};

	onChangeTitle = event => {
		this.setState({ title: event.target.value });
	};

	onChangeBody = event => {
		this.setState({ body: event.target.value });
	};

	onChangeAuthor = event => {
		this.setState({ author: event.target.value });
	};

	submitPost = () => {
		const post = {
			...this.state,
			timestamp: Date.now(),
			id: uuidv4(),
			category: 'react'
		};
		this.props.submit(post);
	};

	render() {
		return (
			<div>
				<input
					name="title"
					value={this.state.title}
					onChange={this.onChangeTitle}
				/>
				<input
					name="body"
					value={this.state.body}
					onChange={this.onChangeBody}
				/>
				<input
					name="author"
					value={this.state.author}
					onChange={this.onChangeAuthor}
				/>
				<button onClick={() => this.submitPost()}>Submit</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	submit(post) {
		dispatch(createPost(post));
	}
});

export default connect(null, mapDispatchToProps)(NewPost);
