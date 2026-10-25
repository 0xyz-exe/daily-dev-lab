import { runGit } from '../utils/git.js';

export interface ContributionSummary {
  totalGitCommits: number;
  recentAuthors: string[];
  lastCommitMessage: string;
  contributionGuidance: string;
}

export function analyzeContributionState(): ContributionSummary {
  let totalGitCommits = 0;
  let recentAuthors: string[] = [];
  let lastCommitMessage = '';

  try {
    const countRaw = runGit(['rev-list', '--count', 'HEAD']);
    totalGitCommits = parseInt(countRaw, 10) || 0;
  } catch {
    totalGitCommits = 0;
  }

  try {
    const authorsRaw = runGit(['log', '-n', '10', '--format=%an <%ae>']);
    recentAuthors = Array.from(new Set(authorsRaw.split('\n').filter(Boolean)));
  } catch {
    recentAuthors = [];
  }

  try {
    lastCommitMessage = runGit(['log', '-1', '--pretty=%B']).trim();
  } catch {
    lastCommitMessage = 'None';
  }

  return {
    totalGitCommits,
    recentAuthors,
    lastCommitMessage,
    contributionGuidance:
      'GitHub calculates profile contributions based on commits pushed to default/gh-pages branch with author email matching verified GitHub account emails.',
  };
}
