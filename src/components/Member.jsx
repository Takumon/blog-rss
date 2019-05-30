import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '../../config/theme';
import Thumbnail from './Thumbnail';
import AuthorImage from './AuthorImage';
import TypeImage from './TypeImage';
import Heatmap from './Heatmap';
import { TYPE } from '../../favorite-blog-rss';

const Wrapper = styled.article`
  margin-bottom: 2rem;
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  min-height: 22rem;
  flex-basis: calc(99.9% * 1 / 3 - 2.5rem);
  max-width: calc(99.9% * 1 / 3 - 2.5rem);
  width: calc(99.9% * 1 / 3 - 2.5rem);

  @media (max-width: 1000px) {
    flex-basis: calc(99.9% * 1 / 2 - 1rem);
    max-width: calc(99.9% * 1 / 2 - 1rem);
    width: calc(99.9% * 1 / 2 - 1rem);
    min-height: 22rem;
  }

  @media (max-width: 700px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    min-height: 20rem;
  }
`;

const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
`;

const AuthorName = styled.h1`
  margin-bottom: 0;
  margin-left: 1rem;
  color: #636363;
  padding-right: 1rem;
`;

const Main = styled.div`
  width: 100%;
  padding: 0 0 12px 0;
`


const TypeImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    color: #12b4c7;
  }
`;

const BlogTitle = styled.h4`
  margin-left: 6px;
  color: #636363;
  &:hover {
    color: #12b4c7;
  }
`;

const BlogDetail = styled.small`
  margin-top: -18px;
  display: block;
  margin-left: 30px;
  margin-bottom: 24px;
`;


const PostTitle = styled.div`
  margin: 6px;
  padding: 2px;
  padding-left: 12px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: #12b4c7;
  }
`;

const PostsWrapper = styled.div`
  margin: 24px 12px 12px 12px;
  padding: 4px;
`

const Member = ({ member }) => {

  const postData = []
  member.blogs.forEach(b => {
    b.posts.forEach(p => {
      postData.push({
        title: p.title,
        link: p.link,
        pubDate: p.pubDate,
        type: p.type,
      });
    })
  });

  


  return (
    <Wrapper>
      <Main>
        <Author>
          <AuthorImage isNormalSize={true} url={member.imageUrl} />
          <AuthorName>{member.name}</AuthorName>
        </Author>
      </Main>
      <Heatmap postData={postData} />
      {member.blogs.map(b => {
        const typeImageUrl = Object.values(TYPE).find(t => t.label === b.type).imageUrl;

        const Title = (
          <>
            <TypeImageWrapper
              onClick={() => {
                window.open(b.link)
              }}
            >
              <TypeImage
                isNormalSize={false} 
                url={typeImageUrl}
              />
              {b.type === 'Gatsby' || b.type === 'はてなブログ'
                ? <BlogTitle>{b.title}</BlogTitle>
                : <BlogTitle>{b.type}</BlogTitle>
              }
            </TypeImageWrapper>
            {(b.type === 'Gatsby' || b.type === 'はてなブログ') && b.description
              ? <BlogDetail>{b.description}</BlogDetail>
              : <BlogDetail />
            }
          </>
        );

        return (
          <PostsWrapper>
            {Title}
            {b.posts.slice(0,3).map(p => (
              <PostTitle
                onClick={() => {
                  window.open(p.link);
                }}
              >{p.title}</PostTitle>
            ))}
          </PostsWrapper>
        );
      })}
  </Wrapper>
  );
}

export default Member;

// PostList.propTypes = {
//   // coverImageUrl: PropTypes.object.isRequired,
//   path: PropTypes.string.isRequired,
//   excerpt: PropTypes.string,
//   date: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
// };
