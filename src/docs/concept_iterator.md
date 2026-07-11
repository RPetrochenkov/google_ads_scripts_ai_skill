# Iterators

Iterators provide a way to loop through a collection of Google Ads entities, such as all the campaigns in an account. They are particularly useful when the number of entities is large or unknown, as they fetch entities one by one instead of loading them all into memory at once.

An iterator has two primary methods:

*   `hasNext()`: Checks if there are more entities in the collection.
*   `next()`: Retrieves the next entity.

To get an iterator, you first need to construct a selector.

## Example

```javascript
function main() {
  var campaignSelector = AdsApp.campaigns().withCondition("Status = ENABLED");
  var campaignIterator = campaignSelector.get();

  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    Logger.log(campaign.getName());
  }
}
```

## Official Documentation

[https://developers.google.com/google-ads/scripts/docs/concepts/iterators](https://developers.google.com/google-ads/scripts/docs/concepts/iterators)
