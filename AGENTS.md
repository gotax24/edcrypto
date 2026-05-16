# AGENTS.md

**React + TypeScript + Vite** cryptocurrency tracker (frontend-only).

## Environment Setup

Create `.env.local` at project root before running dev server:

```comandos
VITE_API_URL=<CoinGecko API base URL>
VITE_COINGECKO_API_KEY=<CoinGecko demo API key>
```

## Commands

| Command           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Start Vite dev server (port 5173)                                        |
| `npm run build`   | `tsc -b && vite build`                                                   |
| `npm run lint`    | ESLint (fails due to pre-existing error in `src/components/Coin.tsx:12`) |
| `npm run preview` | Preview production build                                                 |

For cloud VMs: `npm run dev -- -- --host 0.0.0.0`

## Package Manager

Use **npm** (not pnpm/yarn) — `package-lock.json` is the lockfile.

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 + Tailwind CSS 4 (via `@tailwindcss/vite`)
- React Router DOM 7
- Lucide React icons
