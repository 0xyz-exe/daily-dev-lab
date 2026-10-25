import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../src/utils/logger.js';
import { analyzeContributionState } from '../src/reporting/contribution-report.js';

function generateSummary() {
  const reportsDir = path.resolve(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    logger.warn('Reports directory does not exist.');
    return;
  }

  const files = fs
    .readdirSync(reportsDir)
    .filter((f) => f.startsWith('daily-report-') && f.endsWith('.json'))
    .sort()
    .reverse();

  const contrib = analyzeContributionState();

  const summary = [
    '# Repository Automation & Contribution Summary',
    '',
    `Generated at: ${new Date().toISOString()}`,
    '',
    '## Git Activity Metrics',
    `- **Total Commits on HEAD:** ${contrib.totalGitCommits}`,
    `- **Latest Commit:** ${contrib.lastCommitMessage}`,
    `- **Active Authors:** ${contrib.recentAuthors.join(', ') || 'None'}`,
    '',
    '## Recent Daily Execution Reports',
    files.length > 0
      ? files
          .slice(0, 10)
          .map((f) => `- [${f}](./${f})`)
          .join('\n')
      : 'No prior daily reports recorded.',
    '',
    '## Attribution Guidance',
    contrib.contributionGuidance,
  ].join('\n');

  const outPath = path.join(reportsDir, 'LATEST_SUMMARY.md');
  fs.writeFileSync(outPath, summary, 'utf8');
  logger.info(`Summary written to ${outPath}`);
}

generateSummary();
