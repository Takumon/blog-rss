module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Tech Incredible Solution', // Navigation and Site Title
  titleAlt: 'Tech Incredible Solution', // Title for JSONLD
  description: 'My favorite blogs',
  longDescription: 'My favorite blogs',
  url: 'https://favorite-blogs.netlify.com/', // Domain of your site. No trailing slash!
  siteUrl: 'https://favorite-blogs.netlify.com/', // url + pathPrefix
  siteLanguage: 'ja', // Language Tag on <html> element
  logo: 'static/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'TIS', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Takumon', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: '@inouetakumon', // Twitter Username
};
