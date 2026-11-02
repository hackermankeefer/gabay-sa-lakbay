# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Inferred from the published content: people exploring Philippine destinations and planning visits. The site’s primary audience has not been explicitly confirmed.

## Product Purpose

Gabay sa Lakbay is a student travel guide to selected destinations in the Philippines. It helps visitors explore beaches, rivers, and mountains across Luzon, Visayas, and Mindanao, and find practical travel and safety information.

## Positioning

The guide groups destination information by region and landscape type. A distinct positioning beyond this organization has not been established.

## Operating Context

Visitors browse the guide in a web browser, navigate by region or destination type, search destination pages, and follow map links for directions or nearby resorts. The project is presented as a student guide.

## Capabilities and Constraints

- React 18, React Router, and Vite power a client-side web app.
- `index.html` is the sole HTML entry point. Route content is stored in `src/content/pages.js` and rendered through the shared React shell.
- Destination pages cover beaches, rivers, and mountains for Luzon, Visayas, and Mindanao. Other pages cover safety, directions, purpose, team, and credits.
- Destination content can include location, ratings, descriptions, attractions, activities, preparation, safety, tips, and map links. Search filters destination cards on category pages.
- The site has no server-side data service; its page content is local to the project.
- Licensed image files are served from `public/images`; `images.csv` records the known authors, licenses, and source pages.
- The accuracy and freshness of destination details, ratings, travel requirements, and access information are not established by the application itself.

## Brand Commitments

- Product name: Gabay sa Lakbay.
- Preserve the forest-green and amber accent identity in future site changes.

## Evidence on Hand

- Destination and informational page content is in `src/content/pages.js`.
- Image source and license records are in `images.csv`; local image assets are in `public/images`.
- Application routes and shared navigation are in `src/App.jsx`.
- The project identifies itself as a student travel guide in the site content.
- Destination ratings and image/source credits appear in the site, but their accuracy has not been independently confirmed here.

## Product Principles

- Make it easy to browse by region and destination type.
- Keep practical travel and safety details close to destination information.
- Preserve the distinction between published information and details visitors should confirm locally.

## Accessibility & Inclusion

The site includes responsive layouts, labeled navigation and search, visible keyboard focus styles, and reduced-motion CSS. No formal accessibility conformance target has been specified.
