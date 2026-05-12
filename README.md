# VeriLearn Frontend

VeriLearn is a learning platform frontend built with Next.js 16, React 19, TypeScript 5, and Tailwind CSS v4. It provides the user-facing layer of the VeriLearn application — pages for authentication, a user dashboard, and course browsing — backed by a full load testing and CI/CD pipeline.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| Fonts | Geist Sans & Geist Mono | via `next/font/google` |
| Linting | ESLint with `eslint-config-next` | ^9 |
| Load Testing | k6 | via Docker / GitHub Actions |
| Metrics Storage | InfluxDB | via Docker |
| Dashboards | Grafana | via Docker |

---

## Project Structure

```
VeriLearn-frontend/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, body wrapper
│   ├── page.tsx                # Home page (/)
│   └── globals.css             # Global styles — Tailwind base + CSS variables
├── public/                     # Static assets (SVGs)
├── load-testing/
│   ├── script.js               # k6 load test — scenarios, thresholds, custom metrics
│   ├── docker-compose.yml      # InfluxDB + Grafana + k6 stack
│   └── grafana/
│       ├── dashboards/
│       │   └── k6-dashboard.json           # Pre-built k6 Grafana dashboard
│       └── provisioning/
│           ├── dashboards/k6.yml           # Grafana dashboard provisioning config
│           └── datasources/influxdb.yml    # Grafana InfluxDB datasource config
├── .github/
│   └── workflows/
│       └── load-test.yml       # CI: runs load tests on PRs to main
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS config (Tailwind v4 plugin)
└── eslint.config.mjs           # ESLint flat config
```

---

## How It Works

### Application Architecture

The app uses the **Next.js App Router** (introduced in Next.js 13, the default from Next.js 14+). All routes are defined as files under the `app/` directory. Each `page.tsx` file becomes a publicly accessible route.

**Root layout (`app/layout.tsx`)**

The root layout wraps every page. It:
- Loads **Geist Sans** and **Geist Mono** from Google Fonts via `next/font/google`, which optimises font loading by self-hosting the fonts at build time (no runtime network requests to Google).
- Injects the font CSS variables (`--font-geist-sans`, `--font-geist-mono`) onto the `<html>` element.
- Applies `antialiased` and `h-full` to the `<html>` element, and `min-h-full flex flex-col` to `<body>` so pages can stretch to fill the viewport.
- Exports a `metadata` object consumed by Next.js to set `<title>` and `<meta name="description">` for the entire app (overridable per page).

**Home page (`app/page.tsx`)**

The current home page is a React Server Component (no `"use client"` directive). It renders a centred layout using Tailwind utility classes and uses `next/image` for optimised image delivery. Dark mode is handled automatically via Tailwind's `dark:` variant, which responds to the OS `prefers-color-scheme` media query.

**Styling (`app/globals.css`)**

Tailwind CSS v4 is imported via `@import "tailwindcss"`. CSS custom properties (`--background`, `--foreground`) are defined on `:root` and swapped for dark mode using a `@media (prefers-color-scheme: dark)` block. The `@theme inline` block maps these to Tailwind's theme tokens (`--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`), making them available as utility classes.

### Routing

Next.js file-system routing maps each `page.tsx` under `app/` to a URL path:

| File | Route |
|---|---|
| `app/page.tsx` | `/` |
| `app/login/page.tsx` | `/login` |
| `app/dashboard/page.tsx` | `/dashboard` |
| `app/courses/page.tsx` | `/courses` |

The `/login`, `/dashboard`, and `/courses` routes are targeted by the load tests but not yet implemented — they are the next pages to build.

### Server vs Client Components

By default, all components in the App Router are **React Server Components** — they render on the server and send HTML to the client, with no JavaScript bundle cost. To use browser APIs, event handlers, or React hooks (`useState`, `useEffect`), a file must opt in with `"use client"` at the top.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads on file save.

### Build for production

```bash
npm run build
npm run start
```

`next build` produces an optimised production build under `.next/`. `next start` serves it.

### Lint

```bash
npm run lint
```

Runs ESLint using the flat config in `eslint.config.mjs`, which extends `eslint-config-next` (includes React, React Hooks, and accessibility rules).

---

## Load Testing

