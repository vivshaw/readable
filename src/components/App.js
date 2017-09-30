import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Category from './Category';
import Post from './Post';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/:category/:post" component={Post} />
					<Route path="/:category" component={Category} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
