# Audiences

The `AdsApp.Audience` object represents an audience in Google Ads.

## Methods

*   `bidding()`: Returns the bidding strategy of the audience.
*   `getAdGroup()`: Returns the ad group to which this audience belongs.
*   `getAudienceId()`: Returns the ID of the audience.
*   `getCampaign()`: Returns the campaign to which this audience belongs.
*   `getEntityType()`: Returns the type of the entity.
*   `getId()`: Returns the ID of the audience.
*   `getResourceName()`: Returns the resource name of the audience.
*   `getStatsFor(dateRange)`: Returns the stats for the audience.
*   `isEnabled()`: Returns `true` if the audience is enabled.
*   `isPaused()`: Returns `true` if the audience is paused.
*   `isRemoved()`: Returns `true` if the audience is removed.
*   `remove()`: Removes the audience.

## Properties/Selectors

*   **Ad Group:** `audience.getAdGroup()`
*   **Campaign:** `audience.getCampaign()`

## Code Examples

### Get Audience ID

```javascript
function main() {
  var audience = AdsApp.audiences().get().next();
  Logger.log(audience.getAudienceId());
}
```

### Get Ad Group for an Audience

```javascript
function main() {
  var audience = AdsApp.audiences().withCondition("AudienceId = 'Your Audience ID'").get().next();
  var adGroup = audience.getAdGroup();
  Logger.log(adGroup.getName());
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_audience](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_audience)

## Best Practices & Pitfalls

*   Audiences can be used for targeting and remarketing.
*   You can create audiences based on website visitors, app users, customer lists, and more.
*   Be mindful of the size of your audiences, as very small audiences may not be effective.
