import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, MemberList, SnsShare } from 'components';
import { Layout } from 'layouts';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const Members = ({ data, pageContext  }) => {
  // const blogs = data.allBlog.edges.map(edges => edges.node);
  // const posts = data.allBlogPost.edges.map(edges => edges.node);
  const { title, url, twitter, descriptionForMembers } = data.site.siteMetadata;
  const { members } = pageContext;

  return (
    <Layout title={title}>
      <Helmet title={title} />
      <Header title={title}>{descriptionForMembers}</Header>
      <SnsShare
        title={`${descriptionForMembers} | ${title}`}
        link={url}
        twitterUserName={twitter}
      />
      <MemberList members={members} />
    </Layout>
  );
};

export default Members;

// Index.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             excerpt: PropTypes.string,
//             frontmatter: PropTypes.shape({
//               cover: PropTypes.object.isRequired,
//               path: PropTypes.string.isRequired,
//               title: PropTypes.string.isRequired,
//               date: PropTypes.string.isRequired,
//               tags: PropTypes.array,
//             }),
//           }),
//         }).isRequired
//       ),
//     }),
//   }),
// };

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        descriptionForMembers
        url
        twitter
      } 
    }
  }
`;
