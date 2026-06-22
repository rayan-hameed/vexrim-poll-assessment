# Vexrim — Weekly Pulse Poll (Full Stack Assessment)

A config-driven, multi-step poll built with React (Vite) on the frontend and
Node.js + Express + PostgreSQL on the backend.

- A custom-built **vertical carousel** (no carousel libraries) slides between
  poll steps.
- Steps are fully **config-driven** — see `client/src/config/pollSteps.js`.
- Each option reveals its label on hover and stays highlighted once selected.
- A **Summary** step lists every answer with a staggered "reveal from left"
  animation, then submits to the Express API for persistence in PostgreSQL.

## Project structure

```
vexrim-assessment/
├── client/   React (Vite) frontend
└── server/   Express + PostgreSQL API
```

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ running locally (or any reachable instance)

## 1. Backend setup (`server/`)

```bash
cd server
npm install
cp .env.example .env   # edit PG* values / DATABASE_URL if needed
```

Create the database (skip if it already exists):

```bash
createdb vexrim_poll
# or, from psql:
psql -U postgres -c "CREATE DATABASE vexrim_poll;"
```

Apply the schema (creates the `poll_responses` table):

```bash
npm run db:setup
```

Run the API:

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

The API starts on `http://localhost:5000` by default.

| Method | Endpoint              | Description                          |
|--------|------------------------|---------------------------------------|
| GET    | `/api/health`           | Health check                          |
| POST   | `/api/poll/submit`      | Body: `{ "answers": { stepId: optionId } }` — persists a submission |
| GET    | `/api/poll/responses`   | Lists the most recent 50 submissions  |

## 2. Frontend setup (`client/`)

```bash
cd client
npm install
cp .env.example .env   # defaults to /api, proxied to localhost:5000
npm run dev
```

The app starts on `http://localhost:5173`. The dev server proxies any
`/api/*` request to `http://localhost:5000` (see `vite.config.js`), so the
backend must be running for submission to work.

To build for production:

```bash
npm run build
npm run preview
```

## How the pieces fit together

- **`config/pollSteps.js`** — single source of truth for every step's title
  and options. Add, remove, or reorder steps here only.
- **`context/PollContext.jsx`** — Context + reducer holding `stepIndex`,
  `answers`, and submission status; exposes `selectOption`, `goNext`,
  `goPrev`, and `reset`.
- **`components/VerticalCarousel.jsx`** — generic, dependency-free carousel
  that translates a vertical track to the active slide.
- **`components/PollStep.jsx`** — renders one step's title + options panel
  inside a carousel slide.
- **`components/OptionButton.jsx`** — single option icon; hover reveals the
  label, click selects and keeps the label visible.
- **`components/SummaryStep.jsx`** — final review screen with the
  reveal-from-left animation, wired to `api/pollApi.js` to submit.

## Notes

- Unit tests were intentionally left out of this build — only implementation
  tasks were completed for this pass.
