const { consumeEntryFacade, createEntryFacade, getEntryFacadeType } = require("./entry.js");
const { createFieldDescriptor } = require("./tools.js");
const {
    consumeArchiveFacade,
    consumeGroupFacade,
    createArchiveFacade,
    createGroupFacade
} = require("./archive.js");
const symbols = require("./symbols.js");

/**
 * @module ButtercupFacades
 */

module.exports = Object.assign(
    {
        consumeArchiveFacade,
        consumeGroupFacade,
        consumeEntryFacade,
        createArchiveFacade,
        createEntryFacade,
        createGroupFacade,
        createFieldDescriptor,
        getEntryFacadeType
    },
    symbols
);
