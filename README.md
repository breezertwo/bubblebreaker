# bubblebreaker

A web-based clone of [Jawbreaker (Windows Mobile game)](<https://en.wikipedia.org/wiki/Jawbreaker_(Windows_Mobile_game)>). Pop groups of same-colored bubbles to score points. Larger groups score more points. The game ends when no adjacent same-colored bubbles remain.

## Development

Requires Node and pnpm.

```bash
pnpm install
pnpm dev        # start dev server
pnpm build      # production build → ./build
pnpm lint       # oxlint
pnpm format     # oxfmt
pnpm typecheck  # tsc --noEmit
```

Run `pnpm dev` to start the development server on `http://localhost:5173`.

## Docker

```bash
docker build -t bubblebreaker .
docker run --rm -p 8080:80 bubblebreaker
```

Then open <http://localhost:8080>.
