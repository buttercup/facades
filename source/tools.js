/**
 * Entry facade data field
 * @typedef {Object} EntryFacadeField
 * @property {String} title - The user-friendly title of the field
 * @property {String} field - The type of data to map back to on the Entry instance (property/attribute)
 * @property {String} property - The property name within the field type of the Entry instance
 * @property {String} value - The value of the property (read/write)
 * @property {Boolean} secret - Wether or not the value should be hidden while viewing (masked)
 * @property {Boolean} multiline - Whether the value should be edited as a multiline value or not
 * @property {Object|Boolean} formatting - Vendor formatting options object, or false if no formatting necessary
 * @property {Number} maxLength - Maximum recommended length of the value (defaults to -1)
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
 */
function createFieldDescriptor(
    entry,
    title,
    entryPropertyType,
    entryPropertyName,
    { multiline = false, secret = false, formatting = false, removeable = false } = {}
) {
    const value = entry ? getEntryValue(entry, entryPropertyType, entryPropertyName) : "";
    return {
        title,
        field: entryPropertyType,
        property: entryPropertyName,
        value,
        secret,
        multiline,
        formatting,
        removeable
    };
}

/**
 * Get a value on an entry for a specific property type
 * @param {Entry} entry The entry instance
 * @param {String} property The type of entry property (property/attribute)
 * @param {String} name The property name
 * @returns {String} The property value
 * @throws {Error} Throws for unknown property types
 * @deprecated Not in use - To be removed
 */
function getEntryValue(entry, property, name) {
    switch (property) {
        case "property":
            return entry.getProperty(name);
        case "attribute":
            return entry.getAttribute(name);
        default:
            throw new Error(`Cannot retrieve value: Unknown property type: ${property}`);
    }
}

module.exports = {
    createFieldDescriptor,
    getEntryValue
};
