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
					<Route path="/:category" component={Category} />
					<Route path="/posts/:post" component={Post} />
					{/*<Route exact path="/test2" component={Home} /> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
