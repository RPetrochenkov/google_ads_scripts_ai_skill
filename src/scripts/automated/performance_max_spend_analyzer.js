// Google Ads Script to find Performance Max campaigns with a significant spend decrease.

// The URL of the Google Sheet to export the data to.
// A new sheet will be created if the name doesn't exist.
const SPREADSHEET_URL = 'YOUR_SPREADSHEET_URL'; // TODO: Replace with your Google Sheet URL
const SHEET_NAME = 'PMax Spend Decline';
const DECLINE_THRESHOLD = 0.20; // 20%

function main() {
  const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  sheet.clear();
  sheet.appendRow(['Campaign Name', 'Cost Last 28 Days', 'Cost Last 7 Days', 'Decline']);

  const report28days = AdsApp.report(
    `SELECT campaign.name, metrics.cost_micros
     FROM campaign
     WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
     AND segments.date DURING LAST_28_DAYS`
  );

  const report7days = AdsApp.report(
    `SELECT campaign.name, metrics.cost_micros
     FROM campaign
     WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
     AND segments.date DURING LAST_7_DAYS`
  );

  const cost28days = {};
  for (const row of report28days.rows()) {
    cost28days[row['campaign.name']] = row['metrics.cost_micros'] / 1000000;
  }

  const cost7days = {};
  for (const row of report7days.rows()) {
    cost7days[row['campaign.name']] = row['metrics.cost_micros'] / 1000000;
  }

  for (const campaignName in cost28days) {
    const cost28 = cost28days[campaignName] || 0;
    const cost7 = cost7days[campaignName] || 0;

    if (cost28 > 0 && cost7 > 0) {
      const cost21prior = cost28 - cost7;
      const avgWeeklyCostPrior = cost21prior / 3;
      
      if (avgWeeklyCostPrior > 0) {
        const decline = (avgWeeklyCostPrior - cost7) / avgWeeklyCostPrior;

        if (decline >= DECLINE_THRESHOLD) {
          sheet.appendRow([
            campaignName,
            cost28,
            cost7,
            decline
          ]);
        }
      }
    }
  }
  Logger.log(`Script finished. Results are in the sheet: ${SPREADSHEET_URL}`);
}
