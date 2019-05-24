import React from "react"
import { StaticQuery, graphql } from "gatsby"
import GatsbyImage from 'gatsby-image';

export default ({ url }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {fields: {ThumbnailImage: {eq: "true"}}}
        ){
          edges {
            node {
              childImageSharp {
                resolutions {
                  ...GatsbyImageSharpResolutions
                }
              }
              id
              fields {
                ThumbnailImage
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
          ? <GatsbyImage resolutions={targetEdge.node.childImageSharp.resolutions} />
          : null
      )
    }}
  />
)

