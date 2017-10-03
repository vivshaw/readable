import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListItem = styled.li`
	margin-bottom: 16px;
	display: flex;
	align-items: center;
`;

const PostTitle = styled.div`
	font-size: 18px;
	color: #666666;
`;

const TitleLink = styled(Link)`
	font-size: 18px;
	color: #000000;
	text-decoration: none;
`;

const PostMeta = styled.div`color: #666666;`;

const Author = styled.span`font-weight: bold;`;

const MetaLink = styled(Link)`
	color: #666666;
	text-decoration: none;
`;

const VoteButtons = styled.div`margin-left: 10px;`;

const PostListItem = props => {
	const { id, author, title, voteScore } = props.post;
	const { upvote, downvote, comments, category } = props;

	return (
		<div style={{ display: 'list-item', margin: '0px', padding: '0px' }}>
			<ListItem>
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
						{voteScore} points by <Author>{author}</Author> X minutes ago |{' '}
						<MetaLink to={`/${category}/${id}`}>discuss</MetaLink>{' '}
					</PostMeta>
				</VoteButtons>
			</ListItem>
		</div>
	);
};

export default PostListItem;
