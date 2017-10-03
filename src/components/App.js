import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';

import Header from './Header';
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

const Wrapper = styled.div`
	width: 90%;
	max-width: 1280px;
	margin: 8px auto;
`;

class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={renewsTheme}>
				<BrowserRouter>
					<Wrapper>
						<Header />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/:category/:post" component={Post} />
							<Route path="/:category" component={Category} />
						</Switch>
					</Wrapper>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

export default App;
