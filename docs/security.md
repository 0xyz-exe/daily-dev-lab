# Security Policies and Hardening

## Threat Model & Defenses

1. **Least Privilege Workflows:**
   - Write permissions (`contents: write`) are restricted exclusively to `daily-development.yml`.
   - CI workflows run strictly as `contents: read`.

2. **Protected Paths & Tampering Prevention:**
   - Automated scripts cannot modify `.github/workflows/**`, secrets, private keys, or `.env` files.
   - Any attempt to stage forbidden paths immediately aborts the task and reverts the git worktree.

3. **Dependency Protection:**
   - Pinned Node.js engine and lockfile enforcement (`pnpm install --frozen-lockfile` in CI).
   - `pnpm-lock.yaml` cannot be modified by daily automated development tasks.

4. **Credential Isolation:**
   - No personal access tokens (PAT) or plain-text credentials stored in code or configurations.
   - Standard ephemeral `secrets.GITHUB_TOKEN` is used for repository pushes.
