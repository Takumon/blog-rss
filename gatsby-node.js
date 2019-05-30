const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const _uniq = require('lodash.uniq');
const path = require('path');
const striptags = require('striptags');
const { BLOGS, AUTHOR, TYPE } = require('./favorite-blog-rss');
const crypto = require("crypto");
const Parser = require('rss-parser');
const parser = new Parser({
  headers: {'User-Agent': 'something different'},
});
const axios = require('axios');
const cheerio = require('cheerio');

const INTERNAL_TYPE_BLOG = 'blog';
const INTERNAL_TYPE_BLOG_POST = 'blogPost';

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));


exports.createPages = async ({ graphql, actions }) => {

  const membersPage =  path.resolve('./src/templates/members.jsx');

  const result = await graphql(`
    query {
      site {
        siteMetadata {
          title
          description
          descriptionForMembers
          url
          twitter
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
            title
            description
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
    }`
  );

  if (result.errors) {
    console.log(result.errors)
    return Promise.reject(result.errors)
  }

  const blogs = result.data.allBlog.edges.map(edges => edges.node);
  const posts = result.data.allBlogPost.edges.map(edges => edges.node);

  const members = [
    /* 
    {
      name: String,
      imageUrl: String,
      blogs: [{
        type: String,
        link: String,
        title: String,
        description: String,
        posts: {
          type: String,
          author {
            label: String,
            imageUrl: String,
          },
          title: String,
          excerpt: String,
          content: String,
          pubDate: String,
          link: String,
          imageUrl: String,
        }
      }],      
    }
    */ 
  ];

  blogs.forEach(b => {
    console.log(b)

    const blogOfMember = {
      type: b.type,
      link: b.link,
      title: b.title,
      description: b.description,
      posts: posts.filter(p => p.type === b.type && p.author.label === b.author.label),
    }

    const name = b.author.label;
    const targetMember = members.find(m => m.name === name);
    targetMember
      ? targetMember.blogs.push(blogOfMember)
      : members.push({
        name,
        imageUrl: b.author.imageUrl,
        blogs: [blogOfMember],
      });
  })


  // メンバーページ生成
  actions.createPage({
    path: '/members',
    component: membersPage,
    context: {
      members,
    }
  });

  return 'OK';
}



exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.sourceNodes = async ({ actions, createNodeId, store, cache }) => {
  const feeds = [];

  

  for(const blogInfo of BLOGS) {
    const author = blogInfo.author;
    const type = blogInfo.type.label;
  
    const feed = await parser.parseURL(blogInfo.url).then(feed => {
      if(type === 'Qiita') {
        feed.link = feed.feedUrl.replace('/feed')
      }
        
      return {
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
      }
    });



    feeds.push(feed);
  }
  
  console.log('feedは取得した')

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
  const rssPostsWithImageUrl = [];
  for (const p of rssPosts) {
    console.log('OGP取得するよ', p.link)
    // await sleep(10);
    const pWithImageUrl = await axios.get(p.link, {
      headers: {'User-Agent': 'something different'},
    }).then(res => {
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
    });

    rssPostsWithImageUrl.push(pWithImageUrl);
  }

  console.log('OGPは取得した')


  const typeImageUrls = Object.values(TYPE).map(value => value.imageUrl);
  await Promise.all(typeImageUrls.map(async imageUrl => {
    const fileNode = await createRemoteFileNode({
      url: imageUrl,
      cache,
      store,
      createNode: actions.createNode,
      createNodeId: createNodeId,
    });

    await actions.createNodeField({
      node: fileNode,
      name: 'TypeImage',
      value: 'true',
    });
    await actions.createNodeField({
      node: fileNode,
      name: 'link',
      value: imageUrl,
    });

    return fileNode;
  }));


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
