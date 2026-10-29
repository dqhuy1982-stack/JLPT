NIHONGO PATH V6.8.1 — iPHONE LAYOUT FIX

WHY: Previous index.html expected external style.css, app.js, data.js,
lesson_data.js, enhance.js and polish.js at exactly the same directory.
If they were not uploaded correctly, Safari displayed unstyled HTML.

FIX: This index.html contains all CSS, JavaScript, and main portrait data inline.

UPGRADE ON GITHUB
1. Export your current profile backup first, if available.
2. In repository dqhuy1982-stack/N5, select Add file > Upload files.
3. Upload ALL FIVE FILES at repository ROOT (beside README.md):
   index.html, sw.js, manifest.webmanifest, huy-mark-192.png, huy-mark-512.png.
4. Choose Replace for existing filenames; commit.
5. Open https://dqhuy1982-stack.github.io/N5/index.html?v=681 in Safari.
6. Check the header, profile cards, and login. Do not delete the old PWA or Safari site data.
7. When confirmed, open app from Home Screen; it may need one online reload for new worker to activate.

DATA
Same app/profile storage namespace as V6.8; this file replacement does not deliberately clear user records.
Local offline data remains device-specific. Updating the web app is not cross-device sync.
If something doesn't work, preserve exported JSON and report the screen/error.

Validation: inline CSS/JS and resource links checked; Chromium 320/390/844/1024 layouts previously smoke-tested.
Safari iPhone requires device verification.
