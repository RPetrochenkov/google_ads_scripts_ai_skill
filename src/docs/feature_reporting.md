# Reporting

Google Ads Scripts provide two main ways to fetch performance data: `AdsApp.report()` and `AdsApp.search()`. Both methods use the Google Ads Query Language (GAQL) to specify the data you want to retrieve.

## `AdsApp.report()`

This method returns a flat, table-like representation of your data, making it ideal for exporting to spreadsheets or for simple data analysis.

### Example

```javascript
function main() {
  var report = AdsApp.report(
    'SELECT campaign.name, metrics.clicks, metrics.impressions ' +
    'FROM campaign ' +
    'WHERE segments.date DURING LAST_30_DAYS');

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    Logger.log(row['campaign.name'] + ': ' + row['metrics.clicks'] + ' clicks, ' + row['metrics.impressions'] + ' impressions');
  }
}
```

## `AdsApp.search()`

This method returns a list of `GoogleAdsRow` objects, which is more flexible for programmatic access to the data. Each `GoogleAdsRow` object has methods to access the different fields of the result.

### Example

```javascript
function main() {
  var search = AdsApp.search(
    'SELECT campaign.name, metrics.clicks, metrics.impressions ' +
    'FROM campaign ' +
    'WHERE segments.date DURING LAST_30_DAYS');

  while (search.hasNext()) {
    var row = search.next();
    Logger.log(row.campaign.name + ': ' + row.metrics.clicks + ' clicks, ' + row.metrics.impressions + ' impressions');
  }
}
```

## Exporting Reports to Google Sheets

A common use case for Google Ads Scripts is to export report data to a Google Sheet for further analysis or visualization. This involves fetching the report, connecting to a Google Sheet, and writing the data to a sheet.

### Example: Exporting Campaign Performance to a Google Sheet

This script will:
1.  Connect to a Google Sheet using its URL.
2.  Clear all data from a specified sheet.
3.  Run a campaign performance report for the last 7 days.
4.  Write the report headers to the sheet.
5.  Fetch the report rows and write them to the sheet.

```javascript
// The main function where the script execution begins.
function main() {
  // 1. Set up the Spreadsheet
  // Replace this with the URL of your Google Sheet.
  var SPREADSHEET_URL = "YOUR_GOOGLE_SHEET_URL";
  var SHEET_NAME = "ReportOutput";

  // Open the spreadsheet by its URL.
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  // Get the specific sheet by name.
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  // If the sheet doesn't exist, create it.
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  // 2. Clear any old data from the sheet.
  sheet.clear();
  Logger.log("Sheet cleared.");

  // 3. Define and run the report.
  // This GAQL query retrieves campaign performance data.
  var query = "SELECT campaign.name, metrics.clicks, metrics.impressions, metrics.cost " +
              "FROM campaign " +
              "WHERE segments.date DURING LAST_7_DAYS " +
              "ORDER BY metrics.impressions DESC";

  var report = AdsApp.report(query);
  Logger.log("Report query executed.");

  // 4. Write the headers to the sheet.
  var headers = ["Campaign", "Clicks", "Impressions", "Cost"];
  sheet.appendRow(headers);
  Logger.log("Headers written to sheet.");

  // 5. Iterate through the report rows and write them to the sheet.
  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    var campaignName = row["campaign.name"];
    var clicks = row["metrics.clicks"];
    var impressions = row["metrics.impressions"];
    // The cost is in micro-currency (e.g., micro-dollars), so divide by 1,000,000.
    var cost = parseFloat(row["metrics.cost"]) / 1000000;

    sheet.appendRow([campaignName, clicks, impressions, cost]);
  }

  Logger.log("Report data has been successfully exported to " + spreadsheet.getUrl());
}
```

### How to Use the Script

