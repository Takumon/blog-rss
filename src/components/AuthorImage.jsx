import React from "react"
import { StaticQuery, graphql } from "gatsby"
import GatsbyImage from 'gatsby-image';
import styled from '@emotion/styled';

const normalSize = 42;
const smallSize = 32;

export default ({ url, isNormalSize = false }) => {
  const size = isNormalSize ? normalSize: smallSize;
  const Wrapper = styled.div`
    display: flex;
    width: ${size}px;
    height: ${size}px;
    overflow: hidden;
    object-fit: cover;
    border-radius: ${size/2}px;
  `;

  return (<StaticQuery
    query={graphql`
      query {
        smallAllFile: allFile(
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
        normalAllFile: allFile(
          filter: {fields: {AuthorImage: {eq: "true"}}}
        ){
          edges {
            node {
              childImageSharp {
                resolutions(width: 42, height: 42) {
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
      const targetEdge = isNormalSize
        ? data.normalAllFile.edges.find(edge => edge.node.fields.link === url)
        : data.smallAllFile.edges.find(edge => edge.node.fields.link === url);

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
  />);
}

