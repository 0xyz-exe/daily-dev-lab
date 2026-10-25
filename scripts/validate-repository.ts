import fs from 'node:fs';
import path from 'node:path';
import { loadConfig } from '../src/config.js';
import { defaultTaskRegistry } from '../src/automation/task-registry.js';
import { isPathSafe } from '../src/utils/validation.js';
import { logger } from '../src/utils/logger.js';

function validateRepo() {
  logger.info('Validating repository consistency...');

  // 1. Config validation
  const cfg = loadConfig();
  if (cfg.dailyTarget < 1) throw new Error('Invalid dailyTarget in config');

  // 2. Registry sanity
  const taskCount = defaultTaskRegistry.count();
  if (taskCount < 10) throw new Error(`Insufficient registered tasks (${taskCount})`);

  // 3. Essential files presence
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'vitest.config.ts',
    'README.md',
    'LICENSE',
    'SECURITY.md',
    'CONTRIBUTING.md',
    '.nvmrc',
    '.editorconfig',
    '.github/workflows/daily-development.yml',
    '.github/workflows/continuous-integration.yml',
  ];

  for (const file of requiredFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Mandatory repository file missing: ${file}`);
    }
  }

  // 4. Security validation check
  if (isPathSafe('.github/workflows/daily-development.yml')) {
    throw new Error(
      'Security flaw: .github/workflows must not be considered safe for automated modification'
    );
  }

  logger.info(`Validation successful! ${taskCount} tasks registered, core files present.`);
}

try {
  validateRepo();
} catch (err) {
  logger.error('Repository validation failed:', err);
  process.exit(1);
}
