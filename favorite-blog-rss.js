

const TYPE = {
  QIITA: {
    label: 'Qiita',
  },
  HATENA: {
    label: 'はてなブログ',
  },
  MEDIUM: {
    label: 'Midium',
  },
  NOTE: {
    label: 'note',
  },
  GATSBY: {
    label: 'Gatsby',
  },
};

const AUTHOR = {
  TAKUMON: {
    label: 'takumon',
    imageUrl: 'https://pbs.twimg.com/profile_images/835761628754788352/lL8ydcHK_400x400.jpg',
  },
  KIRIMODE: {
    label: 'kirimode',
    imageUrl: 'https://pbs.twimg.com/profile_images/645152450635108352/nMXS-DIy_400x400.jpg',
  },
  KAZUHIRA: {
    label: 'kazuhira',
    imageUrl: 'https://pbs.twimg.com/profile_images/1108689203137662977/VEYMGXO1_400x400.jpg',
  },
  TENTEN: {
    label: 'tenten',
    imageUrl: 'https://pbs.twimg.com/profile_images/675557059094384640/cy8EPKbB_400x400.jpg',
  },
  SUSHISHOKUNIN: {
    label: 'seko',
    imageUrl: 'https://pbs.twimg.com/profile_images/131683825/twitter5_400x400.png',
  },
};

const BLOGS = [
  {
    author: AUTHOR.TAKUMON,
    type: TYPE.GATSBY,
    url : 'https://takumon.com/rss',
  },
  {
    author: AUTHOR.TAKUMON,
    type: TYPE.QIITA,
    url : 'https://qiita.com/Takumon/feed',
  },
  {
    author: AUTHOR.TAKUMON,
    type: TYPE.MEDIUM,
    url : 'https://medium.com/feed/@takumon',
  },

  {
    author: AUTHOR.KIRIMODE,
    type: TYPE.QIITA,
    url : 'https://qiita.com/kiririmode/feed',
  },
  {
    author: AUTHOR.KIRIMODE,
    type: TYPE.HATENA,
    url : 'https://kiririmode.hatenablog.jp/rss',
  },

  {
    author: AUTHOR.KAZUHIRA,
    type: TYPE.HATENA,
    url : 'https://kazuhira-r.hatenablog.com/rss',
  },

  {
    author: AUTHOR.SUSHISHOKUNIN,
    type: TYPE.HATENA,
    url : 'https://sekom.hatenablog.com/rss',
  },

  {
    author: AUTHOR.TENTEN,
    type: TYPE.QIITA,
    url : 'https://qiita.com/tenten0213/feed',
  },
  {
    author: AUTHOR.TENTEN,
    type: TYPE.HATENA,
    url : 'http://tenten0213.hatenablog.com/rss',
  },
];


module.exports = {
  TYPE,
  AUTHOR,
  BLOGS,
}; 
