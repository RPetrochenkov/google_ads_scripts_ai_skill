# google-ads-scripts (Claude skill)

This repository **is** the [`google-ads-scripts`](google-ads-scripts/SKILL.md)
Claude skill: an offline reference and set of conventions that help Claude write,
review, and debug **Google Ads Scripts** (`AdsApp` JavaScript that runs inside the
Google Ads Scripts environment). Its single purpose is to hold and ship that skill.

## Layout

```
google-ads-scripts/          <- THE SKILL (the only thing that ships)
├── SKILL.md                 <- skill instructions + frontmatter (name, description)
└── reference/
    ├── docs/                <- Google Ads Scripts documentation (concepts, objects, features)
    └── examples/            <- worked example scripts
.github/workflows/release.yml <- builds + publishes the skill zip on tag push
```

Everything at the repo root (this README, the workflow) is tooling — it is **not**
part of the shipped skill. Only the `google-ads-scripts/` folder is packaged.

## Shipping the skill to claude.ai

The skill zip is built for you by GitHub Actions — you never zip anything by hand.

1. Push the repo to GitHub, then push a version tag:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```
2. The **Build and publish skill** workflow runs (free on all GitHub plans) and
   attaches `google-ads-scripts.zip` to a new Release for that tag.
3. Download that Release asset.
4. In claude.ai: **Settings → Customize → Skills → Create skill**, and upload the
   zip. It registers as **google-ads-scripts** (from the `name` in `SKILL.md`).

The archive contains a single top-level `google-ads-scripts/` folder with
`SKILL.md` at its root — the exact shape the claude.ai importer requires.

> Prefer no CI? The same artifact is produced locally with:
> `zip -r google-ads-scripts.zip google-ads-scripts -x '*.DS_Store'`

## Maintaining this repo

- **Commits use a plain message — no `Co-Authored-By:` trailer** (including the
  Claude one).
- When Google Ads Scripts behavior changes, update the relevant file(s) under
  `google-ads-scripts/reference/docs/` **and** the "Key facts" section of
  `google-ads-scripts/SKILL.md` so the two stay in sync.
- Keep `SKILL.md` frontmatter within limits: `name` lowercase/hyphens (≤64 chars),
  `description` ≤200 chars.
