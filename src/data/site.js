export const regions = [
  { id: 'luzon', label: 'Luzon', summary: 'Mountain trails, quiet coves, and river adventures across the north.', map: '/images/regions/luzon.svg' },
  { id: 'visayas', label: 'Visayas', summary: 'Island coastlines, community river tours, and rewarding highland walks.', map: '/images/regions/visayas.svg' },
  { id: 'mindanao', label: 'Mindanao', summary: 'Big landscapes, vivid blue waters, and mountain country in the south.', map: '/images/regions/mindanao.svg' },
];

export const categories = ['beaches', 'rivers', 'mountains'];

export const contentPages = {
  '/luzon': 'luzon.html', '/visayas': 'visayas.html', '/mindanao': 'mindanao.html',
  '/luzon/beaches': 'luzon-beaches.html', '/luzon/rivers': 'luzon-rivers.html', '/luzon/mountains': 'luzon-mountains.html',
  '/visayas/beaches': 'visayas-beaches.html', '/visayas/rivers': 'visayas-rivers.html', '/visayas/mountains': 'visayas-mountains.html',
  '/mindanao/beaches': 'mindanao-beaches.html', '/mindanao/rivers': 'mindanao-rivers.html', '/mindanao/mountains': 'mindanao-mountains.html',
  '/about': 'about.html', '/purpose': 'purpose.html', '/team': 'team.html', '/safety': 'safety.html', '/directions': 'directions.html', '/credits': 'credits.html',
};

export const pageMarkupAliases = {
  'luzon-beaches.html': 'team.html',
  'luzon-mountains.html': 'purpose.html',
  'visayas-beaches.html': 'mindanao.html',
  'mindanao-rivers.html': 'safety.html',
};

export const oldPageRoutes = Object.fromEntries(Object.entries(contentPages).map(([path, file]) => [`/${file}`, path]));
oldPageRoutes['/index.html'] = '/';
