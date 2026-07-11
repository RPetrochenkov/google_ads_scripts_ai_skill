# Builders

Builders are used to create new Google Ads entities. For any entity that can be created via scripts, you use a builder pattern.

This involves getting a builder object from a parent entity (e.g., `adGroup.newKeywordBuilder()`), setting the various properties of the new entity (like its CPC bid or final URL), and then calling the `build()` method.

The `build()` method returns an operation object, which allows you to check if the creation was successful and to retrieve the newly created entity.

## Example

```javascript
function main() {
  var adGroup = AdsApp.adGroups().get().next();

  var keywordBuilder = adGroup.newKeywordBuilder();
  var keywordOperation = keywordBuilder
    .withText('my new keyword')
    .withCpc(1.23)
    .build();

  if (keywordOperation.isSuccessful()) {
    var keyword = keywordOperation.getResult();
    Logger.log("Created keyword with ID: " + keyword.getId());
  } else {
    Logger.log("Error creating keyword: " + keywordOperation.getErrors());
  }
}
```

## Official Documentation

[https://developers.google.com/google-ads/scripts/docs/concepts/builders](https://developers.google.com/google-ads/scripts/docs/concepts/builders)
