# Bidding

The `AdsApp.BiddingStrategy` object represents a flexible, account-level bidding strategy.

## Methods

*   `adGroups()`: Returns a selector for the ad groups that are using this bidding strategy.
*   `campaigns()`: Returns a selector for the campaigns that are using this bidding strategy.
*   `getEntityType()`: Returns the type of the entity.
*   `getId()`: Returns the ID of the bidding strategy.
*   `getName()`: Returns the name of the bidding strategy.
*   `getResourceName()`: Returns the resource name of the bidding strategy.
*   `getStatsFor(dateRange)`: Returns the stats for the bidding strategy.
*   `getType()`: Returns the type of the bidding strategy.
*   `keywords()`: Returns a selector for the keywords that are using this bidding strategy.
*   `shoppingAdGroups()`: Returns a selector for the shopping ad groups that are using this bidding strategy.
*   `shoppingCampaigns()`: Returns a selector for the shopping campaigns that are using this bidding strategy.

## Properties/Selectors

*   **Ad Groups:** `biddingStrategy.adGroups()`
*   **Campaigns:** `biddingStrategy.campaigns()`
*   **Keywords:** `biddingStrategy.keywords()`
*   **Shopping Ad Groups:** `biddingStrategy.shoppingAdGroups()`
*   **Shopping Campaigns:** `biddingStrategy.shoppingCampaigns()`

## Code Examples

### Get Bidding Strategy Name

```javascript
function main() {
  var biddingStrategy = AdsApp.biddingStrategies().get().next();
  Logger.log(biddingStrategy.getName());
}
```

### Get Campaigns using a Bidding Strategy

```javascript
function main() {
  var biddingStrategy = AdsApp.biddingStrategies().withCondition("Name = 'Your Bidding Strategy Name'").get().next();
  var campaigns = biddingStrategy.campaigns().get();
  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    Logger.log(campaign.getName());
  }
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_biddingstrategy](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_biddingstrategy)

## Best Practices & Pitfalls

*   Bidding strategies can be applied at the campaign, ad group, or keyword level.
*   When changing a bidding strategy, be aware of the impact it can have on your campaign performance.
*   Not all bidding strategies are available for all campaign types.
