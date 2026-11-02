import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { pageMarkup } from './content/pages.js';
import { safetyGuideMarkup } from './content/safety-guide.js';

const regions = [
  { id: 'luzon', label: 'Luzon', summary: 'Mountain trails, quiet coves, and river adventures across the north.', image: '/images/cover-luzon.jpg' },
  { id: 'visayas', label: 'Visayas', summary: 'Island coastlines, community river tours, and rewarding highland walks.', image: '/images/cover-visayas.jpg' },
  { id: 'mindanao', label: 'Mindanao', summary: 'Big landscapes, vivid blue waters, and mountain country in the south.', image: '/images/cover-mindanao.jpg' },
];
const categories = ['beaches', 'rivers', 'mountains'];
const contentPages = {
  '/luzon': 'luzon.html', '/visayas': 'visayas.html', '/mindanao': 'mindanao.html',
  '/luzon/beaches': 'luzon-beaches.html', '/luzon/rivers': 'luzon-rivers.html', '/luzon/mountains': 'luzon-mountains.html',
  '/visayas/beaches': 'visayas-beaches.html', '/visayas/rivers': 'visayas-rivers.html', '/visayas/mountains': 'visayas-mountains.html',
  '/mindanao/beaches': 'mindanao-beaches.html', '/mindanao/rivers': 'mindanao-rivers.html', '/mindanao/mountains': 'mindanao-mountains.html',
  '/about': 'about.html', '/purpose': 'purpose.html', '/team': 'team.html', '/safety': 'safety.html', '/directions': 'directions.html', '/credits': 'credits.html',
};
const pageMarkupAliases = {
  'luzon-beaches.html': 'team.html',
  'luzon-mountains.html': 'purpose.html',
  'visayas-beaches.html': 'mindanao.html',
  'mindanao-rivers.html': 'safety.html',
};
const oldPageRoutes = Object.fromEntries(Object.entries(contentPages).map(([path, file]) => [`/${file}`, path]));
oldPageRoutes['/index.html'] = '/';

function TopBar() {
  return <div className="top-bar"><span>Plan a good trip. Tread lightly.</span><Link to="/safety">Travel with care</Link></div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); setOpenDropdown(''); }, [location.pathname]);
  return <header className="site-header">
    <div className="container navbar">
      <Link to="/" className="logo" aria-label="Gabay sa Lakbay home"><img className="logo-company-image" src="/images/aproj-company-logo.png" alt="AproJ³ Company" /><span className="logo-type">Gabay sa Lakbay<small>Field guide to the Philippines</small></span></Link>
      <button className="menu-button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
      <nav aria-label="Main navigation">
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="site-navigation">
          <li><Link to="/">Home</Link></li>
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
            <ul className="dropdown-content">{categories.map((category) => <li key={category}><Link to={`/${region.id}/${category}`} onClick={(event) => { event.currentTarget.blur(); setOpenDropdown(''); }}>{category}</Link></li>)}<li><Link to={`/${region.id}`} onClick={(event) => { event.currentTarget.blur(); setOpenDropdown(''); }}>Explore all {region.label}</Link></li></ul>
          </li>)}
          <li><Link to="/safety">Safety &amp; Tips</Link></li><li><Link to="/directions">Directions</Link></li><li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer><div className="container footer-inner"><div className="footer-brand"><Link to="/" className="logo footer-logo"><img className="logo-company-image" src="/images/aproj-company-logo.png" alt="AproJ³ Company" /><span className="logo-type">Gabay sa Lakbay<small>Field guide to the Philippines</small></span></Link><p>Good places deserve thoughtful visitors.</p></div><div className="footer-links"><span>Find your way</span><Link to="/luzon">Luzon</Link><Link to="/visayas">Visayas</Link><Link to="/mindanao">Mindanao</Link><Link to="/safety">Travel safety</Link><Link to="/credits">Photo credits</Link></div><small>© {new Date().getFullYear()} Gabay sa Lakbay · A student travel guide</small></div></footer>;
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
    <section className="region-showcase" id="regions"><div className="container"><div className="section-heading"><div><h2>Three regions.<br/>A lot to discover.</h2></div><p>Start with an island group, then choose a coastline, a river, or a trail that suits your trip.</p></div>
      <div className="region-list">{regions.map((region) => <article className={`region-row region-${region.id}`} key={region.id}>
        <Link className="region-main-link" to={`/${region.id}`}><span className="region-initial" aria-hidden="true">{region.label[0]}</span><span className="region-copy"><span className="region-description">{region.summary}</span><strong>{region.label}</strong><span className="region-open">Explore region</span></span></Link>
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
  useEffect(() => setQuery(''), [file]);
  const html = useMemo(() => {
    const sourceFile = pageMarkupAliases[file] ?? file;
    const markup = file === 'safety.html' ? safetyGuideMarkup : pageMarkup[sourceFile] ?? '<section class="section"><div class="container"><h1>Page unavailable</h1><p>This guide page could not be loaded.</p></div></section>';
    const parsed = new DOMParser().parseFromString(markup, 'text/html');
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

  const filteredHtml = useMemo(() => {
    if (!query.trim()) return html;
    const parsed = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    parsed.querySelectorAll('.place-card').forEach((card) => {
      card.classList.toggle('hidden-card', !card.textContent.toLowerCase().includes(query.trim().toLowerCase()));
    });
    return parsed.body.innerHTML;
  }, [html, query]);

  return <main className="legacy-main">
    {searchable && <div className="container browse-tools"><label htmlFor="destination-search">Search these destinations</label><input id="destination-search" type="search" placeholder="Try a name or location…" value={query} onChange={(event) => setQuery(event.target.value)} /><span aria-live="polite">{query ? `Filtering by “${query}”` : 'Search by destination or location'}</span></div>}
    <div className="legacy-content" dangerouslySetInnerHTML={{ __html: filteredHtml }} />
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
    {Object.entries(contentPages).filter(([path]) => !/^\/(luzon|visayas|mindanao)(\/|$)/.test(path)).map(([path, file]) => <Route key={path} path={path} element={<LegacyContent file={file} />} />)}
    {Object.entries(oldPageRoutes).map(([path, route]) => <Route key={path} path={path} element={route === '/' ? <Home /> : <LegacyContent file={contentPages[route]} searchable={/\/(beaches|rivers|mountains)$/.test(route)} />} />)}
    <Route path="*" element={<NotFound />} />
  </Routes><Footer /></>;
}
