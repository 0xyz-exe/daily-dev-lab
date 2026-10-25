# System Architecture

## Overview

`daily-dev-lab` is an autonomous software development, testing, documentation, and repository maintenance system. It runs on a scheduled GitHub Actions cron workflow independently of local environments.

```
+-----------------------------------------------------------+
|                   GitHub Actions Cron                     |
|           Daily at 01:15 UTC (08:15 WIB, Asia/Jakarta)    |
+-----------------------------+-----------------------------+
                              |
                              v
                   +---------------------+
                   |   Task Generator    |
                   | (Deterministic Plan)|
                   +----------+----------+
                              |
                              v
                   +---------------------+
                   |     Task Runner     |
                   |   (Quality Gates)   |
                   +----------+----------+
                              |
        +---------------------+---------------------+
        |                     |                     |
        v                     v                     v
+---------------+     +---------------+     +---------------+
| Code Quality  |     | Documentation |     | Testing & CI  |
| & Refactoring |     | & Health Docs |     | & Maintenance |
+---------------+     +---------------+     +---------------+
                              |
                              v
                   +---------------------+
                   |   Path Validation   |
                   | & Security Gateway  |
                   +----------+----------+
                              |
                              v
                   +---------------------+
                   | Git Commit & Push   |
                   |  (Eligible Diffs)   |
                   +---------------------+
```

## Component Boundaries

1. **Config Engine (`src/config.ts`, `src/types.ts`)**:
   - Validates configuration parameters via Zod schemas.
   - Enforces bounds on `dailyTarget`, timeouts, and flags.

2. **Task Registry (`src/automation/task-registry.ts`)**:
   - Maintains modular task definitions grouped into 6 categories:
     - `repository-health`
     - `documentation`
     - `code-quality`
     - `testing`
     - `dependency-audit`
     - `maintenance`

3. **Task Generator (`src/automation/task-generator.ts`)**:
   - Calculates deterministic task selection for each day using day-of-year rotation.
   - Caps daily attempts to `dailyTarget`.

4. **Task Runner (`src/automation/task-runner.ts`)**:
   - Safely executes each task sequentially.
   - Runs path security checks against `ALLOWED_PATH_PREFIXES` and `FORBIDDEN_PATTERNS`.
   - Creates atomic Git commits only when meaningful diffs exist.
   - Auto-reverts on task failure.

5. **Reporting (`src/reporting/`)**:
   - Exports structured JSON (`reports/daily-report-YYYY-MM-DD.json`).
   - Generates latest human-readable markdown summaries.
