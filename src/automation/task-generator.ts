import type { TaskDefinition, DailyConfig } from '../types.js';
import { defaultTaskRegistry, TaskRegistry } from './task-registry.js';

export class TaskGenerator {
  constructor(private registry: TaskRegistry = defaultTaskRegistry) {}

  public generateDailyPlan(config: DailyConfig, date: Date = new Date()): TaskDefinition[] {
    const allTasks = this.registry.getAll();
    if (allTasks.length === 0) return [];

    const targetCount = Math.min(config.dailyTarget, allTasks.length);

    // ponytail: deterministic daily offset based on day-of-year; upgrade path: persistent task backlog queue
    const dayOfYear = Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );

    const rotatedTasks = [
      ...allTasks.slice(dayOfYear % allTasks.length),
      ...allTasks.slice(0, dayOfYear % allTasks.length),
    ];

    return rotatedTasks.slice(0, targetCount);
  }
}
