import React, { Component } from 'react';
import { fetchCategories } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
	render() {
		const { categories, actions, getCategories } = this.props;

		let categoryList, actionList;
		if (categories && actions) {
			console.log('ctagories: ', categories);
			categoryList = categories.map(category => <li>{category}</li>);
			actionList = actions.map(action => <li>Action: {action.type}</li>);
		}

		return (
			<div className="App">
				<div className="App-header">
					<h2>redux test</h2>
					<button onClick={() => getCategories()}>Fetch</button>
				</div>

				{!categories.length && <p>No categories!</p>}
				{categories.length && (
					<div>
						<h3>categories</h3>
						<ul>{categoryList}</ul>
						<h3>actions</h3>
						<ul>{actionList}</ul>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories,
	actions: state.actions
});

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
