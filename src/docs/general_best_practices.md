# Google Ads Scripts Best Practices

This document summarizes the most important best practices to follow when writing Google Ads Scripts. Adhering to these guidelines will help you write scripts that are more efficient, reliable, and easier to maintain.

## 1. Selecting Entities

*   **Be Specific:** Use specific filters in your selectors to avoid fetching unnecessary data. For example, instead of fetching all campaigns and then filtering them in your script, use `withCondition()` to filter at the API level.
*   **Avoid Traversing the Hierarchy:** Avoid traversing the full campaign hierarchy (e.g., iterating through all campaigns to get to all ad groups to get to all keywords). Instead, use the appropriate selector for the entity you need (e.g., `AdsApp.keywords()`).
*   **Filter by ID:** Whenever possible, use `withIds()` to fetch specific entities. This is the most efficient way to select entities.

## 2. Updating Entities

*   **Batch Your Changes:** When updating multiple entities, it is more efficient to batch the operations together. For example, instead of calling `keyword.setFinalUrl()` in a loop, create a list of keywords and their new URLs and update them in a single request.
*   **Use Builders for New Entities:** When creating new entities, use the builder pattern. This is more efficient than creating entities one by one.
*   **Use Bulk Uploads for Large Changes:** For very large updates (e.g., thousands of keywords), use the bulk upload feature. This is the most efficient way to make large-scale changes to your account.

## 3. Reporting

*   **Use `AdsApp.search()`:** For fetching performance data, `AdsApp.search()` with GAQL is generally more efficient than `AdsApp.report()`.
*   **Be Specific in Your Queries:** In your GAQL queries, only select the fields you need. This will reduce the amount of data that needs to be processed.

## 4. Manager Accounts (MCC)

*   **Use `executeInParallel()`:** When running scripts on multiple accounts from a manager account, use `executeInParallel()` to process the accounts in parallel. This can significantly reduce the execution time of your scripts.

## 5. Google Sheets

*   **Batch Spreadsheet Updates:** When writing data to a Google Sheet, it is much more efficient to write the data in a single batch rather than one cell at a time. Create a two-dimensional array of your data and write it to the sheet in a single `getRange().setValues()` call.
