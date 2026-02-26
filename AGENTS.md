# AGENTS.md

## Cursor Cloud specific instructions

This is a **React + TypeScript + Vite** single-page application (cryptocurrency tracker). It is frontend-only with no backend services.

### Services

| Service | Command | Port | Notes |
|---|---|---|---|
| Vite Dev Server | `npm run dev` | 5173 | Use `-- --host 0.0.0.0` to expose on all interfaces in cloud VMs |

### Environment Variables

The app requires a `.env.local` file at the project root with two variables:
- `VITE_API_URL` — CoinGecko API base URL
- `VITE_COINGECKO_API_KEY` — CoinGecko demo API key

These are provided as Cursor Cloud secrets with the same names. Create `.env.local` by writing each secret value from the environment into the file before starting the dev server.

### Commands

Standard commands are in `package.json` scripts:
- **Dev**: `npm run dev`
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Lint**: `npm run lint` (ESLint)
- **Preview**: `npm run preview`

### Known Issues

- `npm run lint` exits with code 1 due to a pre-existing `react-hooks/set-state-in-effect` error in `src/components/Coin.tsx`. This is a codebase issue, not an environment problem.
- Both `package-lock.json` and `yarn.lock` exist; use **npm** as the primary package manager (matches `package-lock.json`).
