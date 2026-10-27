# GitHub repository kit

## Repository name (pick one)
`link9` · `link9-grid-protocol` · `link9-netrunner-cards`

## "About" description (≤ 350 characters)
Free, source-available, non-commercial netrunner card game for the browser. Place programs on a 3×3 grid, link their arrows into chains and trigger combos to crash your rival. 180 original programs, campaign with merchant and workshop, 72-page comic, AI opponent, 7 languages. Single HTML file, no install.

Shorter (≤ 100): `Free netrunner card game: link programs on a 3×3 grid, chain combos, crash the rival. Single HTML file.`

## Website
`https://<your-username>.github.io/<repo-name>/`

## Topics (GitHub allows up to 20)
`card-game` `browser-game` `html5-game` `javascript` `single-file` `no-dependencies` `cyberpunk` `netrunner` `strategy-game` `deck-building` `grid-game` `puzzle-game` `ai-opponent` `campaign` `pwa` `mobile-friendly` `source-available` `ai-generated-art` `claude` `indie-game`

(`pwa` only if you later add a manifest; remove it otherwise.)

## Social preview
1280 × 640 px PNG, under 1 MB: *Settings → General → Social preview*. Generate it with `node tools/make-screenshots.mjs` → `docs/social/github-social.png`. The same command also writes `itch-cover.png` (630×500) and `itch-banner.png` (1600×500) for itch.io, and the screenshots in `docs/screens/`.

## Pages setup
*Settings → Pages → Source: Deploy from a branch → `main` / root.* Wait about a minute, then open the URL.

## Suggested first release
**Tag:** `v1.0.0` **Title:** `LINK//9 — Grid Protocol v1.0`

Release notes:
> First public release.
> - 180 original programs, 4 rarities, 20 effect types
> - Random fights and a full campaign (deck, merchant, workshop, shards)
> - 72-page illustrated comic unlocked by winning
> - Guided tutorial and in-game rules
> - AI opponent, 7 languages, sound effects and music
> - Runs in any modern browser, desktop and mobile

## Files to commit
`index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico`, `icons/`, `README.md`, `LICENSE`, `LICENSE-ASSETS.md`, `CREDITS.md`, `fonts/`, `ui/` (including `ui/skin/logo-round.png` or `.webp`), `abilities/`, `illustrations/`, `comics/`, `sounds/`, `tools/`.

## Things to decide before publishing
1. **Licences are done**: `LICENSE` (PolyForm Noncommercial 1.0.0, code) and `LICENSE-ASSETS.md` (CC BY-NC 4.0, artwork), both credited to pizzattack. In `LICENSE`, replace `<your-github-name>/<repo>` on the last line with your repository address.
2. GitHub's sidebar will show "Other"/"View license" — that is expected for PolyForm.
3. **Name check.** Search "LINK//9" and "Grid Protocol" on GitHub and app stores to avoid a clash.
4. **AI-generated art disclosure.** The README states it. Check the terms of the image tool you used for commercial and open-source redistribution.
5. **Original game.** The README says the project is unaffiliated. Do not use its name in the repo name or in the logo.
6. **Pixabay credits.** Verify the links in `CREDITS.md`.

## Suggested post (itch.io, Reddit, Mastodon…)
> I made a free netrunner card game that runs in your browser. Place programs on a 3×3 grid, link their arrows into chains, and trigger combos with 3 symbols. 180 original programs, a campaign with merchant and workshop, a 72-page comic, 7 languages. Free and non-commercial, source available, no install. Art by ChatGPT, code by Claude. Feedback welcome!

## Icons and installable app (PWA)

**What is generated** (by `tools/make-icons.py`, from the round logo with a transparent background):

| File | Size | Used for |
|---|---|---|
| `favicon.ico` | 16, 32, 48 | browser tab |
| `icons/favicon-16.png`, `favicon-32.png`, `favicon-48.png` | 16-48 | browser tab (PNG) |
| `icons/apple-touch-icon.png` | 180 × 180, opaque dark background | iPhone / iPad home screen |
| `icons/icon-192.png`, `icon-512.png` | 192, 512 | Android / desktop install ("any") |
| `icons/icon-maskable-192.png`, `icon-maskable-512.png` | 192, 512 | Android adaptive icons (logo kept inside the 80 % safe zone) |

The source logo is 348 × 401 px: fine up to the 512 px icons. For a sharper 512 px icon, or a 1024 px store-style icon, export the round logo at 1024 px or more and rerun the script.

**How to regenerate** (any time you change the logo)
1. Replace `ui/skin/logo-round.png` (transparent background, ideally square or nearly square).
2. From the repository root: `pip install pillow` once, then `python3 tools/make-icons.py`.
3. Commit `favicon.ico` and `icons/`. If the icon does not change on a device, remove the app from the home screen and add it again (browsers cache icons aggressively).

No Python? Upload the round logo to a generator such as realfavicongenerator.net or maskable.app/editor, download the icon pack, and keep the same file names.

**How the install works**
- `index.html` links the icons and `manifest.webmanifest`; `sw.js` is the service worker that stores the game for offline use.
- iPhone: Safari → Share → **Add to Home Screen**. Android Chrome: **Install app**. It must be served over HTTPS (GitHub Pages is).
- Offline: only what has been opened once is stored (images, sounds, comic pages are cached as they are used). Core files and fonts are stored on first visit.
- When you replace images or sounds under the same file names, bump `CACHE` in `sw.js` (for example `link9-v2`) so that existing installs refresh them. `index.html` itself always comes from the network first.
- Test it: open the Pages URL in Chrome, DevTools → Application → Manifest and Service Workers, then tick *Offline* and reload.

## Screenshots and social images — no computer needed (iPad)
The repo contains `.github/workflows/screenshots.yml`. On github.com (Safari works): **Actions → Screenshots → Run workflow** (choose the language, default `en`). After ~2 minutes the images are committed to `docs/screens/` and `docs/social/`; open them in the repo to save them to Photos/Files, or download the `screenshots` zip from the run page. Requirement: the folders `ui/`, `fonts/` and `index.html` must be pushed first, and Settings → Actions → General → *Workflow permissions* must be "Read and write".

## Same thing on a computer (one command)
```
npm i playwright && npx playwright install chromium    # once
node tools/make-screenshots.mjs                         # from the repository root (English)
node tools/make-screenshots.mjs fr                      # optional: another language
```
Writes `docs/screens/<scene>-desktop.png` (1920×1080) and `<scene>-phone.png` (390×844 @3x) for 11 scenes, then `docs/social/github-social.png`, `itch-cover.png`, `itch-banner.png`. Needs the repo as-is (index.html, ui/, fonts/, sounds not required). Pick which scenes appear in the images by editing the `JOBS` list at the bottom of the script.
