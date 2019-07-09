const facadeFieldFactories = require("./entryFields.js");
const { createFieldDescriptor } = require("./tools.js");
const { ENTRY_FACADE_TYPE_ATTRIBUTE } = require("./symbols.js");

/**
 * Add extra fields to a fields array that are not mentioned in a preset
 * Facades are creaded by presets which don't mention all property values (custom user
 * added items). This method adds the unmentioned items to the facade fields so that
 * they can be edited as well.
 * @param {Entry} entry An Entry instance
 * @param {Array.<EntryFacadeField>} fields An array of fields
 * @returns {Array.<EntryFacadeField>} A new array with all combined fields
 */
function addExtraFieldsNonDestructive(entry, fields) {
    const exists = (propName, fieldType) =>
        fields.find(item => item.field === fieldType && item.property === propName);
    const { properties = {}, attributes = {} } = entry.toObject();
    return [
        ...fields,
        ...Object.keys(properties)
            .filter(name => !exists(name, "property"))
            .map(name =>
                createFieldDescriptor(
                    entry, // Entry instance
                    "", // Title
                    "property", // Type
                    name, // Property name
                    { removeable: true }
                )
            ),
        ...Object.keys(attributes)
            .filter(name => !exists(name, "attribute"))
            .map(name =>
                createFieldDescriptor(
                    entry, // Entry instance
                    "", // Title
                    "attribute", // Type
                    name // Property name
                )
            )
    ];
}

/**
 * Entry facade for data input
 * @typedef {Object} EntryFacade
 * @property {String} id - The entry ID
 * @property {String} type - The type of the facade
 * @property {Array.<EntryFacadeField>} fields - An array of fields
 * @property {String} parentID - The parent group ID
 */

/**
 * Apply a facade field descriptor to an entry
 * Takes data from the descriptor and writes it to the entry.
 * @param {Entry} entry The entry to apply to
 * @param {EntryFacadeField} descriptor The descriptor object
 */
function applyFieldDescriptor(entry, descriptor) {
    setEntryValue(entry, descriptor.field, descriptor.property, descriptor.value);
}

/**
 * Process a modified entry facade
 * @param {Entry} entry The entry to apply processed data on
 * @param {EntryFacade} facade The facade object
 * @memberof module:ButtercupFacades
 */
function consumeEntryFacade(entry, facade) {
    const facadeType = getEntryFacadeType(entry);
    if (facade && facade.type) {
        const properties = entry.getProperty();
        const attributes = entry.getAttribute();
        if (facade.type !== facadeType) {
            throw new Error(
                `Failed consuming entry data: Expected type "${facadeType}" but received "${facade.type}"`
            );
        }
        // update data
        (facade.fields || []).forEach(field => applyFieldDescriptor(entry, field));
        // remove missing properties
        Object.keys(properties).forEach(propKey => {
            const correspondingField = facade.fields.find(
                ({ field, propertyType, property }) =>
                    (field === "property" || propertyType === "property") && property === propKey
            );
            if (typeof correspondingField === "undefined") {
                entry.deleteProperty(propKey);
            }
        });
        // remove missing attributes
        Object.keys(attributes).forEach(attrKey => {
            const correspondingField = facade.fields.find(
                ({ field, propertyType, property }) =>
                    (field === "attribute" || propertyType === "attribute") && property === attrKey
            );
            if (typeof correspondingField === "undefined") {
                entry.deleteAttribute(attrKey);
            }
        });
    } else {
        throw new Error("Failed consuming entry data: Invalid item passed as a facade");
    }
}

/**
 * @typedef {Object} CreateEntryFacadeOptions
 * @property {String=} type - Optionally override the created facade type
 */

/**
 * Create a data/input facade for an Entry instance
 * @param {Entry=} entry The Entry instance
 * @param {CreateEntryFacadeOptions=} ops Options for the entry facade creation
 * @returns {EntryFacade} A newly created facade
 * @memberof module:ButtercupFacades
 */
function createEntryFacade(entry, { type } = {}) {
    if (entry && entry.type !== "Entry") {
        throw new Error("Failed creating entry facade: Provided item is not an Entry");
    }
    const facadeType = type || getEntryFacadeType(entry);
    const createFields = facadeFieldFactories[facadeType];
    if (!createFields) {
        throw new Error(`Failed creating entry facade: No factory found for type "${facadeType}"`);
    }
    const fields = entry
        ? addExtraFieldsNonDestructive(entry, createFields(entry))
        : createFields(entry);
    return {
        id: entry ? entry.id : null,
        type: facadeType,
        fields,
        parentID: entry ? entry.getGroup().id : null
    };
}

/**
 * Get the facade type for an entry
 * @param {Entry} entry The entry instance
 * @returns {String} The facade type
 * @memberof module:ButtercupFacades
 */
function getEntryFacadeType(entry) {
    if (!entry) {
        return "login";
    }
    return entry.getAttribute(ENTRY_FACADE_TYPE_ATTRIBUTE) || "login";
}

/**
 * Set a value on an entry
 * @param {Entry} entry The entry instance
 * @param {String} property Type of property ("property"/"meta"/"attribute")
 * @param {String} name The property name
 * @param {String} value The value to set
 * @throws {Error} Throws if the property type is not recognised
 */
function setEntryValue(entry, property, name, value) {
    switch (property) {
        case "property":
            return entry.setProperty(name, value);
        case "attribute":
            return entry.setAttribute(name, value);
        default:
            throw new Error(`Cannot set value: Unknown property type: ${property}`);
    }
}

module.exports = {
    consumeEntryFacade,
    createEntryFacade
};
