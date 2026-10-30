# Ansh Mehta — portfolio

A 3D take on Red's bedroom from Pokémon FireRed, rendered inside a handheld console.
Walk around the room and check objects to see projects, skills, achievements, résumé and contact details.

Live: https://portfolio-site-anshmehta7xs-projects.vercel.app (plain text version at `/text`)

## Controls

| Action | Keyboard | On-screen |
| --- | --- | --- |
| Walk (tap to turn, hold to keep walking) | Arrow keys / WASD | D-pad |
| Check / confirm | Enter, Space, E, Z | A |
| Back / close | Esc, Backspace, X, B | B |
| Menu (Pokédex, Moves, Badges, Trainer Card, Options) | M | START or the MENU chip |
| Help / options | H, Shift | SELECT |

## Development

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Stack: Next.js 14 (App Router), React Three Fiber + drei, Tailwind CSS.

## Layout

- `src/app` — server page (crawlable summary) + `/text` plain version, layout/metadata, fonts
- `src/data` — all portfolio content (projects, skills, achievements, contact, trainer, menu, copy)
- `src/components/GameCanvas.jsx` — the 3D room, player movement and interactions
- `src/components/GameBoy.jsx` / `Handheld.jsx` — mobile and desktop console shells
- `src/components/controls` — D-pad, A/B and START/SELECT buttons
- `src/hooks/GameInputProvider.jsx`, `useGameInput.js` — one input layer for keyboard and on-screen buttons
- `src/components/intro` — title screen (doubles as the asset loader) and first-visit welcome; replay from OPTIONS
- `src/components/screens/ScreenHost.jsx` — opens content screens and routes B to close them
- `src/lib/constants.js` — room grid: spawn, collisions, interactable tiles (open `/?debug=grid` to see them over the room)
- `src/lib/grid.js`, `src/hooks/usePlayerMovement.js` — tile movement rules

## Credits

Room model: "Pokemon FireRed - Player's Room" by Wesai, CC-BY-4.0 ([Sketchfab](https://sketchfab.com/3d-models/pokemon-firered-players-room-b23b6b253207463c97db2a7092adff74)).
Pokémon is © Nintendo / Game Freak / The Pokémon Company; this is a non-commercial fan tribute.
