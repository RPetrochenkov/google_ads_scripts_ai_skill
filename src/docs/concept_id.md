# IDs

Most entities in Google Ads have an ID that can be retrieved using the `getId()` method. These IDs are useful for linking entities to external data, such as in reports or databases, and can lead to better performance when used for fetching.

## Uniqueness

*   **Campaign and Ad Group IDs:** Unique across your account.
*   **Ad and Keyword IDs:** Composite IDs, meaning their ID is only unique within their parent Ad Group. To select a specific ad or keyword by its ID, you must provide both the Ad Group ID and the ad or keyword ID.

## Example

```javascript
function main() {
  var campaign = AdsApp.campaigns().get().next();
  Logger.log("Campaign ID: " + campaign.getId());

  var adGroup = campaign.adGroups().get().next();
  Logger.log("Ad Group ID: " + adGroup.getId());

  var ad = adGroup.ads().get().next();
  Logger.log("Ad ID: " + ad.getId());
}
```

## Official Documentation

[https://developers.google.com/google-ads/scripts/docs/concepts/ids](https://developers.google.com/google-ads/scripts/docs/concepts/ids)
