import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import Home from './Home';
import Category from './Category';
import Post from './Post';

const renewsTheme = getMuiTheme({
	palette: {
		primary1Color: '#9EEBCF'
	},
	appBar: {
		height: 50
	}
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={renewsTheme}>
				<BrowserRouter>
					<div>
						<div
							style={{ width: '90%', maxWidth: '1280px', margin: '8px auto' }}
						>
							<Link to="/">renews</Link> | <Link to="/react">react</Link> |{' '}
							<Link to="/redux">redux</Link> | <Link to="/udacity">renews</Link>
						</div>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/:category/:post" component={Post} />
							<Route path="/:category" component={Category} />
						</Switch>
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

export default App;
