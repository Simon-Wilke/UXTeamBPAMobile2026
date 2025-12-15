# NECS 2026 Companion (Vanilla JS)

A non-React conversion of the companion app using plain HTML + Tailwind CSS + vanilla JS.

## Structure
- `index.html` — App shell and Tailwind setup
- `constants.js` — Static data (matches, players, replays, bracket, messages, tickets, notifications)
- `ui.js` — Stateless render helpers (badge, match card, rudimentary radar SVG)
- `script.js` — App state and screen rendering + interactions

## Run
You can open `index.html` directly in a browser, or serve it locally:

```sh
# macOS (zsh)
python3 -m http.server 5500 --directory "/Users/simonwilke/BPA Mobile Project/non-react-app"
# then open http://localhost:5500/index.html
```

No build step or dependencies required. Tailwind is loaded from CDN.

## Notes
- Icons: Replaced lucide-react icons with minimal shapes/emoji to avoid React.
- Charts: Recharts replaced with a simple SVG radar polygon.
- Behavior: Tabs, ticket store (browse/cart/checkout/success), profile modal, schedule, stats, replays, bracket, chat send all work in vanilla.
