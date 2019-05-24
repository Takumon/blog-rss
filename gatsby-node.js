const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const _uniq = require('lodash.uniq');
const path = require('path');
const striptags = require('striptags');
const { BLOGS, AUTHOR } = require('./favorite-blog-rss');
const crypto = require("crypto");
const Parser = require('rss-parser');
const parser = new Parser();
const axios = require('axios');
const cheerio = require('cheerio');

const INTERNAL_TYPE_BLOG = 'blog';
const INTERNAL_TYPE_BLOG_POST = 'blogPost';

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const feeds = await Promise.all(BLOGS.map(blogInfo => {
    const author = blogInfo.author;
    const type = blogInfo.type.label;
  
    return parser.parseURL(blogInfo.url).then(feed => ({
      ...feed,
      author,
      type,
      items: feed.items.map(item => ({
        title: item.title,
        excerpt: excerpt(item.content, 120),
        content: item.content,
        pubDate: new Date(item.pubDate).toISOString(),
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

  const rssPostsWithImageUrl = await Promise.all(rssPosts.map(p =>
    axios.get(p.link).then(res => {
      const $ = cheerio.load(res.data)
  
      let imageUrl;
      $('head meta').each((i, el) => {
        const property = $(el).attr('property')
        const content = $(el).attr('content')
        if (property === 'og:image') {
          imageUrl = content
        }
      });

      return {
        ...p,
        imageUrl,
      };
    })
  ));


  const authorImageUrls = Object.values(AUTHOR).map(value => value.imageUrl);
  await Promise.all(authorImageUrls.map(async imageUrl => {
    const fileNode = await createRemoteFileNode({
      url: imageUrl,
      cache,
      store,
      createNode: actions.createNode,
      createNodeId: createNodeId,
    });

    await actions.createNodeField({
      node: fileNode,
      name: 'AuthorImage',
      value: 'true',
    });
    await actions.createNodeField({
      node: fileNode,
      name: 'link',
      value: imageUrl,
    });

    return fileNode;
  }));


  const imageUrls = _uniq(rssPostsWithImageUrl.filter(p => p.imageUrl).map(p => p.imageUrl));

  await Promise.all(imageUrls.map(async imageUrl => {
    const fileNode = await createRemoteFileNode({
      url: imageUrl,
      cache,
      store,
      createNode: actions.createNode,
      createNodeId: createNodeId,
    });

    await actions.createNodeField({
      node: fileNode,
      name: 'ThumbnailImage',
      value: 'true',
    });
    await actions.createNodeField({
      node: fileNode,
      name: 'link',
      value: imageUrl,
    });

    return fileNode;
  }));

  rssPostsWithImageUrl.forEach(p => {
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