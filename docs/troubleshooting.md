# Troubleshooting Guide

## Common Issues & Resolutions

### 1. Daily Workflow Did Not Trigger on Schedule

- GitHub Actions cron schedules on free tier run on best-effort basis and may experience delays during high load.
- Ensure the repository has had activity within the last 60 days (GitHub disables scheduled workflows on inactive repos).
- Manually trigger via `gh workflow run daily-development.yml` or Actions UI.

### 2. Push Rejected (Non-fast-forward / Conflict)

- If manual commits are pushed between workflow runs, GitHub Actions runner might experience rejected pushes.
- Resolution: Fetch latest changes before runner pushes, or rebase on remote main.

### 3. Contribution Graph Not Showing Commits

- Verify commit author email matches your GitHub account:
  ```bash
  git log -1 --pretty=format:"%an <%ae>"
  ```
- Ensure changes are pushed to `main`.
- If repository is private, enable "Include private contributions on my profile" in GitHub profile settings.
