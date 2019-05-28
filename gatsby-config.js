const config = require('./config/site');

module.exports = {
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        autoLabel: process.env.NODE_ENV !== 'production',
        // eslint-disable-next-line
        labelFormat: `[filename]--[local]`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['material icons'],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [{
          output: "/rss.xml",
          serialize: ({ query: { allBlogPost } }) => {
            return allBlogPost.edges.map(({ node}) => {
              return Object.assign({}, node.frontmatter, {
                url: node.link,
                guid: node.link,
                title: node.title,
                description: node.excerpt,
                date: node.pubDate,
                pubDate: node.pubDate,
                custom_elements: [
                  { 'content:encoded': node.content },
                ],
              })
            })
          },
          query: `{
            allBlogPost (
              limit: 1000,
              sort: { order: DESC, fields: [pubDate] }
            ) {
              edges {
                node {
                  link
                  title
                  excerpt
                  content
                  pubDate
                }
              }
            }
          }`,
        }],
      },
    },
  ],
};
