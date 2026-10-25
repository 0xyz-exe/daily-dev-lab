import { z } from 'zod';

export const ConfigSchema = z.object({
  dailyTarget: z.number().int().min(1).max(50).default(20),
  timezone: z.string().default('Asia/Jakarta'),
  minimumQualityChecks: z.boolean().default(true),
  allowEmptyCommits: z.boolean().default(false),
  allowUnverifiedChanges: z.boolean().default(false),
  requireMeaningfulDiff: z.boolean().default(true),
  requirePassingTests: z.boolean().default(true),
  maximumExecutionMinutes: z.number().int().min(1).max(120).default(20),
});

export type DailyConfig = z.infer<typeof ConfigSchema>;

export type TaskCategory =
  | 'code-quality'
  | 'documentation'
  | 'testing'
  | 'dependency-audit'
  | 'repository-health'
  | 'maintenance';

export interface TaskContext {
  repoRoot: string;
  config: DailyConfig;
  dryRun: boolean;
}

export interface TaskResult {
  success: boolean;
  filesChanged: string[];
  summary: string;
  error?: string;
}

export interface TaskDefinition {
  id: string;
  name: string;
  category: TaskCategory;
  description: string;
  run: (ctx: TaskContext) => Promise<TaskResult>;
}

export interface DailyReport {
  date: string;
  timezone: string;
  workflowStatus: 'success' | 'failure' | 'partial';
  tasksAttempted: number;
  tasksCompleted: number;
  tasksRejected: number;
  commitsCreated: number;
  testsPassed: boolean;
  buildPassed: boolean;
  filesChanged: string[];
  errors: string[];
  durationMs: number;
}
