import { describe, it, expect } from 'vitest';
import { defaultTaskRegistry, TaskRegistry } from '../src/automation/task-registry.js';

describe('Task Registry', () => {
  it('registers default tasks across multiple categories', () => {
    const all = defaultTaskRegistry.getAll();
    expect(all.length).toBeGreaterThanOrEqual(20);

    const categories = new Set(all.map((t) => t.category));
    expect(categories.has('repository-health')).toBe(true);
    expect(categories.has('documentation')).toBe(true);
    expect(categories.has('code-quality')).toBe(true);
    expect(categories.has('testing')).toBe(true);
    expect(categories.has('dependency-audit')).toBe(true);
    expect(categories.has('maintenance')).toBe(true);
  });

  it('retrieves tasks by ID', () => {
    const task = defaultTaskRegistry.get('health-update-metrics');
    expect(task).toBeDefined();
    expect(task?.name).toContain('Health Metrics');
  });

  it('filters tasks by category', () => {
    const testing = defaultTaskRegistry.getByCategory('testing');
    expect(testing.length).toBeGreaterThan(0);
    testing.forEach((t) => expect(t.category).toBe('testing'));
  });

  it('allows registering custom tasks', () => {
    const customRegistry = new TaskRegistry();
    const countBefore = customRegistry.count();
    customRegistry.register({
      id: 'custom-task',
      name: 'Custom Task',
      category: 'maintenance',
      description: 'Custom description',
      run: async () => ({ success: true, filesChanged: [], summary: 'Done' }),
    });
    expect(customRegistry.count()).toBe(countBefore + 1);
  });
});
