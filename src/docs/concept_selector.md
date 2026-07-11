# Selectors

Selectors are used to define and retrieve a specific set of Google Ads entities. They allow you to filter, sort, and limit the entities you want to work with.

## Key Methods

*   **`withCondition()`**: Filters entities based on specific criteria (e.g., `metrics.clicks > 100`).
*   **`withIds()`**: Retrieves entities that match a list of specific IDs.
*   **`forDateRange()`**: Sets a time period for which to retrieve performance statistics like clicks or impressions.
*   **`orderBy()`**: Sorts the resulting entities based on a specified field.
*   **`withLimit()`**: Restricts the number of entities returned.

After defining your criteria by chaining these methods, you call the `.get()` method on the selector to obtain an iterator for the selected entities.

## Example

```javascript
function main() {
  var campaignSelector = AdsApp.campaigns()
    .withCondition("Status = ENABLED")
    .forDateRange("LAST_30_DAYS")
    .orderBy("metrics.clicks DESC")
    .withLimit(10);

  var campaignIterator = campaignSelector.get();

  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    Logger.log(campaign.getName() + ": " + campaign.getStats().getClicks() + " clicks");
  }
}
```

## Official Documentation

[https://developers.google.com/google-ads/scripts/docs/concepts/selectors](https://developers.google.com/google-ads/scripts/docs/concepts/selectors)
