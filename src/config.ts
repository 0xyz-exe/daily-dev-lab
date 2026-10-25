import fs from 'node:fs';
import path from 'node:path';
import { ConfigSchema, type DailyConfig } from './types.js';

export const DEFAULT_CONFIG: DailyConfig = {
  dailyTarget: 20,
  timezone: 'Asia/Jakarta',
  minimumQualityChecks: true,
  allowEmptyCommits: false,
  allowUnverifiedChanges: false,
  requireMeaningfulDiff: true,
  requirePassingTests: true,
  maximumExecutionMinutes: 20,
};

export function loadConfig(configPath?: string): DailyConfig {
  const targetPath = configPath || path.resolve(process.cwd(), 'config', 'daily-dev.config.json');

  if (fs.existsSync(targetPath)) {
    try {
      const raw = fs.readFileSync(targetPath, 'utf8');
      const parsed = JSON.parse(raw);
      return ConfigSchema.parse(parsed);
    } catch (err) {
      // ponytail: fallback to defaults on malformed file; upgrade path: fail loudly in strict mode
      console.warn(`[config] Invalid config at ${targetPath}, falling back to defaults:`, err);
      return DEFAULT_CONFIG;
    }
  }

  return DEFAULT_CONFIG;
}
