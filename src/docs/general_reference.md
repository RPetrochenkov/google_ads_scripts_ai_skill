# Google Ads Scripts Reference

This document provides a high-level overview of the most common objects available in the `AdsApp` class. For more detailed information, please refer to the official documentation linked for each object.

## Core Objects

*   **`AdsApp`**: The top-level object used to access all other objects and services.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp)

## Account-Level Objects

*   **`Account`**: Represents a Google Ads account.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_account)
*   **`BiddingStrategy`**: Represents a bidding strategy.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_biddingstrategy)
*   **`Label`**: Represents a label.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_label)

## Campaign-Level Objects

*   **`Campaign`**: Represents a campaign.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_campaign)
*   **`AdGroup`**: Represents an ad group.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_adgroup)
*   **`Ad`**: Represents an ad.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_ad)
*   **`Keyword`**: Represents a keyword.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_keyword)
*   **`Audience`**: Represents an audience.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_audience)

## Reporting

*   **`Report`**: Represents a report.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/features/reports)
*   **`SearchResult`**: Represents the result of a search query.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_searchresult)

## Other

*   **`ExecutionInfo`**: Provides information about the current script execution.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/reference/adsapp/adsapp_executioninfo)
*   **`BulkUploads`**: Provides access to the bulk upload functionality.
    *   [Official Documentation](https://developers.google.com/google-ads/scripts/docs/features/bulk-upload)

## Recent Changes & Notable Guides

*   **New Scripts Experience / Migration** (GAQL field names, ES6 support): [Migration guide](https://developers.google.com/google-ads/scripts/docs/migration)
*   **Setting Campaign Bid Strategies**: [Bidding](https://developers.google.com/google-ads/scripts/docs/campaigns/bidding)
*   **Merchant API in scripts** (available from April 22, 2026; replaces the Content API for Shopping, which sunsets August 18, 2026): see the [Google Ads Developer Blog](https://ads-developers.googleblog.com/search/label/google_ads_scripts) for the announcement.
