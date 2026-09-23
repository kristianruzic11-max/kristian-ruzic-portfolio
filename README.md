# Kristian Ružić — Portfolio

A fast, accessible, responsive personal portfolio built with **React, TypeScript, Vite and Tailwind CSS**. The visual direction follows the Figma prototype provided (clean sans-serif type, generous whitespace, soft gradient accents, dark contrast cards, rounded pill navigation).

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/` — upload that folder anywhere that serves static files (Vercel, Netlify, Cloudflare Pages, GitHub Pages, a plain server, etc).

To preview the production build locally:

```bash
npm run preview
```

## Where to edit things

Everything you're likely to change lives in `src/data/`:

| File | What it controls |
|---|---|
| `src/data/site.ts` | Your name, role, hero copy, about copy, services/process headings, contact email, social links, nav labels |
| `src/data/projects.ts` | Selected Work projects. **Add a project by adding one object to the array** — the grid and cards update automatically. Add a real screenshot to `public/projects/` and set `image: "projects/your-file.jpg"`, or leave it out to use a generated gradient placeholder. |
| `src/data/skills.ts` | The four "What I do" services and their descriptions |

Components live in `src/components/` if you want to change layout, spacing or animations directly. Colors and fonts are defined in `tailwind.config.js` (see the `colors` and `fontFamily` sections).

## Notes

- No fake clients, experience or testimonials are included — the two "Selected Work" entries are placeholders clearly marked for you to replace with your real projects.
- Animations respect `prefers-reduced-motion` — anyone with that OS setting sees the site with no motion, fully visible immediately.
- The mobile menu, nav and all sections were checked at 1440, 1024, 768, 390 and 375px with no horizontal scroll or overflow.
