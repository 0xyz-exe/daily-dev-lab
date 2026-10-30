# daily-dev-lab

Automated daily software development, testing, documentation, and repository maintenance.

[![Continuous Integration](https://github.com/0xyz-exe/daily-dev-lab/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/0xyz-exe/daily-dev-lab/actions/workflows/continuous-integration.yml)
[![Daily Development](https://github.com/0xyz-exe/daily-dev-lab/actions/workflows/daily-development.yml/badge.svg)](https://github.com/0xyz-exe/daily-dev-lab/actions/workflows/daily-development.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Overview

`daily-dev-lab` is an autonomous GitHub-hosted software development engine designed to execute structured, legitimate engineering tasks every day without requiring a local machine to be turned on.

### Key Highlights

- **Target Budget:** 20 verified improvement tasks per day (configurable).
- **Scheduled Execution:** Runs daily at 08:15 WIB (`15 1 * * *` UTC).
- **Zero Hallucinated Commits:** Rejects empty commits (`--allow-empty`) and unverified diffs.
- **Safety Boundary:** Strict file path allowlist prevents modification of workflow files, authentication tokens, and secrets.
- **Deterministic Task Rotation:** Selects real tasks across health, code quality, testing, dependency auditing, and documentation.
- **Structured Observability:** Produces JSON and Markdown execution reports on every run.

---

## Architecture & Workflows

| Workflow              | Schedule (UTC) | Local Time (WIB) | Purpose                                                  |
| :-------------------- | :------------- | :--------------- | :------------------------------------------------------- |
| **Daily Development** | `15 1 * * *`   | 08:15 WIB        | Executes daily development plan & commits verified diffs |
| **CI**                | On Push & PR   | Real-time        | Runs lint, test, typecheck, build validation             |
| **Maintenance**       | `0 0 * * 0`    | 07:00 WIB (Sun)  | Dependency audit & hygiene checks                        |

---

## Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Run test suites
pnpm test

# 3. Execute dry-run of daily development
pnpm run automation:daily -- --dry-run

# 4. Run full repository validation
pnpm run validate
```

---

## Documentation

- [System Architecture](./docs/architecture.md)
- [Automation & Workflows](./docs/automation.md)
- [Security & Threat Model](./docs/security.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [Repository Health Dashboard](./docs/HEALTH.md)

---

## License

[MIT](./LICENSE) © 2026 0xyz-exe
