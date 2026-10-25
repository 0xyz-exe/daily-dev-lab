import { describe, it, expect } from 'vitest';
import { formatDailyReportMarkdown } from '../src/reporting/daily-report.js';
import type { DailyReport } from '../src/types.js';

describe('Reporting Formatters', () => {
  it('formats daily execution report markdown', () => {
    const report: DailyReport = {
      date: '2026-10-25',
      timezone: 'Asia/Jakarta',
      workflowStatus: 'success',
      tasksAttempted: 20,
      tasksCompleted: 20,
      tasksRejected: 0,
      commitsCreated: 5,
      testsPassed: true,
      buildPassed: true,
      filesChanged: ['docs/HEALTH.md', 'reports/DAILY_SNAPSHOT.md'],
      errors: [],
      durationMs: 4200,
    };

    const md = formatDailyReportMarkdown(report);
    expect(md).toContain('# Daily Development Report: 2026-10-25');
    expect(md).toContain('`SUCCESS`');
    expect(md).toContain('docs/HEALTH.md');
    expect(md).toContain('20');
  });
});
