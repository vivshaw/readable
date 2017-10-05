import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

const ListItem = styled.div`
	margin-bottom: 16px;
	display: flex;
	list-style-type: none;
	list-style-position: inside;
	align-items: center;
`;

const PostTitle = styled.div`
	font-size: 18px;
	color: ${props => props.theme.palette.accent2Color};
`;

const TitleLink = styled(Link)`
	font-size: 18px;
	color: ${props => props.theme.palette.accent1Color};
	text-decoration: none;
`;

const PostMeta = styled.div`
	color: ${props => props.theme.palette.accent2Color};
`;

const Author = styled.span`font-weight: bold;`;

const MetaLink = styled(Link)`
	color: ${props => props.theme.palette.accent2Color};
	text-decoration: none;
`;

const VoteButtons = styled.div`margin-left: 10px;`;

const PostListItem = props => {
	const { id, author, title, voteScore, category, timestamp } = props.post;
	const { upvote, downvote, comments, index } = props;

	return (
		<ListItem>
			{index && <div>{index}.</div>}
			<VoteButtons>
				<div onClick={() => upvote()}>u</div>
				<div onClick={() => downvote()}>d</div>
			</VoteButtons>
			<VoteButtons>
				<PostTitle>
					<TitleLink to={`/${category}/${id}`}>{title}</TitleLink>{' '}
					<span>({comments.length} comments)</span>
				</PostTitle>

				<PostMeta>
					{voteScore} points by <Author>{author}</Author>{' '}
					<TimeAgo date={timestamp} /> |{' '}
					<MetaLink to={`/${category}/${id}`}>discuss</MetaLink>{' '}
				</PostMeta>
			</VoteButtons>
		</ListItem>
	);
};

export default PostListItem;
