# uni.ba

The official site for [UNIBA — a Bazaar of Creation](https://uni.ba).

Built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

## Getting started

```bash
npm install
```

## Development

Start a local dev server with hot reload:

```bash
npm run docs:dev
```

Open http://localhost:5173 in your browser.

## Build

Generate the static site into `docs/.vitepress/dist`:

```bash
npm run docs:build
```

## Preview

Serve the production build locally before deploying:

```bash
npm run docs:preview
```

## Deployment

Pushing to `main` automatically triggers the GitHub Actions workflow and deploys the site to GitHub Pages.
