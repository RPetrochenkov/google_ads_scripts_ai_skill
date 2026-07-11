
/**
 * @fileoverview This script analyzes campaign performance over the last 7 days,
 * identifies campaigns that are significantly overperforming or underperforming
 * compared to the account average, and exports the results to a Google Sheet.
 * This script is read-only and does not make any changes to the account.
 */

// --- Configuration ---

// The full URL of the Google Sheet for the report.
const SPREADSHEET_URL = 'YOUR_SPREADSHEET_URL'; // IMPORTANT: Replace with your actual Google Sheet URL

// The name of the sheet within the spreadsheet where the report will be written.
const SHEET_NAME = 'Campaign Performance Analysis';

// The percentage deviation from the average ROAS to be considered an outlier.
// For example, 20 means campaigns with ROAS 20% above or below average will be flagged.
const DEVIATION_THRESHOLD = 20;

// The date range for the performance analysis.
const DATE_RANGE = 'LAST_7_DAYS';

/**
 * The main function that runs the script.
 */
function main() {
  console.log('=== Starting Campaign Performance Analysis ===');
  const accountName = AdsApp.currentAccount().getName();
  console.log(`Processing account: ${accountName}`);

  const campaignData = getCampaignPerformanceData();

  if (campaignData.length === 0) {
    console.log('No campaigns with cost found in the last 7 days. Exiting.');
    return;
  }

  const analysisResult = analyzeCampaignPerformance(campaignData);
  exportToSheet(analysisResult.analyzedData, analysisResult.averageRoas, accountName);

  console.log('=== Script Completed Successfully ===');
}

/**
 * Fetches campaign performance data (Cost and Conversion Value) for the last 7 days.
 * @return {Array<Object>} An array of objects, each representing a campaign's performance.
 */
function getCampaignPerformanceData() {
  console.log('Fetching campaign performance data...');
  const campaignPerformance = [];
  try {
    const query = `
      SELECT
        campaign.name,
        metrics.cost_micros,
        metrics.conversions_value
      FROM campaign
      WHERE
        segments.date DURING ${DATE_RANGE}
        AND campaign.status = 'ENABLED'
        AND metrics.cost_micros > 0
    `;

    const report = AdsApp.report(query);
    const rows = report.rows();

    while (rows.hasNext()) {
      const row = rows.next();
      const cost = row['metrics.cost_micros'] / 1000000;
      const convValue = row['metrics.conversions_value'];
      const roas = cost > 0 ? (convValue / cost) : 0;

      campaignPerformance.push({
        name: row['campaign.name'],
        cost: cost,
        convValue: convValue,
        roas: roas,
      });
    }
    console.log(`Found data for ${campaignPerformance.length} campaigns.`);
  } catch (e) {
    console.error(`Error fetching campaign performance data: ${e.toString()}`);
  }
  return campaignPerformance;
}

/**
 * Analyzes the performance of campaigns to find the average ROAS and identify outliers.
 * @param {Array<Object>} campaignData The performance data for all campaigns.
 * @return {{analyzedData: Array<Object>, averageRoas: number}} An object containing the
 *     analyzed data with status and the calculated average ROAS.
 */
function analyzeCampaignPerformance(campaignData) {
  console.log('Analyzing campaign performance...');
  let totalCost = 0;
  let totalConvValue = 0;

  campaignData.forEach(campaign => {
    totalCost += campaign.cost;
    totalConvValue += campaign.convValue;
  });

  const averageRoas = totalCost > 0 ? (totalConvValue / totalCost) : 0;
  console.log(`Average Account ROAS: ${averageRoas.toFixed(2)}`);

  const upperThreshold = averageRoas * (1 + DEVIATION_THRESHOLD / 100);
  const lowerThreshold = averageRoas * (1 - DEVIATION_THRESHOLD / 100);

  const analyzedData = campaignData.map(campaign => {
    let status = 'Average';
    if (campaign.roas > upperThreshold) {
      status = 'Overperforming';
    } else if (campaign.roas < lowerThreshold) {
      status = 'Underperforming';
    }
    return {...campaign, status: status};
  });

  return { analyzedData, averageRoas };
}

/**
 * Exports the analyzed performance data to a Google Sheet.
 * @param {Array<Object>} data The data to export.
 * @param {number} averageRoas The average ROAS for the account.
 * @param {string} accountName The name of the Google Ads account.
 */
function exportToSheet(data, averageRoas, accountName) {
  console.log('Exporting results to Google Sheet...');
  if (SPREADSHEET_URL === 'YOUR_SPREADSHEET_URL') {
    console.log('Spreadsheet URL is not set. Please update the SPREADSHEET_URL variable.');
    return;
  }
  
  try {
    const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    sheet.clear();

    const headers = ['Campaign Name', 'ROAS', 'Cost', 'Status'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight('bold').setBackground('#4285f4').setFontColor('white');

    const rows = data.map(row => [
      row.name,
      row.roas,
      row.cost,
      row.status
    ]);

    if (rows.length > 0) {
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      
      // Formatting
      sheet.getRange(2, 2, rows.length, 1).setNumberFormat('0.00'); // ROAS
      sheet.getRange(2, 3, rows.length, 1).setNumberFormat('£#,##0.00'); // Cost
      
      // Conditional formatting
      const statusRange = sheet.getRange(2, 4, rows.length, 1);
      const ruleOver = SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Overperforming')
        .setBackground('#D4EDDA') // Light green
        .setRanges([statusRange])
        .build();
      const ruleUnder = SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo('Underperforming')
        .setBackground('#F8D7DA') // Light red
        .setRanges([statusRange])
        .build();
      const rules = sheet.getConditionalFormatRules();
      rules.push(ruleOver, ruleUnder);
      sheet.setConditionalFormatRules(rules);
    }
    
    // Add summary and timestamp
    const summaryStartRow = sheet.getLastRow() + 2;
    sheet.getRange(summaryStartRow, 1).setValue('Summary').setFontWeight('bold');
    sheet.getRange(summaryStartRow + 1, 1).setValue('Average Account ROAS:');
    sheet.getRange(summaryStartRow + 1, 2).setValue(averageRoas).setNumberFormat('0.00');
    sheet.getRange(summaryStartRow + 2, 1).setValue('Last Updated:');
    sheet.getRange(summaryStartRow + 2, 2).setValue(new Date());

    sheet.autoResizeColumns(1, headers.length);

    console.log(`Successfully exported data to sheet: ${SHEET_NAME}`);
    console.log(`Sheet URL: ${spreadsheet.getUrl()}`);

  } catch (e) {
    console.error(`Error exporting to Google Sheets: ${e.toString()}`);
    console.log('Please ensure the SPREADSHEET_URL is correct and you have edit permissions.');
  }
}
