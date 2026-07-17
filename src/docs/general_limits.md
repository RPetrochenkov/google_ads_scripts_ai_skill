# Limits & Quotas

Google Ads Scripts run in a managed environment with hard limits. Design scripts
to stay well within them — especially execution time.

## Execution Time

*   **Advertiser (single) account script:** up to **30 minutes**, after which it is cancelled.
*   **Manager account (MCC) script:** up to **30 minutes** normally, or up to **60 minutes** when it uses `executeInParallel()` with a callback (see [feature_mcc](./feature_mcc.md)).

If a script is cancelled for exceeding the time limit, **changes already made are kept** — the script does not roll back.

## Other Documented Limits

| Limit | Value |
|---|---|
| Authorized scripts per account | 250 |
| Results returned by a single selector/iterator | 50,000 |
| `get`/`mutate` operations per run | 10,000 |
| URL fetches (`UrlFetchApp`) | Subject to Apps Script quotas |

> The new scripts experience raised/removed some entity-count processing limits
> (you can process more campaigns, ad groups, and keywords per run), but the
> **execution-time limit still applies**. Treat time as the binding constraint.

## Staying Within Limits

*   **Filter at the API level:** Use `withCondition()` (GAQL field names) and `WHERE` clauses so you fetch only the entities you need — not the whole account.
*   **Batch writes:** Group mutations and spreadsheet writes instead of one-at-a-time calls in a loop (see [general_best_practices](./general_best_practices.md)).
*   **Shard large jobs:** For very large accounts, split work by campaign, label, or date range across multiple scheduled runs, or use [bulk uploads](./feature_bulk_operations.md).
*   **Parallelize MCC work:** Use `executeInParallel()` to spread account processing and gain the 60-minute window.
*   **Log progress:** Emit progress logs so a run cancelled at the time limit tells you how far it got.

## Official Documentation

[https://developers.google.com/google-ads/scripts/docs/limits](https://developers.google.com/google-ads/scripts/docs/limits)
