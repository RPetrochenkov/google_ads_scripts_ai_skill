# Budget

The `AdsApp.Budget` object represents a campaign budget. A budget may be used by
a single campaign or shared across several campaigns.

## Methods

*   `getAmount()`: Returns the daily budget amount, in the currency of the account.
*   `setAmount(amount)`: Sets the daily budget amount.
*   `getTotalAmount()` / `setTotalAmount(amount)`: Gets/sets the total budget amount (for budgets that use a total rather than a daily amount).
*   `getName()`: Returns the name of the budget.
*   `getId()`: Returns the ID of the budget.
*   `isExplicitlyShared()`: Returns `true` if the budget was created to be shared across campaigns.
*   `campaigns()`: Returns a selector for the campaigns that share this budget.
*   `getDeliveryMethod()` / `setDeliveryMethod(method)`: Gets/sets delivery method (`STANDARD` or `ACCELERATED`).
*   `getStatsFor(dateRange)`: Returns the stats for the budget.
*   `getResourceName()`: Returns the resource name of the budget.

## Getting a Budget

You usually reach a budget from its campaign, or select budgets directly.

```javascript
function main() {
  // From a campaign:
  var campaign = AdsApp.campaigns().get().next();
  var budget = campaign.getBudget();
  Logger.log(campaign.getName() + " budget: " + budget.getAmount());

  // Directly, with GAQL field names (resource: campaign_budget):
  var sharedBudgets = AdsApp.budgets()
    .withCondition("campaign_budget.explicitly_shared = true")
    .get();
  while (sharedBudgets.hasNext()) {
    Logger.log(sharedBudgets.next().getName());
  }
}
```

## Code Example: Adjust a Campaign Budget

```javascript
function main() {
  var campaign = AdsApp.campaigns()
    .withCondition("campaign.name = 'Your Campaign Name'")
    .get()
    .next();

  var budget = campaign.getBudget();
  var current = budget.getAmount();
  budget.setAmount(current * 1.10); // increase by 10%
  Logger.log("Budget raised from " + current + " to " + budget.getAmount());
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_budget](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_budget)

## Best Practices & Pitfalls

*   **Shared budgets affect every linked campaign:** Before changing a shared budget, check `isExplicitlyShared()` and `campaigns()` so you understand the blast radius.
*   **Amounts are in account currency:** `getAmount()`/`setAmount()` use the account currency (not micros), unlike GAQL's `campaign_budget.amount_micros`.
*   **Guard your changes:** Cap or sanity-check computed budgets so a bad calculation can't set an extreme value.
