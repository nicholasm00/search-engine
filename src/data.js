const arr = [
  'Google',
  'YouTube',
  'Amazon',
  'Spotify',
  'Wikipedia',
  'Google Images',
];

export const data = [
  {
    name: 'Google',
    path: 'https://www.google.com/',
    prefix: 'https://www.google.com/search?q=',
    color: '#4285F4',
    id: 100,
    favicon: 'https://www.google.com/favicon.ico',
  },
  {
    name: 'Google Images',
    path: 'https://www.google.com/imghp',
    prefix: 'https://www.google.com/search?tbm=isch&q=',
    color: '#F5AF00',
    id: 101,
    favicon: 'https://www.google.com/favicon.ico',
  },
  {
    name: 'YouTube',
    path: 'https://www.youtube.com/',
    prefix: 'https://www.youtube.com/results?search_query=',
    color: '#d71e18',
    id: 102,
    favicon: 'https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png',
  },
  {
    name: 'Amazon',
    path: 'https://www.amazon.com/',
    prefix: 'https://www.amazon.com/s?k=',
    color: '#EF7A1A',
    id: 103,
    favicon: 'https://www.amazon.com/favicon.ico',
  },
  {
    name: 'Spotify',
    path: 'https://open.spotify.com/',
    prefix: 'https://open.spotify.com/search/',
    color: '#1DB954',
    id: 104,
    favicon: 'https://open.spotify.com/favicon.ico',
  },
  {
    name: 'Wikipedia',
    path: 'https://en.wikipedia.org/wiki/Main_Page',
    prefix: 'https://en.wikipedia.org/w/index.php?&search=',
    color: '#505050',
    id: 105,
    favicon: 'https://en.wikipedia.org/favicon.ico',
  },
  {
    name: 'Reddit',
    path: 'https://www.reddit.com/',
    prefix: 'https://www.reddit.com/search/?q=',
    color: '#FF5700',
    id: 106,
    favicon:
      'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-120x120.png',
  },
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/',
    prefix: 'https://www.facebook.com/search/top/?q=',
    color: '#4267B2',
    id: 107,
    favicon: 'https://facebook.com/favicon.ico',
  },
  {
    name: 'Yahoo',
    path: 'https://www.yahoo.com/',
    prefix: 'https://search.yahoo.com/search?p=',
    color: '#720e9e',
    id: 108,
    favicon: 'https://s.yimg.com/rz/l/favicon.ico',
  },
  {
    name: 'eBay',
    path: 'https://www.ebay.com/',
    prefix: 'https://www.ebay.com/sch/i.html?_nkw=',
    color: '#86B817',
    id: 109,
    favicon: 'https://pages.ebay.com/favicon.ico',
  },
  {
    name: 'Pinterest',
    path: 'https://www.pinterest.com/',
    prefix: 'https://www.pinterest.com/search/pins/?q=',
    color: '#c8232c',
    id: 110,
    favicon: 'https://s.pinimg.com/webapp/style/images/favicon-fd1ea058.png',
  },
];

export const initDashboard = data.filter((item) => arr.includes(item.name));
