import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled, { ThemeProvider } from 'styled-components';

import Header from './Header';
import Home from './Home';
import Category from './Category';
import Post from './Post';

export const renewsTheme = {
	palette: {
		primary1Color: '#a463f2',
		primary3Color: '#ffffff',
		accent1Color: '#000000',
		accent2Color: '#666666',
		accent3Color: '#eeeeee'
	}
};

const Wrapper = styled.div`
	width: 90%;
	max-width: 1280px;
	margin: 8px auto;
	background-color: ${props => props.theme.palette.accent3Color};
	font-size: 13px;
`;

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={renewsTheme}>
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
			</ThemeProvider>
		);
	}
}

export default App;
