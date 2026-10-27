# LINK//9 — Grid Protocol


**A free, source-available, non-commercial cyberpunk-themed card game for your browser.** Hack your way across a 3×3 grid: place programs, link their arrows into chains, trigger combos and crash your rival's hit points before they crash yours.

https://pizzattack.github.io/Link9/

> One HTML file. Play online or play locally. No install, no build step, no account, no ads. Works on desktop and phones.

<p align="center">
  <img src="docs/social/github-social.png" alt="LINK//9 — Grid Protocol" width="100%">
</p>

## Screenshots

<p align="center">
  <img src="docs/screens/combat-desktop.png" alt="Combat on the 3×3 grid" width="49%">
  <img src="docs/screens/campaign-desktop.png" alt="Campaign screen" width="49%">
</p>
<p align="center">
  <img src="docs/screens/deck-desktop.png" alt="Deck builder" width="49%">
  <img src="docs/screens/reward-desktop.png" alt="Reward: choose a program" width="49%">
</p>

<p align="center">
  <img src="docs/screens/combat-phone.png" alt="Combat on phone" width="24%">
  <img src="docs/screens/campaign-phone.png" alt="Campaign on phone" width="24%">
  <img src="docs/screens/deck-phone.png" alt="Deck builder on phone" width="24%">
  <img src="docs/screens/reward-phone.png" alt="Reward on phone" width="24%">
</p>

## Play

- **Online:** `https://<your-username>.github.io/<repo-name>/`
- **Locally:** download the repository and open `index.html` in a recent browser (Chrome, Edge, Firefox, Safari).

## How it plays

Each side has a **3×3 grid**, a **25-program deck** and a hand of **5**. Every turn you place one program on an empty square.

- **Links.** Programs carry arrows on their sides and corners. Two neighbouring programs are *linked* when their arrows face each other. A group of linked programs is a **chain**.
- **Symbols.** Programs carry symbols: **attack**, **shield**, **revive** or **neutral**. When a chain holds **3 symbols or more**, whatever their family, it triggers a **combo**. The most represented family decides the effect: attack hurts the rival, shield heals you, revive wakes your disabled programs. Neutral symbols only help reach 3.
- **Abilities.** Many programs also have an ability: on placement, at the start of your turn, on a combo, or when reactivated. Abilities rotate, lock, destroy, swap, discard, add links or symbols and more.
- **Win** by taking the rival's HP to 0 (you both start at 7, never above 10). **Lose** if your grid is full at the start of your turn.

The in-game **Rules** screen and the guided **Tutorial** cover everything in a few minutes.

## Features

- **180 original programs** in 4 rarities (common, uncommon, rare, ultra-rare), with 20 effect types and 162 illustrations.
- **Random fight:** a quick game against the AI with freshly drawn decks.
- **Campaign:**
  - build a 25-program deck from your collection;
  - win fights to choose 1 of 3 reward programs (the others become **shards**);
  - spend shards at the **Merchant** (random program, pick-1-of-5, shard exchange);
  - improve or scrap programs at the **Workshop**;
  - a **tenacity** reward softens defeats.
- **Illustrated comic:** 72 pages unlocked fragment by fragment as you win campaign fights.
- **Deck editor** with filters by rarity, symbols and links.
- **Guided tutorial** played on the real board.
- **AI opponent** that searches moves with a Monte-Carlo style evaluation, without ever seeing your hand.
- **7 languages:** English, Français, Español, Italiano, Deutsch, 简体中文, 日本語.
- **Sound:** sound effects for every game event and two music playlists (ambient and battle), with volume sliders.
- **Responsive:** layouts for desktop, tablet and phone, with touch drag-and-drop.
- **Installable and offline-ready (PWA):** add it to your home screen and play without a connection once it has loaded. Progress is saved in your browser (localStorage). Nothing is sent anywhere.

## Run, host and modify

The game is a single `index.html` plus static assets. There is nothing to compile.

