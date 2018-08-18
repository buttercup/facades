const { createEntryFacade } = require("./entry.js");

function consumeArchiveFacade(archive, facade) {}

function createArchiveFacade(archive) {
    const entries = archive
        .getGroups()
        .reduce((output, group) => [...output, ...getEntriesFacades(group)], []);
    return {
        type: "archive",
        id: archive.id,
        attributes: archive.getAttribute(),
        groups: getGroupsFacades(archive, "0"),
        entries
    };
}

function createGroupFacade(group, parentID = "0") {
    return {
        id: group ? group.id : null,
        title: group ? group.getTitle() : "",
        parentID
    };
}

function getEntriesFacades(entryCollection, groupID) {
    const facades = entryCollection.getEntries().map(entry =>
        Object.assign({}, createEntryFacade(entry), {
            parentID: groupID
        })
    );
    entryCollection.getGroups().forEach(group => {
        facades.push(...getEntriesFacades(group, group.id));
    });
    return facades;
}

function getGroupsFacades(groupCollection, parentID) {
    const facades = groupCollection.getGroups().map(group => createGroupFacade(group, parentID));
    groupCollection.getGroups().forEach(group => {
        facades.push(...getGroupsFacades(group.getGroups(), group.id));
    });
    return facades;
}

module.exports = {
    consumeArchiveFacade,
    createArchiveFacade,
    createGroupFacade
};
