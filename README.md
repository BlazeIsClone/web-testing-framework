# Web Testing Framework

A web testing framework built with [Stagehand](https://github.com/browserbase/stagehand) that automates form filling on contact pages.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Run the tests:

```bash
npm start <website-url>
```

## Configuration

- **Local testing**: Set `env: "LOCAL"` in `stagehand.config.ts`
- **Browserbase**: Set `env: "BROWSERBASE"` in `stagehand.config.ts` and add your Browserbase API keys to `.env`
