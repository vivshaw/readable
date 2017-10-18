import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import { createComment } from '../actions';

class NewComment extends Component {
	state = {
		body: 'b',
		author: 'c'
	};

	onChangeBody = event => {
		this.setState({ body: event.target.value });
	};

	onChangeAuthor = event => {
		this.setState({ author: event.target.value });
	};

	submitComment = () => {
		const comment = {
			...this.state,
			timestamp: Date.now(),
			id: uuidv4(),
			parentId: this.props.parentId
		};
		this.props.submit(comment);
	};

	render() {
		return (
			<div>
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
				<button onClick={() => this.submitComment()}>Submit</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	submit(comment) {
		dispatch(createComment(comment));
	}
});

export default connect(null, mapDispatchToProps)(NewComment);
