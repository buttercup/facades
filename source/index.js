const { consumeEntryFacade, createEntryFacade, getEntryFacadeType } = require("./entry.js");
const { createFieldDescriptor } = require("./tools.js");
const {
    consumeArchiveFacade,
    consumeGroupFacade,
    createArchiveFacade,
    createGroupFacade
} = require("./archive.js");

module.exports = {
    consumeArchiveFacade,
    consumeEntryFacade,
    createArchiveFacade,
    createEntryFacade,
    createGroupFacade,
    createFieldDescriptor,
    getEntryFacadeType
};
