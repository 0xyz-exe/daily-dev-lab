import path from 'node:path';

// Sensitive paths that automated daily tasks must never touch
export const FORBIDDEN_PATTERNS: RegExp[] = [
  /^\.github\/workflows\//i,
  /^\.github\/dependabot/i,
  /\.env(\..+)?$/i,
  /\.pem$/i,
  /\.key$/i,
  /id_rsa/i,
  /pnpm-lock\.yaml$/i,
  /package-lock\.json$/i,
  /yarn\.lock$/i,
];

// Allowed root directories or files for automated modifications
export const ALLOWED_PATH_PREFIXES = [
  'src/',
  'tests/',
  'docs/',
  'reports/',
  'scripts/',
  'config/',
  'README.md',
];

export function isPathSafe(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\.\//, '');

  // Prevent path traversal
  if (normalized.includes('..') || path.isAbsolute(normalized)) {
    return false;
  }

  // Reject explicitly forbidden paths
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(normalized)) {
      return false;
    }
  }

  // Ensure file sits in allowed prefixes
  return ALLOWED_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function validateChangedFiles(files: string[]): { safe: boolean; unsafe: string[] } {
  const unsafe = files.filter((f) => !isPathSafe(f));
  return {
    safe: unsafe.length === 0,
    unsafe,
  };
}
