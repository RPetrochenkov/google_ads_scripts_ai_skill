# GAQL (Google Ads Query Language)

GAQL is the query language used by `AdsApp.report()` and `AdsApp.search()`, and
its field names are also used in selector `withCondition()` / `orderBy()` clauses
in the new scripts experience. A working understanding of GAQL is essential for
reporting and for filtering entities efficiently.

## Query Structure

```sql
SELECT   <fields>
FROM     <resource>
WHERE    <conditions>
ORDER BY <field> [ASC|DESC]
LIMIT    <n>
```

*   **`SELECT`** — the fields to return.
*   **`FROM`** — exactly one resource (e.g. `campaign`, `ad_group`, `keyword_view`).
*   **`WHERE`** — filters on attributes, segments, or metrics (optional but recommended).
*   **`ORDER BY` / `LIMIT`** — optional sorting and row cap.

## Field Categories

Field names are namespaced by a prefix that tells you what kind of field it is:

| Prefix | Meaning | Examples |
|---|---|---|
| **Resource** (e.g. `campaign.`, `ad_group.`) | Attributes of the entity | `campaign.name`, `campaign.status`, `ad_group.id` |
| **`segments.`** | Dimensions that split the rows | `segments.date`, `segments.device`, `segments.ad_network_type` |
| **`metrics.`** | Performance numbers | `metrics.clicks`, `metrics.impressions`, `metrics.cost_micros`, `metrics.conversions` |

Adding a `segments.` field changes the granularity of the result — each row is
split by that segment.

## Micros

Money and some ratios are returned in **micros** (millionths). Divide by
1,000,000 to get the account-currency value. The cost field is
`metrics.cost_micros` — there is no `metrics.cost` field.

```javascript
var cost = row['metrics.cost_micros'] / 1000000;
```

## Common Resources

*   `campaign`, `ad_group`, `ad_group_ad` (ads), `keyword_view` (keywords)
*   `campaign_budget`, `bidding_strategy`, `label`
*   `search_term_view`, `geographic_view`, `age_range_view`

## Example

```javascript
function main() {
  var query =
    "SELECT campaign.name, segments.device, metrics.clicks, metrics.cost_micros " +
    "FROM campaign " +
    "WHERE campaign.status = 'ENABLED' AND segments.date DURING LAST_30_DAYS " +
    "ORDER BY metrics.cost_micros DESC";

  var rows = AdsApp.search(query);
  while (rows.hasNext()) {
    var row = rows.next();
    Logger.log(row.campaign.name + " / " + row.segments.device + ": " +
               (row.metrics.costMicros / 1000000).toFixed(2));
  }
}
```

> Note: with `AdsApp.search()`, fields are accessed as camelCase properties
> (`row.metrics.costMicros`); with `AdsApp.report()`, they are string keys
> (`row['metrics.cost_micros']`). See [feature_reporting](./feature_reporting.md).

## Dates

For all date-range syntax (`DURING LAST_30_DAYS`, `BETWEEN ...`, predefined
ranges), see [concept_date_range](./concept_date_range.md).

## Official Documentation

*   [GAQL overview](https://developers.google.com/google-ads/api/docs/query/overview)
*   [Scripts reports & search](https://developers.google.com/google-ads/scripts/docs/features/reports)

## Best Practices & Pitfalls

*   **Always filter:** Add a `WHERE` clause (status and/or date) to avoid pulling the whole account.
*   **Select only what you need:** Fewer fields and segments = faster queries and less data to process.
*   **Not every field combines:** Some metrics and segments are incompatible in one query; if a query errors, remove segments one at a time to isolate the conflict.
*   **Use the query validator/builder** in the Google Ads API docs when unsure of a field name or resource.
