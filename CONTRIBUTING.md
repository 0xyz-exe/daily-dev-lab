# Contributing Guidelines

Thank you for contributing to `daily-dev-lab`.

## Development Setup

1. Install Node.js LTS (>=20, recommended 22) and pnpm (>=9).
2. Clone repository:
   ```bash
   git clone https://github.com/0xyz-exe/daily-dev-lab.git
   cd daily-dev-lab
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Quality Verification Commands

Before submitting pull requests:

- Run all checks: `pnpm run validate`
- Run tests: `pnpm test`
- Check types: `pnpm run typecheck`
- Lint code: `pnpm run lint`
- Format check: `pnpm run format:check`

## Git Policy

- Do not modify `.github/workflows/` without human review.
- Write conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`).
