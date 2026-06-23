# GO Field Kit

Mobile-first quick-access companion for Pokemon GO events, raids, search strings, and daily field checks.

## Run

```bash
npm install
npm start
```

The local dev server runs at `http://127.0.0.1:5173/`.

On macOS, you can also double-click `run-local.command` in this folder. It installs dependencies if needed, then starts the local server.

## Build And Check

```bash
npm run build
npm run lint
```

## Public Deployment

The GitHub Pages build uses:

```bash
npm run build:pages
```

The public site is intended to run at:

```text
https://protorox.github.io/go-field-kit/
```

## Update Event And Raid Data

Seed data lives in `src/data.ts`.

- Events: update the `events` array.
- Current raid bosses: update `featuredRaids` and `raidBosses`.
- Search strings: update `searchStrings`.
- Quick links and source labels: update `dataSnapshot` and `quickLinks`.

Current seed sources:

- https://pokemongo.com/seasons/forever-forward
- https://leekduck.com/events/
- https://leekduck.com/raid-bosses/

This is an unofficial helper app and does not use official Pokemon GO artwork or logos.
