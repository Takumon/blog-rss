import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Post, Button } from 'components';

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


const PER_PAGE = 30;

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  hasNextPage() {
    return this.state.page * PER_PAGE < this.props.posts.length;
  }

  loadNextPage() {
    if (!this.hasNextPage()) {
      return;
    }

    this.setState({
      page: this.state.page + 1,
    })
  }

  render() {
    const filtered = this.props.posts.slice(0, this.state.page * PER_PAGE);

    return (
      <PostWrapper>
        {filtered.map(post => (
          <Post
            key={post.id}
            coverImageUrl={post.imageUrl}
            authorName={post.author.label}
            authorImageUrl={post.author.imageUrl}
            type={post.type}
            path={post.link}
            title={post.title}
            date={post.pubDate}
            excerpt={post.excerpt}
          />
        ))}
        {this.hasNextPage() && (
          <div className="button">
            <Button
              title="More"
              to="#entry"
              handleClick={this.loadNextPage}
            />
          </div>
        )}
      </PostWrapper>
    );
  }
}

export default PostList;

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
