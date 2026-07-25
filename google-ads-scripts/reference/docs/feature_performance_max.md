# Performance Max Campaigns

Managing Performance Max (PMax) campaigns with Google Ads Scripts differs from standard campaigns because there is no direct `AdsApp.PerformanceMaxCampaign` object. Instead, management and reporting are primarily done through `AdsApp.report()` and more advanced `mutate` operations that interact directly with the Google Ads API.

## Key Concepts

*   **Reporting:** The primary way to get insights into PMax campaign performance is by using GAQL (Google Ads Query Language) queries with `AdsApp.report()`.
*   **Advanced Operations:** For actions like creating or modifying PMax campaigns, you need to use the `AdsApp.mutate()` method, which is a more complex approach requiring knowledge of the Google Ads API structure.

## Reporting Example

Here is an example of how to get a performance report for your PMax campaigns, segmented by network (Search, Shopping, Display, etc.).

```javascript
function pmaxNetworkPerformanceReport() {
  const SPREADSHEET_URL = 'YOUR_SPREADSHEET_URL'; // Replace with your Google Sheet URL
  const sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('PMax Network Performance');

  sheet.clear();
  sheet.appendRow(['Campaign', 'Network', 'Impressions', 'Clicks', 'Cost', 'Conversions']);

  const query = `
    SELECT
      campaign.name,
      segments.ad_network_type,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE
      campaign.advertising_channel_type = 'PERFORMANCE_MAX'
      AND segments.date DURING LAST_30_DAYS
  `;

  const report = AdsApp.report(query);
  const rows = report.rows();

  while (rows.hasNext()) {
    const row = rows.next();
    sheet.appendRow([
      row['campaign.name'],
      row['segments.ad_network_type'],
      row['metrics.impressions'],
      row['metrics.clicks'],
      (row['metrics.cost_micros'] / 1000000).toFixed(2),
      row['metrics.conversions']
    ]);
  }
}
```

## Official Links & Resources

*   **Google Ads Query Language (GAQL):** [https://developers.google.com/google-ads/api/docs/query/overview](https://developers.google.com/google-ads/api/docs/query/overview)
*   **AdsApp.report():** [https://developers.google.com/google-ads/scripts/docs/features/reports](https://developers.google.com/google-ads/scripts/docs/features/reports)
*   **Advanced `mutate` Operations:** [https://developers.google.com/google-ads/scripts/docs/features/mutates](https://developers.google.com/google-ads/scripts/docs/features/mutates)

## Best Practices & Pitfalls

*   **Start with Reporting:** Before making any changes, use reporting to understand how your PMax campaigns are performing.
*   **Test with `preview()`:** Always use the `preview()` method to test your scripts before running them to avoid unintended changes to your campaigns.
*   **Understand GAQL:** A good understanding of GAQL is essential for effective PMax reporting.
*   **`mutate` is for Advanced Users:** Be cautious when using `mutate` operations, as they can have a significant impact on your campaigns. It's recommended to have a strong understanding of the Google Ads API before using them.
