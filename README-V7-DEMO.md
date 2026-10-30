# Nihongo Path V7 — Journey to Fuji (functional DEMO)

Deployed from `dqhuy1982-stack/JLPT` feature branch `feature/v7-journey`, commit `a13926425965d96496b38d12c74b1e39aaeb51e2`.
This app is a DEMO, **not a completed JLPT curriculum**. Its four learner profiles are fictional test data.

- **Preview:** `https://dqhuy1982-stack.github.io/JLPT-preview/`
- **Public:** `https://dqhuy1982-stack.github.io/JLPT/`
- Browser storage is per device and per origin. There is no cloud synchronization.
- LocalStorage key for demo is `nihongo_path_v7_fuji_demo_v1`. Old V6 user data is not intentionally deleted, but is not displayed in the V7 demo.
- PIN/password and personal learning data are not intended for public repositories.
- Original V6.8.1 can be restored using the backup branch created at deployment time.

Pages must be enabled in **JLPT-preview → Settings → Pages → Deploy from a branch → main / (root)** before the preview URL works.

This deployment adds a scoped service worker and manifest for offline/standalone support; it does not change lesson logic.
