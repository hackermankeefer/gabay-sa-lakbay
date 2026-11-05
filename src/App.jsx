import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import BackToTopButton from './components/BackToTopButton.jsx';
import DestinationFinder from './components/DestinationFinder.jsx';
import { buildDirectionsMarkup } from './content/directions.js';
import { normalizeSearchText } from './content/destinations.js';
import { buildRegionOverviewMarkup } from './content/region-overview.js';
import { pageMarkup } from './content/pages.js';
import { safetyGuideMarkup } from './content/safety-guide.js';
import { categories, contentPages, oldPageRoutes, pageMarkupAliases, regions } from './data/site.js';
const teamMembers = [
  { name: 'Judielyn Dagohoy', image: 'judielyn-dagohoy.jpg', initials: 'JD' },
  { name: 'Andrea Mae Bajamunde', image: 'andrea-mae-bajamunde.jpg', initials: 'AB' },
  { name: 'Jenny Legria', image: 'jenny-legria.jpg', initials: 'JL' },
  { name: 'Jannah Aladano Ebit', image: 'jannah-aladano-ebit.jpg', initials: 'JE' },
];

function TopBar() {
  return <div className="top-bar"><span>Plan a good trip. Tread lightly.</span><Link to="/safety">Travel with care</Link></div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const menuButtonRef = useRef(null);
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); setOpenDropdown(''); }, [location.pathname]);
  function handleNavigationKeyDown(event) {
    if (event.key !== 'Escape') return;
    const currentDropdownButton = event.target.closest('.dropdown')?.querySelector('.nav-disclosure');
    setOpenDropdown('');
    if (menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    } else {
      currentDropdownButton?.focus();
    }
  }
  return <header className="site-header">
    <div className="container navbar">
      <Link to="/" className="logo" aria-label="Gabay sa Lakbay home"><span className="logo-type">Gabay sa Lakbay<small>Field guide to the Philippines</small></span></Link>
      <button ref={menuButtonRef} className="menu-button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
      <nav aria-label="Main navigation" onKeyDown={handleNavigationKeyDown}>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="site-navigation">
          <li><Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link></li>
          {regions.map((region) => <li
            className={`dropdown ${openDropdown === region.id ? 'open' : ''}`}
            key={region.id}
            onMouseEnter={() => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setOpenDropdown(region.id);
            }}
            onMouseLeave={(event) => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                setOpenDropdown((current) => current === region.id ? '' : current);
              }
            }}
            onFocus={() => setOpenDropdown(region.id)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setOpenDropdown((current) => current === region.id ? '' : current);
              }
            }}
          >
            <button className="nav-disclosure" aria-expanded={openDropdown === region.id} onClick={(event) => {
              if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                event.currentTarget.blur();
                return;
              }
              setOpenDropdown(openDropdown === region.id ? '' : region.id);
            }}>{region.label}<span aria-hidden="true">{openDropdown === region.id ? '−' : '+'}</span></button>
            <ul className="dropdown-content">{categories.map((category) => <li key={category}><Link to={`/${region.id}/${category}`} aria-current={location.pathname === `/${region.id}/${category}` ? 'page' : undefined} onClick={(event) => { event.currentTarget.blur(); setOpenDropdown(''); }}>{category}</Link></li>)}<li><Link to={`/${region.id}`} aria-current={location.pathname === `/${region.id}` ? 'page' : undefined} onClick={(event) => { event.currentTarget.blur(); setOpenDropdown(''); }}>Explore all {region.label}</Link></li></ul>
          </li>)}
          <li><Link to="/safety" aria-current={location.pathname === '/safety' ? 'page' : undefined}>Safety &amp; Tips</Link></li><li><Link to="/directions" aria-current={location.pathname === '/directions' ? 'page' : undefined}>Directions</Link></li><li><Link to="/about" aria-current={location.pathname === '/about' ? 'page' : undefined}>About</Link></li>
        </ul>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer><div className="container footer-inner">
    <div className="footer-brand">
      <Link to="/" className="footer-company-link" aria-label="AproJ³ Company home"><img className="logo-company-image" src="/images/aproj-company-logo.png" alt="AproJ³ Company" /></Link>
      <Link to="/" className="footer-site-name">Gabay sa Lakbay<small>Field guide to the Philippines</small></Link>
      <p>Good places deserve thoughtful visitors.</p>
    </div>
    <nav className="footer-links" aria-label="Explore by region"><span>Explore by region</span><Link to="/luzon">Luzon</Link><Link to="/visayas">Visayas</Link><Link to="/mindanao">Mindanao</Link></nav>
    <nav className="footer-links" aria-label="Travel resources"><span>Travel resources</span><Link to="/safety">Safety &amp; tips</Link><Link to="/directions">Directions</Link><Link to="/about">About the guide</Link><Link to="/credits">Photo credits</Link></nav>
    <small>© {new Date().getFullYear()} Gabay sa Lakbay · A student travel guide</small>
  </div></footer>;
}

