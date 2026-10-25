import { describe, it, expect } from 'vitest';
import { ConfigSchema } from '../src/types.js';
import { loadConfig, DEFAULT_CONFIG } from '../src/config.js';

describe('Configuration System', () => {
  it('parses default configuration properly', () => {
    const config = ConfigSchema.parse({});
    expect(config.dailyTarget).toBe(20);
    expect(config.timezone).toBe('Asia/Jakarta');
    expect(config.minimumQualityChecks).toBe(true);
    expect(config.allowEmptyCommits).toBe(false);
  });

  it('validates dailyTarget boundaries', () => {
    expect(() => ConfigSchema.parse({ dailyTarget: 0 })).toThrow();
    expect(() => ConfigSchema.parse({ dailyTarget: 51 })).toThrow();
    expect(ConfigSchema.parse({ dailyTarget: 15 }).dailyTarget).toBe(15);
  });

  it('loadConfig returns default configuration when file does not exist', () => {
    const config = loadConfig('/non/existent/path.json');
    expect(config).toEqual(DEFAULT_CONFIG);
  });
});
