import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
	background-color: ${props => props.theme.palette.primary1Color};
	color: ${props => props.theme.palette.primary3Color};
	padding: 6px;
`;

const HeaderLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

const Logo = styled.div`
	display: inline-block;
	border: 1px solid ${props => props.theme.palette.primary3Color};
	width: 18px;
	height: 18px;
	font-weight: bold;
	margin-right: 10px;
`;

const Header = props => {
	return (
		<HeaderWrapper>
			<Logo>R</Logo>
			<HeaderLink style={{ fontWeight: 'bold', marginRight: '20px' }} to="/">
				Renews
			</HeaderLink>{' '}
			<HeaderLink to="/react">react</HeaderLink> |{' '}
			<HeaderLink to="/redux">redux</HeaderLink> |{' '}
			<HeaderLink to="/udacity">udacity</HeaderLink>
		</HeaderWrapper>
	);
};

export default Header;
