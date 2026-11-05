import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDestinationGroups, normalizeSearchText } from '../content/destinations.js';

export default function DestinationFinder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const destinations = useMemo(() => (
    getDestinationGroups().flatMap((region) => region.categories.flatMap(({ category, places }) => (
      places.map((place) => ({ ...place, region: region.label, category }))
    )))
  ), []);
  const matchingPlaces = useMemo(() => {
    const search = normalizeSearchText(query);
    if (!search) return [];
    return destinations.filter((place) => normalizeSearchText(`${place.name} ${place.location} ${place.region} ${place.category}`).includes(search));
  }, [destinations, query]);
  const visiblePlaces = matchingPlaces.slice(0, 6);

  function handleSubmit(event) {
    event.preventDefault();
    if (!visiblePlaces.length) return;
    const place = visiblePlaces[0];
    navigate(`${place.path}?q=${encodeURIComponent(place.name)}`);
  }

  return <section className="destination-finder" aria-labelledby="destination-finder-title">
    <h2 id="destination-finder-title">Find a destination</h2>
    <form className="destination-finder-form" role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="destination-finder-input">Search beaches, rivers, and mountains</label>
      <input id="destination-finder-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by place, location, or region" autoComplete="off" />
      {query && <button type="button" className="finder-clear" onClick={() => setQuery('')}>Clear</button>}
      <button type="submit" className="button">Search</button>
    </form>
    {query && <div className="finder-results" aria-live="polite">
      <p className="finder-status">{matchingPlaces.length ? `${matchingPlaces.length} matching ${matchingPlaces.length === 1 ? 'place' : 'places'}${matchingPlaces.length > visiblePlaces.length ? ` · showing ${visiblePlaces.length}` : ''}` : 'No places match that search.'}</p>
      {visiblePlaces.length > 0 && <ul>{visiblePlaces.map((place) => <li key={`${place.path}-${place.name}`}>
        <Link to={`${place.path}?q=${encodeURIComponent(place.name)}`}>
          <span>{place.name}</span><small>{place.location} · {place.region} {place.category}</small>
        </Link>
      </li>)}</ul>}
    </div>}
  </section>;
}
