# Bulk Operations

Google Ads Scripts support bulk operations through CSV uploads. This allows you to make changes to multiple entities in your account at once.

## Creating a Bulk Upload Job

You can create a bulk upload job from a CSV file from Google Drive, a Google Sheet, a Microsoft Excel file, or by creating the data programmatically.

### Example: Uploading a CSV file from Google Drive

```javascript
function main() {
  var file = DriveApp.getFilesByName('your_bulk_upload.csv').next();
  var job = AdsApp.bulkUploads().newFileUpload(file);
  job.forCampaignManagement(); // Or forOfflineConversions()
  job.preview(); // Or apply()
}
```

## Supported Formats

*   CSV
*   TSV
*   Google Sheets
*   Microsoft Excel

## Options

You can set several options for your bulk upload job:

*   `setFileName(fileName)`: Sets the name of the file being uploaded.
*   `setMoneyInMicros(moneyInMicros)`: Sets the monetary unit for the upload. `true` for micros, `false` for the currency of the account.
*   `setFileLocale(fileLocale)`: Sets the locale of the file.
*   `setTimeZone(timeZone)`: Sets the time zone of the file.

## Official Link

[https://developers.google.com/google-ads/scripts/docs/features/bulk-upload](https://developers.google.com/google-ads/scripts/docs/features/bulk-upload)

## Best Practices & Pitfalls

*   **Use `preview()`:** Always use `preview()` to test your bulk uploads before applying them to your account.
*   **Check the results:** After a bulk upload job has completed, check the results to ensure that all rows were processed successfully.
*   **Use templates:** Use the bulk upload templates from the Google Ads UI or help center to ensure your data is in the correct format.
