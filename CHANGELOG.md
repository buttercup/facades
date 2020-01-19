# Buttercup Facades Changelog

## v1.3.4
_2020-01-19_

 * **Bugfix**:
   * Moving group to root would throw

## v1.3.3
_2020-01-19_

 * **Bugfix**:
   * Groups not added from facade
   * Groups not deleted safely when removed from facade by parent

## v1.3.2
_2020-01-19_

 * Update entry property and attribute values only when they differ

## v1.3.1
_2020-01-19_

 * **Bugfix**:
   * Moving groups would throw an exception

## v1.3.0
_2020-01-19_

 * `hashVaultFacade` method for comparing facades
 * `isVaultFacade` method for checking if an object is a vault facade

## v1.2.0
_2020-01-16_

 * Entry property history

## v1.1.0
_2020-01-09_

 * Entry types and field value types collections exported

## v1.0.1
_2019-12-22_

 * **Bugfix**:
   * Creating new entries with non-default types would throw

## v1.0.0
_2019-07-14_

 * New Entry facade field structure
 * Entry facade field value types
 * Facade property `field` removed
 * Facade property `special` removed
 * Facade fields `multiline` and `secret` removed in favour of `valueType`

## v0.8.1
_2019-07-11_

 * No attribute needed for OTP URI detection

## v0.8.0
_2019-07-09_

 * `Special` property for OTP handling
 * `propertyType` to replace `field`
 * **Deprecation**: Facade field property `field` deprecated in favour of `propertyType`

## v0.7.0
_2019-02-18_

 * Added `id` property to field descriptors (UUID)
   * Added `uuid` dependency

## v0.6.0
_2019-02-18_

 * Set title to an empty string for custom fields

## v0.5.0
_2019-02-17_

 * Update all dependencies

## v0.4.1
_2019-02-16_

 * Specify Credit Card type formatting _options_ (for dropdowns)

## v0.4.0
_2019-02-16_

 * Possibility to override new entry facade type in `createEntryFacade`

## v0.3.0
_2019-02-11_

 * Add entry type symbols (exported)

## v0.2.0
_2018-10-14_

 * Improved archive facade handling
 * Exposed group facade creation and consumption methods

## v0.1.0

 * Initial release
