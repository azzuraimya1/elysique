# Makeup 101

A free, beginner-friendly web app that helps you start doing your own makeup.

- **Beginner guide**: what each product does and what to look for
- **Skin type quiz**: find out if your skin is dry, oily, combination, normal or sensitive, with tailored tips
- **Silicone explainer**: silicone-based vs. water-based products, and how to spot silicones on a label
- **Label scanner**: photo of an ingredient list, read in the browser with OCR, with a plain-English explanation of each ingredient

Everything runs client-side. No accounts, no server, no API keys, and photos never leave your device.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy free on GitHub Pages

1. Push this repo to GitHub (default branch `main`).
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

## How the scanner works

1. [Tesseract.js](https://github.com/naptha/tesseract.js) extracts text from the photo in the browser.
2. `src/lib/analyze.ts` splits the text into ingredients and matches each against `src/data/ingredients.ts`.
3. Anything ending in `-cone`, `-siloxane`, `-silanol` or `-conol` is flagged as a silicone, even if it isn't in the database.

## Ideas for next steps

- Grow the ingredient database (it is the heart of the app)
- Barcode lookup with the free [Open Beauty Facts](https://world.openbeautyfacts.org/) API
- Make it an installable PWA with offline support
- "Compare two products" view
- Save products and notes in `localStorage`
- Tests for `analyze.ts`

## Disclaimer

Educational only, not medical advice.
