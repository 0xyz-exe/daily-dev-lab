import { describe, it, expect } from 'vitest';
import { TaskRunner } from '../src/automation/task-runner.js';
import { DEFAULT_CONFIG } from '../src/config.js';
import type { TaskDefinition } from '../src/types.js';

describe('Task Runner', () => {
  const runner = new TaskRunner(process.cwd());

  it('runs tasks in dry-run mode without modifying git state', async () => {
    const mockTasks: TaskDefinition[] = [
      {
        id: 'mock-1',
        name: 'Mock Task 1',
        category: 'testing',
        description: 'Test task',
        run: async () => ({
          success: true,
          filesChanged: ['tests/mock.txt'],
          summary: 'Mock success',
        }),
      },
    ];

    const report = await runner.runTasks(mockTasks, DEFAULT_CONFIG, true);
    expect(report.workflowStatus).toBe('success');
    expect(report.tasksAttempted).toBe(1);
    expect(report.tasksCompleted).toBe(1);
    expect(report.tasksRejected).toBe(0);
  });

  it('handles task failures gracefully and records error', async () => {
    const failingTasks: TaskDefinition[] = [
      {
        id: 'mock-fail',
        name: 'Mock Failing Task',
        category: 'maintenance',
        description: 'Always fails',
        run: async () => ({
          success: false,
          filesChanged: [],
          summary: 'Intended failure',
          error: 'Test error message',
        }),
      },
    ];

    const report = await runner.runTasks(failingTasks, DEFAULT_CONFIG, true);
    expect(report.tasksRejected).toBe(1);
    expect(report.errors.length).toBe(1);
    expect(report.errors[0]).toContain('Test error message');
  });
});
