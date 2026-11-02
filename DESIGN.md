---
name: Gabay sa Lakbay
description: A field guide to beaches, rivers, and mountains across the Philippines.
colors:
  forest: "#183c32"
  forest-deep: "#102c25"
  amber: "#e9a23b"
  amber-hover: "#f4b957"
  paper: "#f6f3e9"
  paper-light: "#fffdf6"
  ink: "#17261f"
  muted: "#5e6d62"
  line: "#d9ded2"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(56px, 7.4vw, 104px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(42px, 6vw, 68px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 700
rounded:
  none: "0px"
  mark: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "42px"
  section: "70px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.forest-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-primary-hover:
    backgroundColor: "{colors.amber-hover}"
  destination-card:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper-light}"
    rounded: "{rounded.none}"
  place-card:
    backgroundColor: "{colors.paper-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

## Overview

An editorial field guide with a warm paper ground, forest-green structure, and amber accents. The home page uses a full-bleed Philippine mountain photograph with a restrained topographic line overlay behind large serif headlines; destination pages prioritize clear, scannable travel details. Keep the forest green and amber accents consistent.

## Colors

Forest green is the primary brand color for navigation, hero surfaces, and destination imagery. Amber marks calls to action, focus states, and small highlights. Warm paper and off-white form the main reading surfaces; ink and muted green-gray carry text. Use the existing colors in `src/app.css` and `assets/style.css` as the source of truth.

## Typography

Use Georgia or its Times fallback for display headings and editorial accents. Use Arial/Helvetica for body text, navigation, labels, and dense destination details. Keep display headings regular weight with tight line spacing and negative tracking; keep small labels bold and compact.

## Layout

The home page uses a full-width, viewport-height hero with its content aligned to the left within a centered 1280px/92% container. A locally served landscape photograph fills the hero, with contour artwork as a subtle overlay; neither is a separate side panel. The regional directory is centered below it. Destination content uses a 1120px/90% container; cards form a two-column grid on desktop and one column at 720px and below. The shared header stays sticky.

## Elevation & Depth

The visual system is mostly flat: use thin green-gray borders and tonal surface changes. Reserve soft shadows for the sticky header, dropdown menus, and the offset contour illustration in the hero. Avoid adding heavy shadows to ordinary cards.

## Shapes

Buttons, cards, fields, and navigation surfaces use square corners. The circular logo mark is the main exception. Use thin borders to define surfaces rather than rounded containers.

## Components

- Primary actions use amber with deep-green text; hover shifts to a lighter amber. Keep action labels plain and omit decorative arrow glyphs.
- Navigation sits on the off-white paper surface with green text. Dropdowns use a paper surface, thin border, and restrained shadow.
- Destination cards use a landscape image or contour fallback above an off-white content panel. Keep titles serif and supporting information sans-serif.
- Use locally stored, credited destination photographs from `public/images`; image source and license records live in `images.csv`.
- Search fields use an off-white fill, square corners, a thin border, and an amber keyboard-focus outline.
- Preserve visible keyboard focus and the reduced-motion treatment already present in the CSS.

## Do's and Don'ts

- Do preserve forest green and amber as the recognizable accents.
- Do use contour-line artwork when a destination image is unavailable; do not imply it is a real destination photograph.
- Do keep destination information readable and grouped under clear labels.
- Don't introduce a competing accent palette, decorative rounded-card system, or heavy shadows.
- Don't invent destination imagery, ratings, or travel facts.
