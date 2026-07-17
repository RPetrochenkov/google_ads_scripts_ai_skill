# Bidding

There are two distinct things called "bidding" in scripts:

1.  **Setting a strategy on an entity** via `entity.bidding()` — e.g. `campaign.bidding()`. This is how you change how a campaign bids. Support for setting campaign bid strategies (including strategies that take a parameter like target ROAS or target impression share) was added with the new scripts experience.
2.  **The `AdsApp.BiddingStrategy` object** — represents a *flexible, account-level (shared)* bidding strategy that can be applied across multiple campaigns and reported on.

## Setting a Bidding Strategy on a Campaign

Use `campaign.bidding().setStrategy(strategy)`. Strategies that need an extra
parameter are configured with `argsBuilder()`.

```javascript
function main() {
  var campaign = AdsApp.campaigns()
    .withCondition("campaign.name = 'Test Campaign'")
    .get()
    .next();

  // Simple (anonymous) strategy — no extra parameter.
  campaign.bidding().setStrategy('TARGET_SPEND');

  // Strategy with a parameter, e.g. target ROAS of 5 (500%).
  var bidding = campaign.bidding();
  bidding.setStrategy('MAXIMIZE_CONVERSION_VALUE',
      bidding.argsBuilder().withTargetRoas(5));
}
```

### Common Strategy Values

*   `MANUAL_CPC` — manual cost-per-click.
*   `MANUAL_CPM` — manual cost-per-thousand-impressions.
*   `TARGET_SPEND` — automatically maximize clicks within budget.
*   `MAXIMIZE_CONVERSIONS` — maximize number of conversions.
*   `MAXIMIZE_CONVERSION_VALUE` — maximize total conversion value (pairs with `withTargetRoas()`).
*   `TARGET_IMPRESSION_SHARE` — target a position/impression share (configured via `argsBuilder()`).

Reference: [Bidding](https://developers.google.com/google-ads/scripts/docs/campaigns/bidding)

## The `AdsApp.BiddingStrategy` Object (Shared Strategies)

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
  var biddingStrategy = AdsApp.biddingStrategies().withCondition("bidding_strategy.name = 'Your Bidding Strategy Name'").get().next();
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
