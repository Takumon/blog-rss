import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from 'components';
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

const Index = ({ data }) => {
  const blogs = data.allBlog.edges.map(edges => edges.node);
  const posts = data.allBlogPost.edges.map(edges => edges.node);

  return (
    <Layout title={data.site.siteMetadata.title}>
      <Helmet title={data.site.siteMetadata.title} />
      <Header title={data.site.siteMetadata.title}>{data.site.siteMetadata.description}</Header>
      <PostList posts={posts} />
    </Layout>
  );
};

export default Index;

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
      } 
    }
    allBlog {
      edges {
        node {
          id
          author {
            label
            imageUrl
          }
          link
          type
        }
      }
    }
    allBlogPost (
      sort: { order: DESC, fields: [pubDate] }
    ) {
      edges {
        node {
          id
          type
          author {
            label
            imageUrl
          }
          title
          excerpt
          content
          pubDate(formatString: "YYYY/MM/DD")
          link
          imageUrl
        }
      }
    }
  }
`;
