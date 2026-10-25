import type { DailyReport } from '../types.js';

export function formatDailyReportMarkdown(report: DailyReport): string {
  return `# Daily Development Report: ${report.date}

- **Timezone:** ${report.timezone}
- **Workflow Status:** \`${report.workflowStatus.toUpperCase()}\`
- **Duration:** ${(report.durationMs / 1000).toFixed(2)}s
- **Tasks Attempted:** ${report.tasksAttempted}
- **Tasks Completed:** ${report.tasksCompleted}
- **Tasks Rejected:** ${report.tasksRejected}
- **Commits Created:** ${report.commitsCreated}
- **Files Modified:** ${report.filesChanged.length}

## Quality Gates Status
- **Automated Tests:** ${report.testsPassed ? '✅ PASS' : '❌ FAIL'}
- **Build Verification:** ${report.buildPassed ? '✅ PASS' : '❌ FAIL'}

${
  report.filesChanged.length > 0
    ? `### Files Changed\n${report.filesChanged.map((f) => `- \`${f}\``).join('\n')}`
    : 'No repository files were modified in this run.'
}

${
  report.errors.length > 0
    ? `### Recorded Errors\n${report.errors.map((e) => `- ⚠️ ${e}`).join('\n')}`
    : ''
}

---
*Report generated automatically by daily-dev-lab automation engine.*
`;
}
