# Akintola O. A. — Personal Portfolio (Next.js)

Modern Next.js 14 + TypeScript + Tailwind CSS rebuild of the original static HTML/CSS site.

## Improvements over the original

- **Next.js App Router** with TypeScript and SEO metadata per page
- **Tailwind CSS** design system (custom palette, fonts, animations)
- **next/font** for self-hosted Google Fonts (Playfair Display + Inter)
- **Lucide icons** instead of CDN FontAwesome (smaller, accessible, tree-shaken)
- **Framer Motion** scroll-reveal animations
- Single source of truth for `Navbar` / `Footer` (no more per-page duplication)
- Mobile menu rebuilt with React state, accessible & keyboard friendly
- Cleaned up the duplicated content from the original `index.html`
- Real route structure: `/`, `/about`, `/portfolio`, `/blog`, `/contact`
- Responsive across all breakpoints, polished hero with stat block & spotlight card

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx        # Root layout with fonts, Navbar, Footer
    globals.css       # Tailwind + design tokens
    page.tsx          # Home
    about/page.tsx
    portfolio/page.tsx
    blog/page.tsx
    contact/page.tsx
  components/
    Navbar.tsx
    Footer.tsx
    PageHero.tsx
    Reveal.tsx        # Framer Motion scroll-reveal
```
