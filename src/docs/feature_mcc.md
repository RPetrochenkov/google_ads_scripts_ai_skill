# MCC-level Scripts

Manager account (MCC) scripts allow you to manage multiple Google Ads accounts from a single script. This is a powerful feature for agencies and large advertisers who need to automate tasks across many accounts.

## The `AdsManagerApp` Class

The core of MCC-level scripting is the `AdsManagerApp` class. This class allows you to select and manage the accounts under your manager account.

## Selecting Accounts

You can select accounts using the `accounts()` method of the `AdsManagerApp` object. This returns a selector that you can use to filter and iterate through the accounts.

### Example: Logging the names of all accounts

```javascript
function main() {
  var accountSelector = AdsManagerApp.accounts();
  var accountIterator = accountSelector.get();

  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    Logger.log(account.getName());
  }
}
```

## Executing in Parallel

For efficiency, you can execute your script on multiple accounts in parallel. You do this by calling the `executeInParallel()` method on the account selector.

### Example: Logging the names of all accounts in parallel

```javascript
function main() {
  var accountSelector = AdsManagerApp.accounts();

  accountSelector.executeInParallel('processAccount');
}

function processAccount() {
  var account = AdsApp.currentAccount();
  Logger.log(account.getName());
}
```

## Official Link

[https://developers.google.com/google-ads/scripts/docs/features/manager-accounts](https://developers.google.com/google-ads/scripts/docs/features/manager-accounts)

## Best Practices & Pitfalls

*   **Use `withCondition`:** When working with a large number of accounts, use `withCondition` to filter the accounts you want to process.
*   **Test with a single account:** Before running a script on all your accounts, test it on a single account to ensure it works as expected.
*   **Be mindful of execution time:** MCC scripts have a 60-minute execution time limit. For long-running scripts, consider breaking them down into smaller pieces.
*   **Use `executeInParallel` for performance:** When processing a large number of accounts, use `executeInParallel` to improve performance.
