# Nihongo Path · GitHub release workflow

## Branch purpose
- `main`: production, currently V6.8.1. DO NOT overwrite without reviewed release.
- `develop`: integration branch with CI tests.
- `feature/v7-journey`: V7 roadmap prototype under `preview/v7/`.

## Everyday workflow
1. Make changes in a `feature/*` branch and push to GitHub.
2. GitHub Actions checks the source and produces a downloadable ZIP artifact.
3. Review ZIP on Windows/iPhone in Safari. Export profile JSON first.
4. Open a Pull Request into `develop`; approve only after tests pass.
5. Merge into `main` only when the user explicitly approves a production release.

## Live website preview
A branch or PR alone does not create a website URL. For a separate live preview,
use a preview GitHub Pages site/repository or a deliberately configured deployment.
Do NOT repoint production Pages to `feature/*` without confirmation.

## Personal information
Never commit profile PINs, family photos, actual quiz history, private backups,
API keys or account credentials. Public preview data are fictional aliases.

## Check manually in GitHub Settings
- Settings → Pages: verify Production uses `main` / `(root)` or the intended Actions workflow.
- Settings → Branches / Rules: protect `main` (require PR and successful checks, where supported).
- GitHub → Actions: permit Actions and view the Validate workflow runs.

## Known limitations
GitHub App connector returned 403 for creating branches from ChatGPT even
though repo metadata reported push permission. Use `bootstrap.ps1` after
authenticating Git in Windows. Publishing must not happen without an explicit decision.
