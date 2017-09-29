import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Category from './Category';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/category/:category" component={Category} />
					{/*<Route exact path="/test2" component={Home} /> */}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
