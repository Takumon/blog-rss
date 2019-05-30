import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '../../config/theme';
import Thumbnail from './Thumbnail';
import AuthorImage from './AuthorImage';
import Heatmap from './Heatmap';

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
`;

const Main = styled.div`
  width: 100%;
  padding: 0 0 12px 0;
`


const StyledLink = styled.a`
  position: relative;
  display: flex;
  height: 100%;
  flex-wrap: no-wrap;
  flex-direction: column;
  padding: 0;
  z-index: 3;
  border-radius: ${props => props.theme.borderRadius.default};

`;



const Image = styled.div`
  position: relative;
  overflow: hidden;
  object-fit: cover;
  box-shadow: 0px 1px 3px -2px grey;
  width: 100%;
  height: 9rem;
  border-radius: 0.3rem 0.3rem 0 0;
  background: gray;
  img {
    border-radius: 0.3rem 0.3rem 0 0 ;
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  color: #4f4f4f;
  font-family: -apple-system-body,BlinkMacSystemFont,Helvetica Neue,Helvetica Sans,Hiragino Kaku Gothic ProN,"Noto Sans Japanese","游ゴシック Medium","Yu Gothic Medium","メイリオ",meiryo,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-kerning: auto;
  font-variant-ligatures: none;
  margin: 0 1rem 1.25rem 1.25rem;
  position: relative;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
`;



const Title = styled.h3`
  font-family: -apple-system-body,BlinkMacSystemFont,Helvetica Neue,Helvetica Sans,Hiragino Kaku Gothic ProN,"Noto Sans Japanese","游ゴシック Medium","Yu Gothic Medium","メイリオ",meiryo,sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  margin-top: 0.6rem;
  width: 100%;
`;


const Excerpt = styled.div`
  font-size: 0.6em;
  width: 100%;
`

const MetaInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Tags = styled.div`
  border-top: 0.1px solid #bababa;
  padding-top: 12px;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const Tag = styled.div`
  margin-left: 6px;
  font-size: 10px;
  font-weight: bold;
  border: 0.5px solid gray;
  height: 20px;
  line-height: 12px;
  padding: 4px 10px;
  border-radius: 10px;
`;

const PubDate = styled.div`
  display: flex;
  font-size: 0.6em;
  margin-top: 12px;
  width: 100%;
`;


const Member = ({
  member
}) => {

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
      {member.blogs.map(b => (
        <div style={{margin: '12px', padding: '4px', }}>
          <h2><a href={b.link} target="_blank" >{b.type === 'Gatsby' || b.type === 'はてなブログ' ? b.title + ' - ' + b.type : b.type}</a> <small>{b.description}</small></h2>
          {b.posts.slice(0,3).map(p => (
            <div style={{margin: '6px', padding: '2px', }}><a href={p.link} target="_blank" style={{margin: '12px', padding: '4px', }}>
              {p.title}
            </a></div>
          ))}
        </div>
      ))}
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
