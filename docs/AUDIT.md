# Repository Source Code Audit

Last audit: 2026-10-31

## Discovered Annotations & Technical Debt Markers (3)

- **src/automation/task-generator.ts:13**: `// ponytail: deterministic daily offset based on day-of-year; upgrade path: persistent task backlog queue`
- **src/config.ts:25**: `// ponytail: fallback to defaults on malformed file; upgrade path: fail loudly in strict mode`
- **src/tasks/repository-health.ts:91**: `if (line.includes('TODO:') || line.includes('FIXME:') || line.includes('ponytail:')) {`

_Automated audit verified._
