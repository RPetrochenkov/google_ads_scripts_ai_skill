# AdGroup

The `AdsApp.AdGroup` object represents a single Google Ads ad group.

## Methods

*   `ads()`: Returns a selector for the ads in this ad group.
*   `applyLabel(name)`: Applies a label to the ad group.
*   `bidding()`: Returns the bidding strategy of the ad group.
*   `clearNegativeKeyword(text)`: Removes a negative keyword from the ad group.
*   `createNegativeKeyword(text)`: Creates a negative keyword at the ad group level.
*   `enable()`: Enables the ad group.
*   `getAdRotationType()`: Returns the ad rotation type of the ad group.
*   `getBiddingStrategyType()`: Returns the bidding strategy type of the ad group.
*   `getCampaign()`: Returns the campaign to which this ad group belongs.
*   `getEntityType()`: Returns the type of the entity.
*   `getId()`: Returns the ID of the ad group.
*   `getName()`: Returns the name of the ad group.
*   `getResourceName()`: Returns the resource name of the ad group.
*   `getStatsFor(dateRange)`: Returns the stats for the ad group.
*   `isEnabled()`: Returns `true` if the ad group is enabled.
*   `isPaused()`: Returns `true` if the ad group is paused.
*   `isRemoved()`: Returns `true` if the ad group is removed.
*   `keywords()`: Returns a selector for the keywords in this ad group.
*   `labels()`: Returns a selector for the labels applied to this ad group.
*   `negativeKeywords()`: Returns a selector for the negative keywords in this ad group.
*   `pause()`: Pauses the ad group.
*   `removeLabel(name)`: Removes a label from the ad group.
*   `setAdRotationType(adRotationType)`: Sets the ad rotation type of the ad group.
*   `setName(name)`: Sets the name of the ad group.

## Properties/Selectors

*   **Ads:** `adGroup.ads()`
*   **Keywords:** `adGroup.keywords()`
*   **Labels:** `adGroup.labels()`
*   **Negative Keywords:** `adGroup.negativeKeywords()`

## Code Examples

### Get AdGroup Name

```javascript
function main() {
  var adGroup = AdsApp.adGroups().get().next();
  Logger.log(adGroup.getName());
}
```

### Pause an AdGroup

```javascript
function main() {
  var adGroup = AdsApp.adGroups().withCondition("ad_group.name = 'Your AdGroup Name'").get().next();
  adGroup.pause();
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_adgroup](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_adgroup)

## Best Practices & Pitfalls

*   An ad group must belong to a campaign.
*   When creating a new ad group, ensure it has at least one ad and one keyword.
*   Use selectors with specific conditions to avoid accidentally modifying the wrong ad group.
