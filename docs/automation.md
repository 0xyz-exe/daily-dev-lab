# Automation Workflows & Scheduling

## Schedule & Timezone

- **Configured Timezone:** Asia/Jakarta (WIB, UTC+7)
- **Execution Target:** 08:15 WIB Daily
- **GitHub Actions Cron Expression:** `15 1 * * *` (01:15 UTC)

### Workflows Catalog

1. **Daily Development (`.github/workflows/daily-development.yml`)**
   - **Trigger:** Scheduled cron (`15 1 * * *`) and `workflow_dispatch`.
   - **Permissions:** `contents: write`.
   - **Steps:** Check out repo, install Node.js 22 LTS, run pnpm install, execute daily task runner, run full test validation suite, commit and push changes.

2. **Continuous Integration (`.github/workflows/continuous-integration.yml`)**
   - **Trigger:** Push to `main` and Pull Requests against `main`.
   - **Permissions:** `contents: read`.
   - **Checks:** Formatting check, ESLint, TypeScript typecheck, Vitest unit test suite, TypeScript build.

3. **Repository Maintenance (`.github/workflows/repository-maintenance.yml`)**
   - **Trigger:** Weekly schedule on Sundays at 00:00 UTC and `workflow_dispatch`.
   - **Checks:** Dependency audits, workspace hygiene, dead link verification.

4. **Contribution Reporting (`.github/workflows/contribution-report.yml`)**
   - **Trigger:** Workflow dispatch or weekly schedule.
   - **Action:** Generates `reports/LATEST_SUMMARY.md`.

## Contribution Counting Guidance

GitHub profile contribution activity depends on:

1. Commits pushed to the default branch (`main`) or `gh-pages`.
2. Commit author email matching an email address registered and verified on your GitHub account.
3. Repository visibility (public repositories are counted automatically; private repositories require checking "Include private contributions" in profile settings).
4. Genuine file changes (empty commits `--allow-empty` do not qualify).
