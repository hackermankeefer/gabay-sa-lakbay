import { getDestinationGroups } from './destinations.js';

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

export function buildDirectionsMarkup() {
  const groups = getDestinationGroups();
  const total = groups.reduce((sum, region) => sum + region.categories.reduce((count, category) => count + category.places.length, 0), 0);
  const regionsMarkup = groups.map((region) => {
    const regionTotal = region.categories.reduce((count, category) => count + category.places.length, 0);
    const categoriesMarkup = region.categories.map(({ category, places }) => `
      <section class="direction-category" aria-labelledby="${region.id}-${category}-title">
        <div class="direction-category-heading"><h3 id="${region.id}-${category}-title">${escapeHtml(category[0].toUpperCase() + category.slice(1))}</h3><span>${places.length} places</span></div>
        <div class="direction-grid">${places.map(({ name, location }) => {
          const query = encodeURIComponent(`${name}, ${location}`);
          const searchText = escapeHtml(`${name} ${location} ${category} ${region.label}`);
          return `<article class="direction-place" data-search="${searchText}"><h4>${escapeHtml(name)}</h4><p>${escapeHtml(location || region.label)}</p><a class="button" href="https://www.google.com/maps/search/?api=1&amp;query=${query}" target="_blank" rel="noopener noreferrer">Open map</a></article>`;
        }).join('')}</div>
      </section>`).join('');
    return `<section class="direction-region" aria-labelledby="${region.id}-directions-title"><div class="direction-region-heading"><h2 id="${region.id}-directions-title">${escapeHtml(region.label)}</h2><span>${regionTotal} destinations</span></div>${categoriesMarkup}</section>`;
  }).join('');
  return `<section class="section directions-directory"><div class="container"><h1 class="section-title">Directions</h1><p class="section-description">Browse all ${total} destinations by region and type. Open a map for directions, then confirm current access and transport details before you travel.</p>${regionsMarkup}</div></section>`;
}
