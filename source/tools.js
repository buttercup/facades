const uuid = require("uuid/v4");
const { Entry } = require("buttercup");
const { isOTPURI } = require("./detection.js");
const {
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
} = require("./symbols.js");

/**
 * @typedef {Object} EntryFacadeFieldFormattingSegment
 * @property {RegExp=} char - A character to match with a regular expression
 * @property {Number=} repeat - Number of times to repeat the character match (required for `char`)
 * @property {String=} exactly - The exact character match (operates in opposition to `char`)
 */

/**
 * @typedef {Object} EntryFacadeFieldFormatting
 * @property {Array.<EntryFacadeFieldFormattingSegment>=} format - The segmented formatting of the value
 * @property {String=} placeholder - Optional placeholder for the input (ties in to `format`)
 * @property {Object|Array=} options - Options for a dropdown: either an array of option values or an object
 *  (key:value) of values and titles
 * @property {String=} defaultOption - The default option value if none set
 */

/**
 * Entry facade data field
 * @typedef {Object} EntryFacadeField
 * @property {String} id - A randomly generated ID (UUID) for identifying this field during editing
 * @property {String} title - The user-friendly title of the field
 * @property {String} field - See `propertyType`- field is deprecated
 * @property {String} propertyType - The type of data to map back to on the Entry instance (property/attribute)
 * @property {String} property - The property name within the field type of the Entry instance
 * @property {String} value - The value of the property (read/write)
 * @property {Boolean} secret - Wether or not the value should be hidden while viewing (masked)
 * @property {Boolean} multiline - Whether the value should be edited as a multiline value or not
 * @property {EntryFacadeFieldFormatting|Boolean} formatting - Vendor formatting options object, or false if no formatting necessary
 * @property {null|String} special - Special display handling (internal)
 */

/**
 * Create a descriptor for a field to be used within a facade
 * @param {Entry|null} entry The entry instance to process or null if the initial value
 *  should be empty
 * @param {String} title The field title
 * @param {String} entryPropertyType The type of entry property (property/attribute)
 * @param {String} entryPropertyName The name of the property
 * @param {Object} options The options for the field
 * @returns {EntryFacadeField} The field descriptor
 * @memberof module:ButtercupFacades
 */
function createFieldDescriptor(
    entry,
    title,
    entryPropertyType,
    entryPropertyName,
    { multiline = false, secret = false, formatting = false, removeable = false } = {}
) {
    const value = entry ? getEntryValue(entry, entryPropertyType, entryPropertyName) : "";
    // Check special config
    let special = null;
    if (entryPropertyType === "property" && isOTPURI(value)) {
        special = "otp";
    }
    // Return descriptor
    return {
        id: uuid(),
        title,
        propertyType: entryPropertyType,
        property: entryPropertyName,
        value,
        valueType: getEntryValueType(entry, entryPropertyName),
        formatting,
        removeable
    };
}

/**
 * Get a value on an entry for a specific property type
 * @param {Entry} entry The entry instance
 * @param {String} propertyType The type of entry property (property/attribute)
 * @param {String} name The property name
 * @returns {String} The property value
 * @throws {Error} Throws for unknown property types
 * @deprecated Not in use - To be removed
 */
function getEntryValue(entry, propertyType, name) {
    switch (propertyType) {
        case "property":
            return entry.getProperty(name);
        case "attribute":
            return entry.getAttribute(name);
        default:
            throw new Error(`Cannot retrieve value: Unknown property type: ${propertyType}`);
    }
}

/**
 * Get the entry value type
 * @param {Entry} entry Entry instance
 * @param {String} propertyName The entry property name
 * @returns {String} The entry value type
 */
function getEntryValueType(entry, propertyName) {
    const validTypes = [
        FIELD_VALUE_TYPE_NOTE,
        FIELD_VALUE_TYPE_OTP,
        FIELD_VALUE_TYPE_PASSWORD,
        FIELD_VALUE_TYPE_TEXT
    ];
    const type = entry.getAttribute(`${Entry.Attributes.FieldTypePrefix}${propertyName}`);
    return validTypes.indexOf(type) >= 0 ? type : FIELD_VALUE_TYPE_TEXT;
}

module.exports = {
    createFieldDescriptor,
    getEntryValue
};
