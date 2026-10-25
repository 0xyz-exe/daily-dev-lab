import type { TaskDefinition } from '../types.js';
import { repositoryHealthTasks } from '../tasks/repository-health.js';
import { documentationTasks } from '../tasks/documentation.js';
import { codeQualityTasks } from '../tasks/code-quality.js';
import { testingTasks } from '../tasks/testing.js';
import { dependencyAuditTasks } from '../tasks/dependency-audit.js';
import { maintenanceTasks } from '../tasks/maintenance.js';

export class TaskRegistry {
  private tasks: Map<string, TaskDefinition> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults(): void {
    const all = [
      ...repositoryHealthTasks,
      ...documentationTasks,
      ...codeQualityTasks,
      ...testingTasks,
      ...dependencyAuditTasks,
      ...maintenanceTasks,
    ];

    for (const task of all) {
      this.tasks.set(task.id, task);
    }
  }

  public register(task: TaskDefinition): void {
    this.tasks.set(task.id, task);
  }

  public get(id: string): TaskDefinition | undefined {
    return this.tasks.get(id);
  }

  public getAll(): TaskDefinition[] {
    return Array.from(this.tasks.values());
  }

  public getByCategory(category: string): TaskDefinition[] {
    return this.getAll().filter((t) => t.category === category);
  }

  public count(): number {
    return this.tasks.size;
  }
}

export const defaultTaskRegistry = new TaskRegistry();
