# Campaign

The `AdsApp.Campaign` object represents a single Google Ads campaign.

## Methods

*   `adGroups()`: Returns a selector for the ad groups in this campaign.
*   `ads()`: Returns a selector for the ads in this campaign.
*   `applyLabel(name)`: Applies a label to the campaign.
*   `bidding()`: Returns the bidding strategy of the campaign.
*   `clearVideoAdSequences()`: Clears the video ad sequences from the campaign.
*   `createNegativeKeyword(text)`: Creates a negative keyword at the campaign level.
*   `enable()`: Enables the campaign.
*   `getAdRotationType()`: Returns the ad rotation type of the campaign.
*   `getBiddingStrategyType()`: Returns the bidding strategy type of the campaign.
*   `getBudget()`: Returns the budget of the campaign.
*   `getEntityType()`: Returns the type of the entity.
*   `getId()`: Returns the ID of the campaign.
*   `getName()`: Returns the name of the campaign.
*   `getResourceName()`: Returns the resource name of the campaign.
*   `getStatsFor(dateRange)`: Returns the stats for the campaign.
*   `isEnabled()`: Returns `true` if the campaign is enabled.
*   `isPaused()`: Returns `true` if the campaign is paused.
*   `isRemoved()`: Returns `true` if the campaign is removed.
*   `keywords()`: Returns a selector for the keywords in this campaign.
*   `labels()`: Returns a selector for the labels applied to this campaign.
*   `negativeKeywords()`: Returns a selector for the negative keywords in this campaign.
*   `pause()`: Pauses the campaign.
*   `removeLabel(name)`: Removes a label from the campaign.
*   `setAdRotationType(adRotationType)`: Sets the ad rotation type of the campaign.
*   `setName(name)`: Sets the name of the campaign.
*   `setVideoAdSequences(videoAdSequences)`: Sets the video ad sequences for the campaign.

## Properties/Selectors

*   **Ad Groups:** `campaign.adGroups()`
*   **Ads:** `campaign.ads()`
*   **Keywords:** `campaign.keywords()`
*   **Labels:** `campaign.labels()`
*   **Negative Keywords:** `campaign.negativeKeywords()`

## Code Examples

### Get Campaign Name

```javascript
function main() {
  var campaign = AdsApp.campaigns().get().next();
  Logger.log(campaign.getName());
}
```

### Pause a Campaign

```javascript
function main() {
  var campaign = AdsApp.campaigns().withCondition("campaign.name = 'Your Campaign Name'").get().next();
  campaign.pause();
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_campaign](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_campaign)

## Best Practices & Pitfalls

*   Always check if a campaign exists before trying to modify it.
*   Use `withCondition` to filter for the specific campaign you want to work with.
*   Be mindful of quotas and limits when performing bulk operations.
