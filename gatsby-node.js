const path = require('path');
const blogInfos = require('./favorite-blog-rss');
const crypto = require("crypto");
const Parser = require('rss-parser');
const parser = new Parser();
const striptags = require('striptags');

const INTERNAL_TYPE_BLOG = 'blog';
const INTERNAL_TYPE_BLOG_POST = 'blogPost';

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const feeds = await Promise.all(blogInfos.map(blogInfo => {
    const author = blogInfo.author.label;
    const type = blogInfo.type.label;
  
    return parser.parseURL(blogInfo.url).then(feed => ({
      ...feed,
      author,
      type,
      items: feed.items.map(item => ({
        ...item,
        author,
        type,
      }))
    }))
  }));

  const blogs = feeds.map(feed => ({
    title: feed.title,
    description: feed.description,
    link: feed.link,
    lastBuildDate: feed.lastBuildDate,
    author: feed.author,
    type: feed.type,
  }));

  blogs.forEach(b => {
    const contentDigest = crypto.createHash(`md5`)
      .update(JSON.stringify(b))
      .digest('hex');
    
    actions.createNode({
      ...b,
      id: createNodeId(`${INTERNAL_TYPE_BLOG}${b.link}`),
      children: [],
      parent: `__SOURCE__`,
      internal: {
        type: INTERNAL_TYPE_BLOG,
        contentDigest,
      },
    });
  });

  const rssPosts = feeds.map(feed => feed.items).reduce((a,b) => [...a, ...b]);
  rssPosts.forEach(p => {
    const contentDigest = crypto.createHash(`md5`)
      .update(JSON.stringify(p))
      .digest('hex');
    
    actions.createNode({
      ...p,
      id: createNodeId(`${INTERNAL_TYPE_BLOG_POST}${p.link}`),
      excerpt: excerpt(p.content, 120),
      children: [],
      parent: `__SOURCE__`,
      internal: {
        type: INTERNAL_TYPE_BLOG_POST,
        contentDigest,
      },
    });
  });
};

function excerpt(html, maxLength) {
  const rowText = striptags(html, '<pre>').replace(/<pre[\s\S]+?>[\s\S]+?<\/pre>/g, '').trim();
  return rowText.length >= maxLength
    ? rowText.substring(0, maxLength) + '...'
    : rowText;
}