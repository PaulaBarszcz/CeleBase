# CeleBase

Webpage containing a quiz, slider and infotable — all with pictures of famous actors & actresses.

**Live demo:** https://paulabarszcz.github.io/CeleBase/#/

## Stack

- React 19, React Router v6
- Vite 6
- SCSS (compiled by Vite)
- Vanilla CSS — no UI libraries

## Requirements

- Node.js 18+
- npm 9+

## Getting started

```bash
git clone https://github.com/PaulaBarszcz/CeleBase.git
cd CeleBase
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173 |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Project structure

```
src/
├── js/
│   ├── components/     # React components (Navigation, Slider, Quiz, InfoTable, …)
│   ├── data/           # Static actor dataset (actors.js)
│   └── main.jsx        # App entry point
├── sass/               # SCSS styles per component
public/
└── images/             # Static assets (background, spinner)
```

## Features

- **Slider** — browse 20 actors/actresses with photos and IMDB links
- **Quiz** — guess the actor from their photo, 9-second timer per question
- **InfoTable** — sortable, paginated table of all actors

## Data

Actor data (name, nationality, gender, IMDB link, photo) is stored as a static JS array in `src/js/data/actors.js`. Photos are sourced from Wikimedia Commons via the Wikipedia REST API.

## Deploy

Pushes to `main` automatically trigger a GitHub Actions workflow that builds the app and deploys it to the `gh-pages` branch, which is served by GitHub Pages.
