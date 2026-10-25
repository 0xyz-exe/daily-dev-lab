import { describe, it, expect } from 'vitest';
import { isPathSafe, validateChangedFiles } from '../src/utils/validation.js';

describe('Path Safety Validation', () => {
  it('allows safe files in approved directories', () => {
    expect(isPathSafe('docs/HEALTH.md')).toBe(true);
    expect(isPathSafe('src/tasks/new-task.ts')).toBe(true);
    expect(isPathSafe('tests/unit.test.ts')).toBe(true);
    expect(isPathSafe('reports/daily-report-2026-10-25.json')).toBe(true);
    expect(isPathSafe('README.md')).toBe(true);
  });

  it('rejects forbidden and dangerous files', () => {
    expect(isPathSafe('.github/workflows/daily.yml')).toBe(false);
    expect(isPathSafe('.env')).toBe(false);
    expect(isPathSafe('.env.production')).toBe(false);
    expect(isPathSafe('id_rsa')).toBe(false);
    expect(isPathSafe('pnpm-lock.yaml')).toBe(false);
    expect(isPathSafe('../outside.ts')).toBe(false);
  });

  it('validates lists of files', () => {
    const mixed = ['docs/HEALTH.md', '.github/workflows/ci.yml'];
    const res = validateChangedFiles(mixed);
    expect(res.safe).toBe(false);
    expect(res.unsafe).toEqual(['.github/workflows/ci.yml']);
  });
});