function Home() {
  return <main>
    <section className="home-hero"><div className="container home-hero-inner">
      <div className="hero-copy-block"><h1>Go where the<br/>land opens up.</h1>
        <p className="hero-copy">A field guide to the Philippines’ beaches, rivers, and mountain trails—made for finding your next stop and travelling with care.</p>
        <div className="hero-actions"><Link className="button hero-primary" to="/luzon">Explore the guide</Link><Link className="hero-secondary" to="/safety">Before you go</Link></div>
      </div>
      <div className="hero-footnote"><span>For slow mornings and long trails</span><span>Explore with respect</span></div>
    </div></section>
    <DestinationFinder />
    <section className="region-showcase" id="regions"><div className="container"><div className="section-heading"><div><h2>Three regions.<br/>A lot to discover.</h2></div><p>Start with an island group, then choose a coastline, a river, or a trail that suits your trip.</p></div>
      <div className="region-list">{regions.map((region) => <article className={`region-row region-${region.id}`} key={region.id}>
        <Link className="region-main-link" to={`/${region.id}`}><span className="region-map" aria-hidden="true"><img src={region.map} alt="" loading="lazy" /></span><span className="region-copy"><span className="region-description">{region.summary}</span><strong>{region.label}</strong><span className="region-open">Explore region</span></span></Link>
        <nav className="region-categories" aria-label={`${region.label} categories`}>{categories.map((category) => <Link to={`/${region.id}/${category}`} key={category}>{category}</Link>)}</nav>
      </article>)}</div>
    </div></section>
    <section className="responsible-strip"><div className="container responsible-inner"><span className="responsible-mark" aria-hidden="true">✳</span><div><h2>Take only good memories.<br/>Leave the place as you found it.</h2></div><Link to="/safety" className="text-link">Read the travel notes</Link></div></section>
  </main>;
}

