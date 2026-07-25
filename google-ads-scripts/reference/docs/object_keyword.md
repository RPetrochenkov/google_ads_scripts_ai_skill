# Keyword

The `AdsApp.Keyword` object represents a single keyword in an ad group.

## Methods

*   `getText()`: Returns the text of the keyword.
*   `getMatchType()`: Returns the match type (`BROAD`, `PHRASE`, or `EXACT`).
*   `bidding()`: Provides access to this keyword's bidding fields (e.g. CPC bid).
*   `urls()`: Provides access to this keyword's URL fields. Set the final URL with `keyword.urls().setFinalUrl(url)` (there is no `keyword.setFinalUrl()`).
*   `getQualityScore()`: Returns the quality score in the `1..10` range (may be `null`).
*   `getStatsFor(dateRange)`: Returns the stats for the keyword.
*   `getAdGroup()`: Returns the ad group to which this keyword belongs.
*   `getCampaign()`: Returns the campaign (or `null` for some campaign types).
*   `getId()`: Returns the ID of the keyword. Keyword IDs are **composite** — unique only within their parent ad group (see [concept_id](./concept_id.md)).
*   `applyLabel(name)` / `removeLabel(name)` / `labels()`: Manage labels.
*   `enable()` / `pause()` / `remove()`: Change the keyword's status.
*   `isEnabled()` / `isPaused()` / `isRemoved()`: Check the keyword's status.

## Selecting Keywords (GAQL field names)

Keywords are backed by the `ad_group_criterion` resource, so `withCondition()`
and `orderBy()` use those field names:

*   Status: `ad_group_criterion.status = ENABLED`
*   Text: `ad_group_criterion.keyword.text = 'running shoes'`
*   Match type: `ad_group_criterion.keyword.match_type = EXACT`

```javascript
function main() {
  var keywords = AdsApp.keywords()
    .withCondition("ad_group_criterion.status = ENABLED")
    .withCondition("metrics.clicks > 100")
    .forDateRange("LAST_30_DAYS")
    .orderBy("metrics.clicks DESC")
    .get();

  while (keywords.hasNext()) {
    var keyword = keywords.next();
    Logger.log(keyword.getText() + " [" + keyword.getMatchType() + "]: " +
               keyword.getStatsFor("LAST_30_DAYS").getClicks() + " clicks");
  }
}
```

## Code Examples

### Create a Keyword

Keywords are created with the ad group's builder (see [concept_builder](./concept_builder.md)):

```javascript
function main() {
  var adGroup = AdsApp.adGroups().get().next();
  var operation = adGroup.newKeywordBuilder()
    .withText('running shoes')
    .withCpc(1.20)
    .build();

  if (operation.isSuccessful()) {
    Logger.log("Created keyword ID: " + operation.getResult().getId());
  } else {
    Logger.log("Error: " + operation.getErrors());
  }
}
```

### Pause Low-Performing Keywords

```javascript
function main() {
  var keywords = AdsApp.keywords()
    .withCondition("metrics.cost_micros > 50000000") // > 50 units of account currency
    .withCondition("metrics.conversions = 0")
    .forDateRange("LAST_30_DAYS")
    .get();

  while (keywords.hasNext()) {
    keywords.next().pause();
  }
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_keyword](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_keyword)

## Best Practices & Pitfalls

*   **Composite IDs:** To fetch a specific keyword by ID, provide both the ad group ID and keyword ID.
*   **Negative keywords are different:** Use `adGroup.createNegativeKeyword()` / `campaign.createNegativeKeyword()` — they are not `Keyword` objects.
*   **Filter at the API level:** Use `withCondition()` with GAQL field names instead of iterating all keywords and filtering in code.
