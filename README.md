# My Typing LMS

Static HTML/CSS/JavaScript typing practice app for English QWERTY and Bengali Unicode typing.

## Run locally

Open `index.html` in a modern browser. Progress and settings are stored in that browser's localStorage; they do not sync between devices.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` publishes the site after a successful run.

## Included features

- Bengali spoken guidance throughout the app: lesson instructions, encouragement, gentle error correction, phase completion and final-exam feedback. Guidance stays in clear Bengali even during English typing lessons. Speech uses the browser's Bengali text-to-speech voice when available; learners can toggle voice on or off.

- Responsive interface with dark/light theme.
- 30-day English and 30-day Bengali practice tracks.
- Learn and Game phases with configurable 1–60 minute durations.
- Inactivity-aware practice timer; manual Pause stays paused until Resume.
- Typing feedback, WPM/CPM, accuracy, error counts and per-track best score.
- Three dedicated typing mini-games: Turbo Car (typing accelerates the car), Monkey Tree Climb (each correctly typed word moves the monkey up one branch), and Falling Word Balloons (type the word shown on each descending balloon to pop it).
- Bengali Unicode key input based on the publicly documented UniBijoy-style normal/Shift chart, including common linker-key vowel sequences and pre-base vowel-sign composition.
- Grapheme-aware Bengali counting, with a fallback for browsers without Intl.Segmenter.
- Final English/Bangla typing tests and printable pass certificates.
- Admin preview/unlock, progress simulation, curriculum import/export, JSON backup/restore.

## Important limitations

- The Bengali mapping uses the publicly documented UniBijoy Unicode normal/Shift key chart (Q=ঙ, Shift+Q=ং; G=হসন্ত, Shift+G=দাঁড়ি). This is an educational Unicode layout, not the proprietary Bijoy Classic/SutonnyMJ ANSI engine. Bijoy product versions and ANSI/Unicode workflows can differ; learners should use the same layout as their exam center. References: https://unibijoy.com/keyboard.html and https://typing.bd/guide/bijoy-keyboard.
- The three game modes are lightweight typing mini-games with animated feedback and scoring, not full arcade games.
- Progress, admin credentials and curriculum are stored client-side. The admin password is not secure authentication and can be inspected or changed by anyone with browser access.
- No real browser automation or physical-keyboard end-to-end test has yet been run. Static checks verify syntax and selected wiring only; do not treat them as proof of 100% functionality.

## Checks

Run:

```sh
node --check app.js
node tests/smoke.mjs
```
