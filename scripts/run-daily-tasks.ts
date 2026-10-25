import { loadConfig } from '../src/config.js';
import { TaskGenerator } from '../src/automation/task-generator.js';
import { TaskRunner } from '../src/automation/task-runner.js';
import { logger } from '../src/utils/logger.js';
import { formatDailyReportMarkdown } from '../src/reporting/daily-report.js';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  const targetArg = args.find((a) => a.startsWith('--target='));
  const configArg = args.find((a) => a.startsWith('--config='));

  const configPath = configArg ? configArg.split('=')[1] : undefined;
  const config = loadConfig(configPath);

  if (targetArg) {
    const val = parseInt(targetArg.split('=')[1], 10);
    if (!isNaN(val) && val > 0) {
      config.dailyTarget = val;
    }
  }

  logger.info(`Initialized runner. Target: ${config.dailyTarget} tasks. DryRun: ${isDryRun}`);

  const generator = new TaskGenerator();
  const tasks = generator.generateDailyPlan(config);

  const runner = new TaskRunner(process.cwd());
  const report = await runner.runTasks(tasks, config, isDryRun);

  const markdownSummary = formatDailyReportMarkdown(report);
  const summaryPath = path.join(process.cwd(), 'reports', 'LATEST_SUMMARY.md');
  fs.writeFileSync(summaryPath, markdownSummary, 'utf8');

  logger.info(`Summary written to ${summaryPath}`);

  if (report.workflowStatus === 'failure') {
    logger.error('Automation run encountered critical failures.');
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error('Fatal unhandled error in run-daily-tasks:', err);
  process.exit(1);
});
