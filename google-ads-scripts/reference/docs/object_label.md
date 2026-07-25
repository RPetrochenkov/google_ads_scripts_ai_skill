# Labels

The `AdsApp.Label` object represents a label that can be applied to campaigns, ad groups, ads, and keywords to organize them.

## Methods

*   `adGroups()`: Returns a selector for the ad groups to which this label is applied.
*   `ads()`: Returns a selector for the ads to which this label is applied.
*   `campaigns()`: Returns a selector for the campaigns to which this label is applied.
*   `getColor()`: Returns the color of the label.
*   `getDescription()`: Returns the description of the label.
*   `getEntityType()`: Returns the type of the entity.
*   `getId()`: Returns the ID of the label.
*   `getName()`: Returns the name of the label.
*   `getResourceName()`: Returns the resource name of the label.
*   `keywords()`: Returns a selector for the keywords to which this label is applied.
*   `remove()`: Removes the label.
*   `setColor(color)`: Sets the color of the label.
*   `setDescription(description)`: Sets the description of the label.
*   `setName(name)`: Sets the name of the label.

## Properties/Selectors

*   **Ad Groups:** `label.adGroups()`
*   **Ads:** `label.ads()`
*   **Campaigns:** `label.campaigns()`
*   **Keywords:** `label.keywords()`

## Code Examples

### Get Label Name

```javascript
function main() {
  var label = AdsApp.labels().get().next();
  Logger.log(label.getName());
}
```

### Get Campaigns with a specific Label

```javascript
function main() {
  var label = AdsApp.labels().withCondition("label.name = 'Your Label Name'").get().next();
  var campaigns = label.campaigns().get();
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    Logger.log(campaign.getName());
  }
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_label](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_label)

## Best Practices & Pitfalls

*   Labels are a great way to organize your account.
*   You can create up to 100,000 labels per account.
*   Labels can be applied to campaigns, ad groups, ads, and keywords.