```
index.html
ui/            interface sprites and icons
abilities/     symbol and trigger icons
illustrations/ card illustrations (001-162)
comics/        comic pages
fonts/         Chakra Petch and Saira (woff2)
sounds/        sfx/ battle/ music/ (mp3)
icons/         favicon, Apple touch icon, PWA icons
manifest.webmanifest, sw.js, favicon.ico   (PWA / offline)
tools/         make-screenshots.mjs, make-icons.py (see below)
```

To host it on **GitHub Pages**: *Settings → Pages → Deploy from a branch → main / (root)*. All paths are relative, so it also works from a sub-folder or any static host.

The file header explains the conventions for contributors, including the build counter shown at the bottom of the home screen.

## Install it as an app (iPhone, Android, desktop)

The game must be opened from its web address (GitHub Pages); a file opened from disk cannot be installed.

- **iPhone / iPad (Safari):** open the game, tap **Share → Add to Home Screen → Add**. It then launches full screen with its own icon. Open it once online and play a few screens so that images and sounds are stored; after that it works offline.
- **Android (Chrome):** menu **⋮ → Install app** (or *Add to Home screen*).
- **Desktop (Chrome / Edge):** click the install icon in the address bar.

Notes: iOS keeps stored data for a limited time if the app is not used for several weeks, and clears it if you clear Safari's website data. Saves live in the browser's storage, so back up anything precious. After an update, close and reopen the app once to get the new version.


- `tools/make-screenshots.mjs` takes the game screenshots (English, desktop + phone) and builds the GitHub social preview and the itch.io cover/banner in one command (see below).
- Scene mode: `index.html?scene=<home|combat|combat-low|campaign|merchant|workshop|deck|reward|rules|tutorial|comic>&lang=<en|fr|…>` shows a reproducible demo state (fixed random seed, no save read or written, sound off). It is what `make-screenshots.mjs` photographs.
- `tools/make-icons.py` regenerates the favicon, the Apple touch icon and the PWA icons from `ui/skin/logo-round.png` (`pip install pillow`, then `python3 tools/make-icons.py` from the repository root).

## About this project

LINK//9 is a personal, non-commercial fan project. I love the gameplay of **Card City Nights** (grid placement, linked arrows, chain combos). This is my own take on it with different rules and content: original programs, a netrunner setting and its own art direction. It is **not affiliated with, endorsed by or derived from** the original game's assets or code.

**How it was made**
- Game design, direction and curation: a human designer.
- **Illustrations, comic pages and UI art:** generated with ChatGPT.
- **Code:** written with Claude (Anthropic).

## Credits

- Sound effects and music from [Pixabay](https://pixabay.com/) creators, listed in [CREDITS.md](CREDITS.md).
- Fonts: [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) and [Saira](https://fonts.google.com/specimen/Saira), SIL Open Font License 1.1 (licence texts in `fonts/`).

## License

- Source code: [PolyForm Noncommercial 1.0.0](LICENSE) — free for any non-commercial use, no commercial use.
- Illustrations, comic, UI and text: [CC BY-NC 4.0](LICENSE-ASSETS.md), credit **pizzattack**.
- Third-party audio and fonts keep their own licences (see Credits).

The game is free to play and share; selling it or using it commercially is not allowed. Strictly speaking this is “source-available”, not OSI open source.

---

## En bref (français)

**LINK//9 — Grid Protocol** est un jeu de cartes netrunner gratuit, au code source disponible et réservé à un usage non commercial, jouable dans le navigateur (un seul fichier HTML, sans installation). Posez des programmes sur une grille 3×3, reliez leurs flèches en chaînes, déclenchez des combos de 3 symboles (attaque, bouclier, réveil) et faites tomber les PV du rival avant les vôtres. 180 programmes originaux, campagne avec marchand et atelier, BD de 72 pages, tutoriel guidé, IA adverse, 7 langues, musique et effets sonores.

Projet de fan, non commercial : j'aime le gameplay de Card City Nights mais pas son style graphique, j'ai donc créé ma propre variante avec des cartes originales dans un univers netrunner. Illustrations, BD et interface générées avec ChatGPT ; code écrit avec Claude.
