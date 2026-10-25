import { execFileSync } from 'node:child_process';
import { logger } from './logger.js';
import { validateChangedFiles } from './validation.js';

export function runGit(args: string[], cwd = process.cwd()): string {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Git command failed [git ${args.join(' ')}]: ${message}`);
  }
}

export function getChangedFiles(): string[] {
  try {
    const raw = runGit(['status', '--porcelain']);
    if (!raw) return [];
    return raw
      .split('\n')
      .map((line) => line.trim().slice(3).trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function stageFiles(files: string[]): boolean {
  if (files.length === 0) return false;

  const validation = validateChangedFiles(files);
  if (!validation.safe) {
    logger.error('Refusing to stage unsafe files:', validation.unsafe);
    return false;
  }

  try {
    runGit(['add', ...files]);
    return true;
  } catch (err) {
    logger.error('Failed to stage files:', err);
    return false;
  }
}

export function createCommit(message: string): boolean {
  try {
    const staged = runGit(['diff', '--cached', '--name-only']);
    if (!staged) {
      logger.warn('No staged changes to commit.');
      return false;
    }

    runGit(['commit', '-m', message]);
    return true;
  } catch (err) {
    logger.error('Failed to create commit:', err);
    return false;
  }
}

export function pushBranch(branch = 'main'): boolean {
  try {
    runGit(['push', 'origin', branch]);
    return true;
  } catch (err) {
    logger.error(`Failed to push branch ${branch}:`, err);
    return false;
  }
}

export function revertWorktree(): void {
  try {
    runGit(['reset', 'HEAD', '--hard']);
    runGit(['clean', '-fd']);
  } catch (err) {
    logger.error('Failed to reset worktree:', err);
  }
}
