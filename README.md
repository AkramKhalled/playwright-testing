# Playwright Test Automation

UI and API test automation framework for [Automation Exercise](https://automationexercise.com), built with **Playwright**, **TypeScript**, and **Zod**.

## What's in this project

- **26 UI tests** – Page Object Model; flows for registration, login, cart, checkout, subscription, contact, and more.
- **14 API tests** – Auth, products, brands, search, create/update/delete account; response validation with Zod schemas.
- **Structured layout** – `pages/`, `api/`, `utils/`, `tests/ui/`, `tests/api/`, `api/schemas/`.

## Tech stack

- [Playwright](https://playwright.dev/) – UI and API testing
- TypeScript
- [Zod](https://zod.dev/) – API response schema validation
- dotenv – config via `.env`

## Prerequisites

- Node.js 18+
- npm

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/playwright-testing.git
   cd playwright-testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy the example env file and set the base URL:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and set `BASE_URL` (default: `https://automationexercise.com`).

## Running tests

| Command | Description |
|--------|-------------|
| `npm test` | Run all tests (UI + API) |
| `npx playwright test tests/ui` | UI tests only |
| `npx playwright test tests/api` | API tests only |
| `npx playwright test tests/ui --headed` | UI tests in headed browser |
| `npx playwright show-report` | Open last HTML report |

## Project structure

```
├── api/                 # API client and schemas
│   ├── *.api.ts         # Request helpers (products, auth, account, …)
│   └── schemas/         # Zod schemas for API responses
├── pages/               # Page Object Model (UI)
├── utils/               # Test data, helpers (dataFile, signUp, …)
├── tests/
│   ├── ui/              # UI specs (01_… to 26_…)
│   └── api/             # API specs (01_… to 14_…)
├── playwright.config.ts
├── .env.example
└── README.md
```

## License

ISC