**Step 1: Create a Google Sheet**
1.  Go to [sheets.google.com](https://sheets.google.com) and create a new, blank spreadsheet.
2.  Copy the URL of this spreadsheet from your browser's address bar.

**Step 2: Create a New Google Ads Script**
1.  Log in to your Google Ads account.
2.  Go to **Tools and settings** > **BULK ACTIONS** > **Scripts**.
3.  Click the blue **`+`** icon to create a new script.
4.  Give your script a name (e.g., "Campaign Performance Exporter").

**Step 3: Add and Configure the Code**
1.  Delete any default code in the script editor.
2.  Copy and paste the entire script provided above into the editor.
3.  Replace `"YOUR_GOOGLE_SHEET_URL"` with the actual URL of the Google Sheet you created in Step 1.

**Step 4: Authorize and Run the Script**
1.  Click the **Authorize** button. You will be prompted to grant the script permission to access your Google Ads data and your Google Sheets. You only need to do this once per script.
2.  Click **Preview** to run the script without making any live changes. Check the **Logs** to see the script's output and ensure there are no errors.
3.  Once you are confident the script is working, click **Run**.

After the script finishes, open your Google Sheet. You will see the sheet named "ReportOutput" populated with your campaign performance data.

## Advanced Google Sheets Exporting

The following example, based on the `budget_recommendation.js` script, demonstrates a more robust and feature-rich way to export data to Google Sheets. It includes dynamic sheet naming, advanced formatting, and error handling.

### Key Features of this Approach

*   **Dynamic Sheet Naming:** Creates a new sheet with a dynamic name (e.g., `AccountName BR`) or clears an existing one.
*   **Advanced Formatting:** Applies bolding, background colors, and number formatting to make the sheet more readable.
*   **Conditional Formatting:** Highlights rows based on specific criteria (e.g., missing data).
*   **Timestamping:** Adds a timestamp to the sheet to indicate when it was last updated.
*   **Error Handling:** Uses a `try...catch` block to gracefully handle errors during the export process.

### Advanced Export Example

```javascript
// This is an example of a more advanced function for exporting data to Google Sheets.
// It is based on the exportToSheets function in the budget_recommendation.js script.
function exportToSheets(results, accountName) {
  try {
    // Open the Google Sheet by ID
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    // Create dynamic sheet name: [ACCOUNT] BR
    const sheetName = `${accountName} BR`;
    console.log(`Creating/updating sheet: "${sheetName}"`);

    // Get or create the dynamic sheet
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      console.log(`Created new sheet: "${sheetName}"`);
    } else {
      console.log(`Found existing sheet: "${sheetName}"`);
    }

    // Clear existing data
    sheet.clear();

    // Set headers
    const headers = ['Account', 'Campaign', 'Shared Budget', 'Current Budget', 'Recommended Budget', 'Difference %', 'Notes'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format headers
    sheet.getRange(1, 1, 1, headers.length)
          .setFontWeight('bold')
          .setBackground('#4CAF50')
          .setFontColor('white');

    // Prepare data rows
    const dataRows = results.map(result => [
      result.accountName,
      result.campaignName,
      result.sharedBudgetName,
      result.currentBudget.toFixed(2),
      result.recommendedBudget.toFixed(2),
      result.differencePercent.toFixed(1) + '%',
      result.isRecommendedBudgetNull ? 'No recommendation available' : ''
    ]);

    // Write data to sheet
    if (dataRows.length > 0) {
      sheet.getRange(2, 1, dataRows.length, headers.length).setValues(dataRows);

      // Format currency columns
      sheet.getRange(2, 4, dataRows.length, 2).setNumberFormat('[$£-809] #,##0.00');

      // Highlight rows with null recommended budgets
      const nullRows = [];
      results.forEach((result, index) => {
        if (result.isRecommendedBudgetNull) {
          nullRows.push(index + 2); // +2 because row 1 is headers and arrays are 0-indexed
        }
      });

      // Apply light yellow background to rows with null recommendations
      nullRows.forEach(rowIndex => {
        sheet.getRange(rowIndex, 1, 1, headers.length).setBackground('#FFF9C4');
      });

      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);

      // Add timestamp and summary
      const summaryStartRow = dataRows.length + 3;
      sheet.getRange(summaryStartRow, 1).setValue(`Last updated: ${new Date()}`);
    }

    console.log(`Successfully exported ${results.length} campaigns to Google Sheets`);
    console.log(`Sheet URL: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error) {
    console.log(`Error exporting to Google Sheets: ${error.message}`);
    console.log('Make sure the script has permission to access Google Sheets');
  }
}
```

## Key Differences

| Feature | `AdsApp.report()` | `AdsApp.search()` |
|---|---|---|
| **Return Type** | `Report` (flat rows) | `SearchResult` (`GoogleAdsRow` objects) |
| **Data Access** | `row['field.name']` | `row.field.name` |
| **Use Case** | Exporting to spreadsheets, simple analysis | Programmatic data processing |

## Official Link

[https://developers.google.com/google-ads/scripts/docs/features/reports](https://developers.google.com/google-ads/scripts/docs/features/reports)

## Best Practices & Pitfalls

*   **Use `WHERE` clauses:** Always use `WHERE` clauses in your GAQL queries to limit the amount of data you retrieve.
*   **Be specific with your columns:** Only select the columns you need to improve performance.
*   **Understand GAQL:** A good understanding of GAQL is essential for effective reporting.
*   **Use `preview()`:** Always use `preview()` to test your reporting scripts before running them.
