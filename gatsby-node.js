const path = require('path');
const striptags = require('striptags');
const { BLOGS } = require('./favorite-blog-rss');
const crypto = require("crypto");
const Parser = require('rss-parser');
const parser = new Parser();

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
  const feeds = await Promise.all(BLOGS.map(blogInfo => {
    const author = blogInfo.author.label;
    const type = blogInfo.type.label;
  
    return parser.parseURL(blogInfo.url).then(feed => ({
      ...feed,
      author,
      type,
      items: feed.items.map(item => ({
        title: item.title,
        excerpt: excerpt(item.content, 120),
        content: item.content,
        pubDate: item.pubDate,
        link : item.link,
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
    
    const excerpt = 
    actions.createNode({
      ...p,
      id: createNodeId(`${INTERNAL_TYPE_BLOG_POST}${p.link}`),
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
  const rowText = striptags(html, '<pre>')
    .replace(/<pre[\s\S]+?>[\s\S]+?<\/pre>/g, '')
    .replace(/\n/g, '')
    .replace(/ /g, '')
    .trim();
  return rowText.length >= maxLength
    ? rowText.substring(0, maxLength) + '...'
    : rowText;
}