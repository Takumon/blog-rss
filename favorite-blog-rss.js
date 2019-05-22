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
  OTHER: {
    label: 'Other',
  },
};

const AUTHOR = {
  TAKUMON: {
    label: 'takumon',
  },
  KIRIMODE: {
    label: 'kirimode',
  },
  KAZUHIRA: {
    label: 'hazuhira',
  },
  TENTEN: {
    label: 'tenten',
  },
  SUHISHOKUNIN: {
    label: 'seko',
  },
};

module.exports = [
  {
    type: TYPE.OTHER,
    author: AUTHOR.TAKUMON,
    url : 'https://takumon.com/rss',
  },
  {
    type: TYPE.QIITA,
    author: AUTHOR.TAKUMON,
    url : 'https://qiita.com/Takumon/feed',
  },
  {
    type: TYPE.MEDIUM,
    author: AUTHOR.TAKUMON,
    url : 'https://medium.com/feed/@takumon',
  },
  {
    type: TYPE.HATENA,
    author: AUTHOR.KIRIMODE,
    url : 'https://kiririmode.hatenablog.jp/rss',
  },
  {
    type: TYPE.HATENA,
    author: AUTHOR.KIRIMODE,
    url : 'https://kiririmode.hatenablog.jp/rss',
  },
  {
    type: TYPE.HATENA,
    author: AUTHOR.SUHISHOKUNIN,
    url : 'https://sekom.hatenablog.com/rss',
  },
  {
    type: TYPE.QIITA,
    author: AUTHOR.KAZUHIRA,
    url : 'https://qiita.com/charon/feed',
  },
];
