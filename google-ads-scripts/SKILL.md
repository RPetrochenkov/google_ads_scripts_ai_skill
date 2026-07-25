---
name: google-ads-scripts
description: Write, review, and debug Google Ads Scripts (AdsApp JavaScript): GAQL reporting, selectors, campaigns, ad groups, keywords, budgets, bid strategies, Performance Max, MCC, bulk uploads, Sheets export.
---

# Google Ads Scripts

This skill helps you author and maintain high-quality **Google Ads Scripts** — JavaScript that runs inside the Google Ads Scripts environment using the `AdsApp` API. It bundles an offline reference for the current ("new") scripts experience and worked example scripts.

## When to use this skill

Use it for any task that involves Google Ads *Scripts* (not the raw Google Ads API in another language):

- Pulling performance data with GAQL via `AdsApp.report()` or `AdsApp.search()`.
- Selecting and filtering entities (`AdsApp.campaigns()`, `.adGroups()`, `.keywords()`) with `withCondition()` / `orderBy()`.
- Reading or changing campaigns, ad groups, keywords, budgets, labels, and bid strategies.
- Performance Max reporting, MCC (manager-account) scripts, bulk uploads, or exporting to Google Sheets.

## How to work

1. **Consult the bundled docs first.** The `reference/docs/` directory is the primary source of truth — prefer it over general recollection, because Google Ads Scripts syntax has changed (see "Key facts" below). Read the file matching the task before writing code.
2. **Follow the coding standards** in the section below.
3. **Study the examples** in `reference/examples/` for end-to-end structure (config block, `main()`, logging, Sheets export).
4. Link out to official docs (listed in `reference/docs/general_reference.md`) only when the local docs are insufficient.

## Reference map (`reference/docs/`)

- **Concepts:** `concept_gaql` (Google Ads Query Language primer), `concept_selector`, `concept_iterator`, `concept_builder`, `concept_entity`, `concept_id`, `concept_date_range`.
- **Objects:** `object_campaign`, `object_adgroup`, `object_keyword`, `object_budget`, `object_bidding`, `object_audience`, `object_label`.
- **Features:** `feature_reporting`, `feature_performance_max`, `feature_mcc`, `feature_bulk_operations`.
- **General:** `general_best_practices`, `general_limits`, `general_reference`.

## Worked examples (`reference/examples/`)

- `campaign_performance_analyzer.js` — read-only: pulls campaign stats, flags ROAS outliers vs. the account average, exports to Google Sheets.
- `performance_max_spend_analyzer.js` — compares PMax spend across two windows to surface declines, using `AdsApp.report()` with `metrics.cost_micros`.

## Key facts (current scripts experience)

- **GAQL field names in `withCondition()` / `orderBy()`.** Use API names like `campaign.status = ENABLED`, `ad_group.name = '...'`, `ad_group_criterion.status = ENABLED`, `metrics.clicks > 100` — not legacy AWQL names like `Status = ENABLED`. (Legacy names still auto-convert but are deprecated.)
- **Cost is `metrics.cost_micros`** (micros = millionths). Divide by 1,000,000 for account currency. There is no `metrics.cost` field.
- **ES6 is supported** — `const`/`let`, arrow functions, template literals, classes, `for...of`.
- **Campaign bid strategies can be set** via `campaign.bidding().setStrategy(...)`, with `argsBuilder().withTargetRoas()` etc. for parameterized strategies.
- **Limits:** ~30 min execution per run (60 min for MCC with `executeInParallel`), 250 authorized scripts/account. Filter at the API level and batch writes. See `reference/docs/general_limits.md`.

## Scoping & logging (ask before you run)

Before writing or running a script that targets specific entities, establish scope and logging strategy:

- **Campaigns — ask for the naming convention first.** If target campaigns share a naming pattern, filter on it (e.g. `withCondition("campaign.name LIKE '...'")`). **If there is no convention, propose labels:** label the target campaigns and have the script act only on labeled campaigns, so only labeled campaigns are affected.
- **Accounts (MCC) — ask for the account naming convention.** When running at manager-account level, ask whether accounts follow a naming convention so the script selects the right ones; if none, use a label/allow-list at the account level.
- **Always suggest logging** key steps and decisions so runs are debuggable and a run cancelled at the time limit still shows progress.
- **Batch logs on large accounts / high-change runs.** Logging one line per action slows the script and can cause it to run out of execution time. In that case, collect log lines in an array during processing and print them once at the end (a batched summary) instead of action-by-action. See `reference/docs/general_limits.md`.

## Coding standards

- **Syntax:** `AdsApp` (legacy `AdWordsApp` is out of scope).
- **Naming:** constants `UPPER_SNAKE_CASE`, variables & functions `lower_snake_case`, classes `CamelCase`. Script file names `snake_case.js`.
- **Style:** Google JavaScript Style Guide. Keep code simple and readable; avoid custom classes unless truly needed.
- **Logging:** log important steps and decisions (`console.log` / `Logger.log`) so a run cancelled at the time limit still shows progress.
- **Safety:** put tunable values in a config block at the top; use `preview()` before `apply()` / live mutations; sanity-check computed values (e.g. budgets) before writing.
