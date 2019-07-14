const { consumeEntryFacade, createEntryFacade, getEntryFacadeType } = require("./entry.js");
const { createFieldDescriptor } = require("./tools.js");
const {
    consumeArchiveFacade,
    consumeGroupFacade,
    createArchiveFacade,
    createGroupFacade
} = require("./archive.js");
const {
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
} = require("./symbols.js");

/**
 * @module ButtercupFacades
 */

module.exports = {
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT,
    consumeArchiveFacade,
    consumeGroupFacade,
    consumeEntryFacade,
    createArchiveFacade,
    createEntryFacade,
    createGroupFacade,
    createFieldDescriptor,
    getEntryFacadeType
};
