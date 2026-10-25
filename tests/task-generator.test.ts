import { describe, it, expect } from 'vitest';
import { TaskGenerator } from '../src/automation/task-generator.js';
import { defaultTaskRegistry } from '../src/automation/task-registry.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('Task Generator', () => {
  const generator = new TaskGenerator(defaultTaskRegistry);

  it('generates a deterministic plan bounded by dailyTarget', () => {
    const config = { ...DEFAULT_CONFIG, dailyTarget: 10 };
    const date = new Date('2026-10-25T08:00:00Z');
    const plan = generator.generateDailyPlan(config, date);

    expect(plan.length).toBe(10);
    // Unique tasks within single daily run
    const ids = new Set(plan.map((t) => t.id));
    expect(ids.size).toBe(10);
  });

  it('rotates plan deterministically on different dates', () => {
    const config = { ...DEFAULT_CONFIG, dailyTarget: 5 };
    const day1 = new Date('2026-10-25T00:00:00Z');
    const day2 = new Date('2026-10-26T00:00:00Z');

    const plan1 = generator.generateDailyPlan(config, day1);
    const plan2 = generator.generateDailyPlan(config, day2);

    expect(plan1[0].id).not.toBe(plan2[0].id);
  });
});
