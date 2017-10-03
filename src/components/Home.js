// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = props => {
	return <div>Home</div>;
};

const mapStateToProps = state => {
	return { categories: state.categories };
};

export default connect(mapStateToProps)(Home);