The project ships with a complete [k6](https://k6.io) load testing setup under `load-testing/`.

### How the load test works (`load-testing/script.js`)

The script imports k6's HTTP and metrics modules and defines:

**Custom metrics**

| Metric | Type | Description |
|---|---|---|
| `page_load_time` | Trend | Tracks response time per page, tagged by route |
| `failed_requests` | Counter | Counts requests that did not return HTTP 200 |
| `success_rate` | Rate | Ratio of successful checks |

**Test function**

Each virtual user (VU) iterates over four pages — `/`, `/login`, `/dashboard`, `/courses` — making a GET request to each, running two checks (status 200, response time < 500 ms), recording metrics, and sleeping 1 second between pages.

The `BASE_URL` defaults to `http://localhost:3000` and can be overridden via the `BASE_URL` environment variable to target staging or production.

### Scenarios

| Scenario | Executor | Config | Purpose |
|---|---|---|---|
| `smoke` | constant-vus | 1 VU, 30s | Sanity check — confirms the app responds at all |
| `load` | ramping-vus | 0→20→20→0 over 5m | Simulates normal expected traffic |
| `stress` | ramping-vus | 0→50→50→0 over 9m | Above-normal traffic to find the breaking point |
| `spike` | ramping-vus | 0→100 in 10s, hold 1m, drop in 10s | Sudden traffic burst (e.g. a viral event) |
| `soak` | constant-vus | 10 VUs for 2h | Long-running test to surface memory leaks or degradation over time |

### Thresholds

The test fails if any threshold is breached:

| Metric | Threshold |
|---|---|
| `http_req_duration` p(95) | < 500 ms |
| `http_req_duration` p(99) | < 1500 ms |
| `http_req_failed` rate | < 1% |
| `page_load_time` p(95) | < 600 ms |
| `success_rate` | > 99% |

### Run load tests locally (CLI)

Requires [k6 installed](https://k6.io/docs/get-started/installation/):

```bash
k6 run load-testing/script.js
```

To target a different environment:

```bash
BASE_URL=https://staging.verilearn.com k6 run load-testing/script.js
```

### Run with Grafana dashboards (Docker)

Starts InfluxDB (metrics storage on port 8086), Grafana (dashboards on port 3001), and k6:

```bash
cd load-testing
docker compose up
```

- Grafana: [http://localhost:3001](http://localhost:3001) — anonymous admin access, k6 dashboard pre-provisioned
- InfluxDB: [http://localhost:8086](http://localhost:8086)

k6 streams metrics to InfluxDB in real time. Grafana reads from InfluxDB and renders the dashboard live as the test runs.

---

## CI/CD

### Load test workflow (`.github/workflows/load-test.yml`)

Triggered on every pull request targeting `main`. Steps:

1. **Checkout** — checks out the PR branch.
2. **Setup Node.js 20** — with npm cache.
3. **Install dependencies** — `npm ci` for a clean, reproducible install.
4. **Build and start** — runs `npm run build && npm run start` in the background with `NODE_ENV=production`.
5. **Wait for readiness** — uses `wait-on` to poll `http://localhost:3000` until the server responds (timeout: 60s).
6. **Run k6** — uses the official `grafana/k6-action@v0.3.1` to execute `load-testing/script.js` against `http://localhost:3000`.

If any k6 threshold is breached, the action exits with a non-zero code and the PR check fails.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `http://localhost:3000` | Target URL for the k6 load test |
| `NODE_ENV` | `development` | Set to `production` for optimised builds |

---

## Deployment

The easiest path is [Vercel](https://vercel.com/new) — connect the repository and Vercel detects Next.js automatically, handling builds, previews, and edge deployments.

For self-hosted deployments:

```bash
npm run build   # produces .next/
npm run start   # serves on port 3000
```

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for Node.js server, Docker, and static export options.

---

## Contributing

The project uses a Wave Program model — maintainers post scoped issues that contributors pick up during sprint cycles. Issue types include:

- **New pages** — implement `/login`, `/dashboard`, `/courses` as React Server Components
- **Bug fixes** — styling regressions, broken routes, failing load test thresholds
- **Testing** — set up Jest/Playwright, write smoke and accessibility tests
- **Documentation** — improve inline comments, add JSDoc, expand guides
- **Performance** — tune k6 thresholds, add new load test scenarios, improve Grafana dashboards
- **Accessibility** — fix `eslint-plugin-jsx-a11y` violations as pages are built out
