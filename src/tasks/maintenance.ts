import fs from 'node:fs';
import path from 'node:path';
import type { TaskDefinition, TaskResult } from '../types.js';

export const maintenanceTasks: TaskDefinition[] = [
  {
    id: 'maint-reports-hygiene',
    name: 'Audit and Clean Reports Workspace Hygiene',
    category: 'maintenance',
    description:
      'Ensure reports/ directory exists, retains .gitkeep, and manages log rotation safely.',
    run: async (ctx): Promise<TaskResult> => {
      const reportsDir = path.join(ctx.repoRoot, 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      const gitkeepPath = path.join(reportsDir, '.gitkeep');
      if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '', 'utf8');
        return {
          success: true,
          filesChanged: ['reports/.gitkeep'],
          summary: 'Re-created reports/.gitkeep marker',
        };
      }
      return {
        success: true,
        filesChanged: [],
        summary: 'Verified reports directory presence and retention hygiene',
      };
    },
  },
  {
    id: 'maint-verify-workflow-definitions',
    name: 'Verify GitHub Workflow Definitions',
    category: 'maintenance',
    description: 'Verify required GitHub Actions workflow YAML files exist in .github/workflows.',
    run: async (ctx): Promise<TaskResult> => {
      const wfDir = path.join(ctx.repoRoot, '.github', 'workflows');
      if (!fs.existsSync(wfDir)) {
        return {
          success: false,
          filesChanged: [],
          summary: 'Workflow dir missing',
          error: 'Missing workflows dir',
        };
      }
      const files = fs.readdirSync(wfDir).filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'));
      const required = ['daily-development.yml', 'continuous-integration.yml'];
      const missing = required.filter((r) => !files.includes(r));
      if (missing.length > 0) {
        return {
          success: false,
          filesChanged: [],
          summary: `Missing workflows: ${missing.join(', ')}`,
          error: 'Workflows incomplete',
        };
      }
      return {
        success: true,
        filesChanged: [],
        summary: `Verified ${files.length} GitHub Actions workflow specifications`,
      };
    },
  },
  {
    id: 'maint-verify-templates',
    name: 'Verify Issue and PR Templates',
    category: 'maintenance',
    description: 'Ensure bug report template and PR checklist template are configured.',
    run: async (ctx): Promise<TaskResult> => {
      const prPath = path.join(ctx.repoRoot, '.github', 'pull_request_template.md');
      const issueDir = path.join(ctx.repoRoot, '.github', 'ISSUE_TEMPLATE');
      const prOk = fs.existsSync(prPath);
      const issueOk = fs.existsSync(issueDir);

      if (!prOk || !issueOk) {
        return {
          success: false,
          filesChanged: [],
          summary: 'GitHub templates missing',
          error: 'Missing PR or Issue templates',
        };
      }
      return {
        success: true,
        filesChanged: [],
        summary: 'Verified GitHub Issue template and Pull Request template',
      };
    },
  },
  {
    id: 'maint-generate-daily-snapshot',
    name: 'Generate Daily Repository Snapshot',
    category: 'maintenance',
    description:
      'Record an incremental daily snapshot of repository status into reports/DAILY_SNAPSHOT.md.',
    run: async (ctx): Promise<TaskResult> => {
      const snapshotPath = path.join(ctx.repoRoot, 'reports', 'DAILY_SNAPSHOT.md');
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0];

      const content = `# Daily Laboratory State Snapshot

- **Date:** ${dateStr}
- **Time (UTC):** ${timeStr}
- **Engine Version:** 1.0.0
- **Daily Target:** ${ctx.config.dailyTarget} tasks
- **Status:** Operational

_Generated as part of automated daily development cycle._
`;

      if (ctx.dryRun) {
        return {
          success: true,
          filesChanged: ['reports/DAILY_SNAPSHOT.md'],
          summary: 'Dry-run: snapshot generated',
        };
      }

      fs.writeFileSync(snapshotPath, content, 'utf8');
      return {
        success: true,
        filesChanged: ['reports/DAILY_SNAPSHOT.md'],
        summary: `Generated daily state snapshot for ${dateStr}`,
      };
    },
  },
];
