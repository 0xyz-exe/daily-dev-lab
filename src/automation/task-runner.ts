import fs from 'node:fs';
import path from 'node:path';
import type { DailyConfig, DailyReport, TaskContext, TaskDefinition } from '../types.js';
import { logger } from '../utils/logger.js';
import { stageFiles, createCommit, revertWorktree, getChangedFiles } from '../utils/git.js';
import { validateChangedFiles } from '../utils/validation.js';

export class TaskRunner {
  constructor(private repoRoot: string = process.cwd()) {}

  public async runTasks(
    tasks: TaskDefinition[],
    config: DailyConfig,
    dryRun = false
  ): Promise<DailyReport> {
    const startTime = Date.now();
    const dateStr = new Date().toISOString().split('T')[0];

    const report: DailyReport = {
      date: dateStr,
      timezone: config.timezone,
      workflowStatus: 'success',
      tasksAttempted: 0,
      tasksCompleted: 0,
      tasksRejected: 0,
      commitsCreated: 0,
      testsPassed: true,
      buildPassed: true,
      filesChanged: [],
      errors: [],
      durationMs: 0,
    };

    const ctx: TaskContext = {
      repoRoot: this.repoRoot,
      config,
      dryRun,
    };

    logger.info(`Starting daily automation run. Target: ${tasks.length} tasks. DryRun: ${dryRun}`);

    for (const task of tasks) {
      report.tasksAttempted++;
      logger.info(
        `[${report.tasksAttempted}/${tasks.length}] Executing task: ${task.name} (${task.id})`
      );

      try {
        const result = await task.run(ctx);

        if (!result.success) {
          report.tasksRejected++;
          const err = result.error || result.summary;
          report.errors.push(`Task ${task.id} failed: ${err}`);
          logger.warn(`Task rejected: ${err}`);
          if (!dryRun) revertWorktree();
          continue;
        }

        const targetFiles = result.filesChanged ?? getChangedFiles();

        if (targetFiles.length > 0) {
          const val = validateChangedFiles(targetFiles);
          if (!val.safe) {
            report.tasksRejected++;
            const err = `Task ${task.id} touched forbidden files: ${val.unsafe.join(', ')}`;
            report.errors.push(err);
            logger.error(err);
            if (!dryRun) revertWorktree();
            continue;
          }

          if (!dryRun) {
            stageFiles(targetFiles);
            const prefix = this.getCommitPrefix(task.category);
            const msg = `${prefix}(${task.category}): ${task.name.toLowerCase()}`;
            const committed = createCommit(msg);
            if (committed) {
              report.commitsCreated++;
              targetFiles.forEach((f) => {
                if (!report.filesChanged.includes(f)) report.filesChanged.push(f);
              });
            }
          } else {
            targetFiles.forEach((f) => {
              if (!report.filesChanged.includes(f)) report.filesChanged.push(f);
            });
          }
        }

        report.tasksCompleted++;
        logger.info(`Task completed successfully: ${result.summary}`);
      } catch (err) {
        report.tasksRejected++;
        const errMsg = err instanceof Error ? err.message : String(err);
        report.errors.push(`Task ${task.id} exception: ${errMsg}`);
        logger.error(`Exception during task ${task.id}:`, err);
        if (!dryRun) revertWorktree();
      }
    }

    report.durationMs = Date.now() - startTime;
    if (report.tasksRejected > 0 && report.tasksCompleted === 0) {
      report.workflowStatus = 'failure';
    } else if (report.tasksRejected > 0) {
      report.workflowStatus = 'partial';
    }

    this.saveReport(report);
    return report;
  }

  private getCommitPrefix(category: string): string {
    switch (category) {
      case 'code-quality':
        return 'refactor';
      case 'documentation':
        return 'docs';
      case 'testing':
        return 'test';
      case 'dependency-audit':
        return 'chore';
      case 'repository-health':
        return 'chore';
      default:
        return 'chore';
    }
  }

  private saveReport(report: DailyReport): void {
    try {
      const reportsDir = path.join(this.repoRoot, 'reports');
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

      const reportPath = path.join(reportsDir, `daily-report-${report.date}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
      logger.info(`Saved daily report to ${reportPath}`);
    } catch (err) {
      logger.error('Failed to save daily report JSON:', err);
    }
  }
}
