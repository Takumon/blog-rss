import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Member, Button } from 'components';

const MemberWrapper = styled.div`
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

class MemberList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  hasNextPage() {
    return this.state.page * PER_PAGE < this.props.blogs.length;
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
    const members = [];
    const { blogs, posts } = this.props;

    blogs.forEach(b => {
      const name = b.author.label;
      const targetMember = members.find(m => m.name === name);
      if (targetMember) {
        targetMember.blogs.push({
          type: b.type,
          link: b.link,
          title: b.title,
          description: b.description,
          posts: posts.filter(p => p.type === b.type && p.auther === b.auther),
        });
      } else {
        members.push({
          name,
          imageUrl: b.author.imageUrl,
          blogs: [{
            type: b.type,
            link: b.link,
            title: b.title,
            description: b.description,
            posts: posts.filter(p => p.type === b.type && p.auther === b.auther),
          }],
        });
      }
    })
    const filtered = members.slice(0, this.state.page * PER_PAGE);

    return (
      <MemberWrapper>
        {members.map(member => <Member {...member} />)}
        {this.hasNextPage() && (
          <div className="button">
            <Button
              title="More"
              to="#entry"
              size="small"
              handleClick={this.loadNextPage}
            />
          </div>
        )}
      </MemberWrapper>
    );
  }
}

export default MemberList;

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
