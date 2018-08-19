const { consumeEntryFacade, createEntryFacade } = require("./entry.js");

function consumeArchiveFacade(archive, facade) {
    const { id, type, attributes, groups, entries } = facade;
    if (type !== "archive") {
        throw new Error(`Failed consuming archive facade: Invalid facade type: ${type}`);
    }
    if (id !== archive.id) {
        throw new Error(
            `Failed consuming archive facade: Provided facade ID (${id}) does not match target archive's ID: ${
                archive.id
            }`
        );
    }
    // Create comparison facade
    const {
        groups: currentGroups,
        entries: currentEntries,
        attributes: currentAttributes
    } = createArchiveFacade(archive);
    // Handle group removal
    currentGroups.forEach(currentGroupFacade => {
        const existing = groups.find(group => group.id === currentGroupFacade.id);
        if (!existing) {
            // Removed, so delete
            archive.findGroupByID(currentGroupFacade.id).delete();
        }
    });
    // Manage other group operations
    groups.forEach(groupRaw => {
        const groupFacade = Object.assign({}, groupRaw);
        if (groupFacade.id) {
            // Handle group move
            const { id: groupID, parentID: groupParentID } = groupFacade;
            const ref = archive.findGroupByID(groupID);
            const refGroup = ref.getGroup();
            if (
                (refGroup === null && groupParentID !== "0") ||
                (refGroup !== null && refGroup.id !== groupParentID)
            ) {
                // Group has different parent, so move
                ref.moveToGroup(groupParentID);
            }
        } else {
            // Handle group addition
            const targetParent =
                groupFacade.parentID === "0"
                    ? archive
                    : archive.findGroupByID(groupFacade.parentID);
            const newGroupInst = targetParent.createGroup(newGroup.title);
            groupFacade.id = newGroupInst.id;
        }
        consumeGroupFacade(archive.findGroupByID(groupFacade.id), groupFacade);
    });
    // Handle entry removal
    currentEntries.forEach(currentEntryFacade => {
        const existing = entries.find(entry => entry.id === currentEntryFacade.id);
        if (!existing) {
            // Removed, so delete
            archive.findEntryByID(currentEntryFacade.id).delete();
        }
    });
    // Manage other entry operations
    entries.forEach(entryRaw => {
        const entryFacade = Object.assign({}, entryRaw);
        if (entryFacade.id) {
            // Handle entry move
            const ref = archive.findEntryByID(entryFacade.id);
            const refGroup = ref.getGroup();
            if (refGroup.id !== entryFacade.parentID) {
                // Entry has different group, so move
                ref.moveToGroup(entryFacade.parentID);
            }
        } else {
            // Handle entry addition
            const targetGroup = archive.findGroupByID(entryFacade.parentID);
            const newEntry = targetGroup.createEntry();
            entryFacade.id = newEntry.id;
        }
        consumeEntryFacade(archive.findEntryByID(entryFacade.id), entryFacade);
    });
    // Check attributes
    Object.keys(currentAttributes)
        .filter(attr => !attributes.hasOwnProperty(attr))
        .forEach(attr => {
            // Remove missing
            archive.deleteAttribute(attr);
        });
    Object.keys(attributes).forEach(attr => {
        if (!currentAttributes[attr] || currentAttributes[attr] !== attributes[attr]) {
            // Different value
            archive.setAttribute(attr, attributes[attr]);
        }
    });
}

function consumeGroupFacade(group, facade) {
    const { id, title, type, attributes } = facade;
    const existingEntries = group.getEntries();
    if (type !== "group") {
        throw new Error(`Failed consuming group facade: Invalid facade type: ${type}`);
    }
    if (id !== group.id) {
        throw new Error(
            `Failed consuming group facade: Provided facade ID (${id}) does not match target group's ID: ${
                group.id
            }`
        );
    }
    if (group.getTitle() !== title) {
        group.setTitle(title);
    }
    // @todo attributes
}

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
    // @todo attributes
    return {
        type: "group",
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
        facades.push(...getGroupsFacades(group, group.id));
    });
    return facades;
}

module.exports = {
    consumeArchiveFacade,
    createArchiveFacade,
    createGroupFacade
};