function LegacyContent({ file, searchable = false }) {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => setQuery(new URLSearchParams(location.search).get('q') ?? ''), [file, location.search]);
  const html = useMemo(() => {
    const regionId = file.replace('.html', '');
    const isRegionOverview = regions.some((region) => region.id === regionId);
    const sourceFile = pageMarkupAliases[file] ?? (file === 'mindanao.html' ? 'mindanao-overview.html' : file);
    const markup = isRegionOverview ? buildRegionOverviewMarkup(regionId) : file === 'directions.html' ? buildDirectionsMarkup() : file === 'safety.html' ? safetyGuideMarkup : pageMarkup[sourceFile] ?? '<section class="section"><div class="container"><h1>Page unavailable</h1><p>This guide page could not be loaded.</p></div></section>';
    const parsed = new DOMParser().parseFromString(markup, 'text/html');
    parsed.querySelectorAll('.place-body p').forEach((paragraph) => {
      const label = paragraph.querySelector('strong')?.textContent.trim().toLowerCase();
      if (label?.startsWith('photo:')) paragraph.remove();
    });
    if (file === 'about.html') {
      const list = parsed.querySelector('.about-team-list');
      if (list) {
        list.className = 'about-team-grid';
        list.replaceChildren();
        teamMembers.forEach(({ name, image, initials }) => {
          const member = parsed.createElement('article');
          member.className = 'about-team-member';
          const portrait = parsed.createElement('div');
          portrait.className = 'team-portrait';
          const fallback = parsed.createElement('span');
          fallback.className = 'team-initials';
          fallback.setAttribute('aria-hidden', 'true');
          fallback.textContent = initials;
          const photo = parsed.createElement('img');
          photo.src = `/images/team/${image}`;
          photo.alt = `Portrait of ${name}`;
          photo.loading = 'lazy';
          photo.setAttribute('onerror', 'this.remove()');
          portrait.append(photo, fallback);
          const nameElement = parsed.createElement('h3');
          nameElement.textContent = name;
          member.append(portrait, nameElement);
          list.append(member);
        });
      }
    }
    parsed.querySelectorAll('.region-cover, .cover-fallback').forEach((cover) => cover.remove());
    parsed.querySelectorAll('.category-title').forEach((title) => title.remove());

    if (pageMarkupAliases[file]) {
      const [region, category] = file.replace('.html', '').split('-');
      const regionLabel = region[0].toUpperCase() + region.slice(1);
      const categoryLabel = { beaches: 'Beaches', rivers: 'Rivers', mountains: 'Mountains' }[category];
      const cards = [...parsed.querySelectorAll('.place-card')];
      const section = parsed.createElement('section');
      section.className = 'region-section';
      const container = parsed.createElement('div');
      container.className = 'container';
      container.innerHTML = `<h1 class="section-title">${regionLabel} ${categoryLabel}</h1><h2>${regionLabel}</h2><p class="section-description">Browse ${cards.length} ${categoryLabel.toLowerCase()} across ${regionLabel}.</p>`;
      const grid = parsed.createElement('div');
      grid.className = 'card-grid';
      cards.forEach((card) => grid.append(card));
      container.append(grid);
      section.append(container);
      parsed.body.replaceChildren(section);
    }

    parsed.querySelectorAll('a[href]').forEach((anchor) => {
      const key = `/${anchor.getAttribute('href')?.replace(/^\.\//, '')}`;
      if (oldPageRoutes[key]) anchor.setAttribute('href', oldPageRoutes[key]);
    });
    parsed.querySelectorAll('[src]').forEach((element) => {
      const src = element.getAttribute('src');
      if (src?.startsWith('images/')) element.setAttribute('src', `/${src}`);
    });
    return parsed.body.innerHTML;
  }, [file]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target === '_blank') return;
      if (anchor.hash && anchor.pathname === window.location.pathname) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const route = oldPageRoutes[url.pathname] ?? (contentPages[url.pathname] ? url.pathname : null);
      if (route) { event.preventDefault(); navigate(route); }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate, location.pathname]);

  const filteredResults = useMemo(() => {
    const parsed = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    const cards = [...parsed.querySelectorAll('.place-card, .direction-place')];
    const total = cards.length;
    const search = normalizeSearchText(query);
    if (!search) return { markup: html, total, visible: total };
    let visible = 0;
    cards.forEach((card) => {
      const searchableText = normalizeSearchText(`${card.getAttribute('data-search') ?? ''} ${card.textContent}`);
      const matches = searchableText.includes(search);
      card.classList.toggle('hidden-card', !matches);
      if (matches) visible += 1;
    });
    return { markup: parsed.body.innerHTML, total, visible };
  }, [html, query]);

  return <main className="legacy-main">
    {searchable && <div className="container browse-tools"><label htmlFor="destination-search">{file === 'directions.html' ? 'Search all destinations' : 'Search these destinations'}</label><input id="destination-search" type="search" placeholder={file === 'directions.html' ? 'Name, location, region, or type…' : 'Try a name or location…'} value={query} onChange={(event) => setQuery(event.target.value)} /><button type="button" className="search-clear" onClick={() => setQuery('')} disabled={!query}>Clear</button><span aria-live="polite">{query ? filteredResults.visible ? `Showing ${filteredResults.visible} of ${filteredResults.total} places` : 'No matching places. Try another name or location.' : file === 'directions.html' ? `Search all ${filteredResults.total} places by name, location, region, or type` : `Browse ${filteredResults.total} places by name or location`}</span></div>}
    <div className="legacy-content" dangerouslySetInnerHTML={{ __html: filteredResults.markup }} />
  </main>;
}

function RegionPage() {
  const { region } = useParams();
  return <LegacyContent file={`${region}.html`} />;
}

function CategoryPage() {
  const { region, category } = useParams();
  return <LegacyContent file={`${region}-${category}.html`} searchable />;
}

function NotFound() {
  return <main className="container not-found"><p className="eyebrow">404 · TRAIL NOT FOUND</p><h1>This path doesn’t lead anywhere.</h1><p>Try choosing a region from the guide.</p><Link className="button" to="/">Back to the start</Link></main>;
}

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return <><ScrollManager /><TopBar /><Header /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:region/:category" element={<CategoryPage />} />
    <Route path="/:region" element={<RegionPage />} />
    {Object.entries(contentPages).filter(([path]) => !/^\/(luzon|visayas|mindanao)(\/|$)/.test(path)).map(([path, file]) => <Route key={path} path={path} element={<LegacyContent file={file} searchable={path === '/directions'} />} />)}
    {Object.entries(oldPageRoutes).map(([path, route]) => <Route key={path} path={path} element={route === '/' ? <Home /> : <LegacyContent file={contentPages[route]} searchable={route === '/directions' || /\/(beaches|rivers|mountains)$/.test(route)} />} />)}
    <Route path="*" element={<NotFound />} />
  </Routes><Footer /><BackToTopButton /></>;
}
