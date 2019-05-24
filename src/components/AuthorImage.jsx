import React from "react"
import { StaticQuery, graphql } from "gatsby"
import GatsbyImage from 'gatsby-image';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 16px;
`;


export default ({ url }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {fields: {AuthorImage: {eq: "true"}}}
        ){
          edges {
            node {
              childImageSharp {
                resolutions(width: 32, height: 32) {
                  ...GatsbyImageSharpResolutions
                }
              }
              id
              fields {
                AuthorImage
                link
              }
            }
          }
        }
      }
    `}
    render={data => {
      const targetEdge = data.allFile.edges.find(edge => edge.node.fields.link === url);
      if(targetEdge) {
        if(!targetEdge.node.childImageSharp) {
          console.log(url)
        }
      }
      return (
        targetEdge && targetEdge.node.childImageSharp
          ? <Wrapper>
              <GatsbyImage resolutions={targetEdge.node.childImageSharp.resolutions} />
            </Wrapper>
          : <Wrapper />
      )
    }}
  />
)

