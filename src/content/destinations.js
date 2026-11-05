import { pageMarkup } from './pages.js';
import { categories, pageMarkupAliases, regions } from '../data/site.js';

export function getDestinationGroups() {
  return regions.map((region) => ({
    ...region,
    categories: categories.map((category) => {
      const path = `${region.id}-${category}.html`;
      const source = pageMarkup[pageMarkupAliases[path] ?? path] ?? '';
      const document = new DOMParser().parseFromString(source, 'text/html');
      const places = [...document.querySelectorAll('.place-card')].map((card) => {
        const name = card.querySelector('.place-body h4')?.textContent.replace(/^\s*\d+\.\s*/, '').trim() ?? '';
        const location = [...card.querySelectorAll('.place-body p')]
          .find((paragraph) => paragraph.querySelector('strong')?.textContent.trim().startsWith('Location'))
          ?.textContent.replace(/^\s*Location:\s*/i, '').trim() ?? '';
        const image = card.querySelector('.place-card img')?.getAttribute('src') ?? '';
        return { name, location, image: image.startsWith('/') ? image : `/${image}`, path: `/${region.id}/${category}` };
      }).filter((place) => place.name);
      return { category, places };
    }),
  }));
}

export function normalizeSearchText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
