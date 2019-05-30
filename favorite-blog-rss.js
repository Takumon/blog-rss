

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
  // KIRIRIMODE: {
  //   label: 'kiririmode',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/645152450635108352/nMXS-DIy_400x400.jpg',
  // },
  // KAZUHIRA: {
  //   label: 'kazuhira',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/1108689203137662977/VEYMGXO1_400x400.jpg',
  // },
  // TENTEN: {
  //   label: 'tenten',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/675557059094384640/cy8EPKbB_400x400.jpg',
  // },
  // SUSHISHOKUNIN: {
  //   label: 'seko',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/131683825/twitter5_400x400.png',
  // },
  // YOSHIP: {
  //   label: 'yoshi-p',
  //   imageUrl: 'https://avatars2.githubusercontent.com/u/28617080?v=4',
  // },
  // HONDA: {
  //   label: 'honda',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/1382551749/______240x_400x400.jpg',
  // },
  // URAGAMI: {
  //   label: 'uragami',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/818418475299262464/V42CEbIN_400x400.jpg',
  // },
  // BOOKSTORE: {
  //   label: 'BookStore',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/967320814566588417/Xr5u7k7c_400x400.jpg',
  // },
  // KASAI: {
  //   label: 'kasai',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/1028848099580493824/Bwa42Mhi_400x400.jpg',
  // },
  // HIROOKA: {
  //   label: 'hirooka',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/984232851494191104/xdDTxDPn_400x400.jpg',
  // },
  // SUGIMOTO: {
  //   label: 'sugimoto',
  //   imageUrl: 'https://pbs.twimg.com/profile_images/711443830386458624/En9cnn4__400x400.jpg',
  // },
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
  // {
  //   author: AUTHOR.TAKUMON,
  //   type: TYPE.MEDIUM,
  //   url : 'https://medium.com/feed/@takumon',
  // },

  // {
  //   author: AUTHOR.KIRIRIMODE,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/kiririmode/feed',
  // },
  // {
  //   author: AUTHOR.KIRIRIMODE,
  //   type: TYPE.HATENA,
  //   url : 'https://kiririmode.hatenablog.jp/rss',
  // },

  // {
  //   author: AUTHOR.KAZUHIRA,
  //   type: TYPE.HATENA,
  //   url : 'https://kazuhira-r.hatenablog.com/rss',
  // },

  // {
  //   author: AUTHOR.SUSHISHOKUNIN,
  //   type: TYPE.HATENA,
  //   url : 'https://sekom.hatenablog.com/rss',
  // },

  // {
  //   author: AUTHOR.TENTEN,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/tenten0213/feed',
  // },
  // {
  //   author: AUTHOR.TENTEN,
  //   type: TYPE.HATENA,
  //   url : 'http://tenten0213.hatenablog.com/rss',
  // },

  // {
  //   author: AUTHOR.YOSHIP,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/r-nouchi/feed',
  // },

  // {
  //   author: AUTHOR.HONDA,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/hondaYoshitaka/feed',
  // },

  // {
  //   author: AUTHOR.URAGAMI,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/backpaper0@github/feed',
  // },

  // {
  //   author: AUTHOR.BOOKSTORE,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/BooookStore/feed',
  // },

  // {
  //   author: AUTHOR.KASAI,
  //   type: TYPE.HATENA,
  //   url : 'http://zypressen.hatenablog.com/rss',
  // },

  // {
  //   author: AUTHOR.HIROOKA,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/hirooka0527/feed',
  // },

  // {
  //   author: AUTHOR.SUGIMOTO,
  //   type: TYPE.QIITA,
  //   url : 'https://qiita.com/tksugimoto/feed',
  // },

];


module.exports = {
  TYPE,
  AUTHOR,
  BLOGS,
}; 
