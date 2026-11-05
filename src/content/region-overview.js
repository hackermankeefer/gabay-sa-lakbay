import { getDestinationGroups } from './destinations.js';

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

export function buildRegionOverviewMarkup(regionId) {
  const region = getDestinationGroups().find((item) => item.id === regionId);
  if (!region) return '';

  const categoryCards = region.categories.map(({ category, places }) => {
    const featured = places.find((place) => place.image);
    const samplePlaces = places.slice(0, 2).map(({ name, location }) => `${name} (${location})`).join(', ');
    if (!featured) return '';
    return `<a href="/${region.id}/${category}" class="destination-card" aria-label="Explore ${escapeHtml(category)} in ${escapeHtml(region.label)}"><img src="${escapeHtml(featured.image)}" alt="${escapeHtml(featured.name)} in ${escapeHtml(region.label)}" loading="lazy"><div class="destination-info"><h3>${escapeHtml(category[0].toUpperCase() + category.slice(1))}</h3><p>${escapeHtml(samplePlaces)}</p></div></a>`;
  }).join('');

  return `<section class="section"><div class="container"><h1 class="section-title">${escapeHtml(region.label)}</h1><p class="section-description">${escapeHtml(region.summary)}</p><div class="destination-grid">${categoryCards}</div></div></section>`;
}
