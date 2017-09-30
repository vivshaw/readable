// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = props => {
	const categories = props.categories.map(category => (
		<Link to={`/${category}`}>{category}</Link>
	));

	return <div>{categories}</div>;
};

const mapStateToProps = state => {
	return { categories: state.categories };
};

export default connect(mapStateToProps)(Home);
