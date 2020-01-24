const uuid = require("uuid/v4");
const { consumeEntryFacade, createEntryFacade } = require("./entry.js");
const { ENTRY_FACADE_TYPE_ATTRIBUTE } = require("./symbols.js");

/**
 * Consume an archive facade and apply the differences to the archive
 * instance
 * @param {Archive} archive The archive instance to apply to
 * @param {ArchiveFacade} facade The facade to apply
 * @memberof module:ButtercupFacades
 */
function consumeArchiveFacade(archive, facade) {
    if (!archive || (archive && archive.type !== "Archive")) {
        throw new Error(
            "Failed consuming archive facade: First parameter expected to be an Archive instance"
        );
    }
    if (!facade || (facade && facade.type !== "archive")) {
        throw new Error(
            `Failed consuming archive facade: Second parameter expected to be an archive facade, got: ${facade.type}`
        );
    }
    const { id, type, attributes, groups, entries } = facade;
    if (type !== "archive") {
        throw new Error(`Failed consuming archive facade: Invalid facade type: ${type}`);
    }
    if (id !== archive.id) {
        throw new Error(
            `Failed consuming archive facade: Provided facade ID (${id}) does not match target archive's ID: ${archive.id}`
        );
    }
    // Create comparison facade
    let {
        groups: currentGroups,
        entries: currentEntries,
        attributes: currentAttributes
    } = createArchiveFacade(archive);
    // Handle group removal
    currentGroups.forEach(currentGroupFacade => {
        const existing = groups.find(group => group.id === currentGroupFacade.id);
        if (!existing) {
            // Removed, so delete
            const targetItem = archive.findGroupByID(currentGroupFacade.id);
            if (targetItem) {
                // Only attempt deleting if it comes back as a result. It's possible
                // that if a parent was deleted, the children were also removed and
                // this call to `findGroupByID` might return nothing..
                targetItem.delete();
            }
        }
    });
    // Update facade properties after groups deletion
    currentGroups = getGroupsFacades(archive);
    // Manage other group operations
    groups.forEach(groupRaw => {
        const groupFacade = Object.assign({}, groupRaw);
        if (groupFacade.id) {
            if (!currentGroups.find(group => group.id === groupFacade.id)) {
                // Group had an ID which is now gone, so it was removed
                return;
            }
            // Handle group move
            const { id: groupID, parentID: groupParentID } = groupFacade;
            const ref = archive.findGroupByID(groupID);
            const refGroup = ref.getGroup();
            if (
                (refGroup === null && groupParentID !== "0") ||
                (refGroup !== null && refGroup.id !== groupParentID)
            ) {
                // Group has different parent, so move
                ref.moveTo(groupParentID === "0" ? archive : archive.findGroupByID(groupParentID));
            }
        } else {
            // Handle group addition
            const targetParent =
                groupFacade.parentID === "0"
                    ? archive
                    : archive.findGroupByID(groupFacade.parentID);
            const newGroupInst = targetParent.createGroup(groupFacade.title);
            groupFacade.id = newGroupInst.id;
        }
        consumeGroupFacade(archive.findGroupByID(groupFacade.id), groupFacade);
    });
    // Handle entry removal
    currentEntries.forEach(currentEntryFacade => {
        const existing = entries.find(entry => entry.id === currentEntryFacade.id);
        if (!existing) {
            // Removed, so delete
            const entry = archive.findEntryByID(currentEntryFacade.id);
            if (entry) {
                entry.delete();
            }
        }
    });
    // Update facade properties after entries deletion
    currentEntries = getEntriesFacades(archive);
    // Manage other entry operations
    entries.forEach(entryRaw => {
        const entryFacade = Object.assign({}, entryRaw);
        if (entryFacade.id) {
            if (!currentEntries.find(entry => entry.id === entryRaw.id)) {
                // Entry had an ID which is now gone, so it was removed
                return;
            }
            // Handle entry move
            const ref = archive.findEntryByID(entryFacade.id);
            const refGroup = ref.getGroup();
            if (refGroup.id !== entryFacade.parentID) {
                // Entry has different group, so move
                ref.moveToGroup(archive.findGroupByID(entryFacade.parentID));
            }
        } else {
            // Handle entry addition
            const targetGroup = archive.findGroupByID(entryFacade.parentID);
            const newEntry = targetGroup.createEntry();
            entryFacade.id = newEntry.id;
            if (entryFacade.type) {
                newEntry.setAttribute(ENTRY_FACADE_TYPE_ATTRIBUTE, entryFacade.type);
            }
        }
        const entryToUpdate = archive.findEntryByID(entryFacade.id);
        consumeEntryFacade(entryToUpdate, entryFacade);
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

/**
 * Consume a group facade and apply the differences to a group instance
 * @param {Group} group The group instance to apply to
 * @param {GroupFacade} facade The facade to apply
 * @memberof module:ButtercupFacades
 */
function consumeGroupFacade(group, facade) {
    const { id, title, type, attributes } = facade;
    const existingEntries = group.getEntries();
    const existingAttributes = group.getAttribute();
    if (type !== "group") {
        throw new Error(`Failed consuming group facade: Invalid facade type: ${type}`);
    }
    if (id !== group.id) {
        throw new Error(
            `Failed consuming group facade: Provided facade ID (${id}) does not match target group's ID: ${group.id}`
        );
    }
    if (!title || title.trim().length <= 0) {
        throw new Error("Failed consuming group facade: Title must not be empty");
    }
    if (group.getTitle() !== title) {
        group.setTitle(title);
    }
    // Check attributes
    Object.keys(existingAttributes)
        .filter(attr => !attributes.hasOwnProperty(attr))
        .forEach(attr => {
            // Remove missing
            group.deleteAttribute(attr);
        });
    Object.keys(attributes).forEach(attr => {
        if (!existingAttributes[attr] || existingAttributes[attr] !== attributes[attr]) {
            // Different value
            group.setAttribute(attr, attributes[attr]);
        }
    });
}

/**
 * @typedef {Object} ArchiveFacade
 * @property {String} type - The facade type: "archive"
 * @property {String} id - The archive ID
 * @property {Object} attributes - A key/value list of all the archive attributes
 * @property {Array.<GroupFacade>} groups - An array of group facades
 * @property {Array.<EntryFacade>} entries - An array of entry facades
 * @property {String} _tag - The UUID tag for the generation of the facade
 */

/**
 * Create an archive facade from an Archive instance
 * @param {Archive} archive An archive instance
 * @returns {ArchiveFacade} An archive facade
 * @memberof module:ButtercupFacades
 */
function createArchiveFacade(archive) {
    return {
        _tag: uuid(),
        type: "archive",
        id: archive.id,
        attributes: archive.getAttribute(),
        groups: getGroupsFacades(archive),
        entries: getEntriesFacades(archive)
    };
}

/**
 * @typedef {Object} GroupFacade
 * @property {String} type - The facade type: "group"
 * @property {String|null} id - The group ID. Will be set to null if
 *  the group is a new one
 * @property {String} title - The group title
 * @property {Object} attributes - A key/value list of group attributes
 * @property {String|null} parentID - The parent group ID. Set to "0" if
 *  it is to be created in the root.
 */

/**
 * Create a group facade from a Group instance
 * @param {Group} group The group instance
 * @param {String=} parentID The parent ID of the group
 * @memberof module:ButtercupFacades
 */
function createGroupFacade(group, parentID = "0") {
    return {
        type: "group",
        id: group ? group.id : null,
        title: group ? group.getTitle() : "",
        attributes: group ? group.getAttribute() : {},
        parentID
    };
}

/**
 * Get all entry facades for an archive
 * @param {Archive} archive An archive instance
 * @returns {Array.<EntryFacade>} An array of entry facades
 */
function getEntriesFacades(archive) {
    return archive
        .getGroups()
        .reduce((output, group) => [...output, ...getGroupEntriesFacades(group)], []);
}

/**
 * Convert an array of entries into an array of facades
 * @param {Array.<Entry>} entryCollection An array of entries
 * @param {String} groupID The parent group ID
 * @returns {Array.<EntryFacade>} An array of entry facades
 */
function getGroupEntriesFacades(entryCollection, groupID) {
    const facades = entryCollection
        .getEntries()
        .map(entry => Object.assign({}, createEntryFacade(entry)));
    entryCollection.getGroups().forEach(group => {
        facades.push(...getGroupEntriesFacades(group, group.id));
    });
    return facades;
}

/**
 * Convert an array of groups into an array of facades
 * @param {Array.<Group>} groupCollection An array of groups
 * @param {String=} parentID The parent group ID (defaults to root)
 * @returns {Array.<GroupFacade>} An array of group facades
 */
function getGroupsFacades(groupCollection, parentID = "0") {
    const facades = groupCollection.getGroups().map(group => createGroupFacade(group, parentID));
    groupCollection.getGroups().forEach(group => {
        facades.push(...getGroupsFacades(group, group.id));
    });
    return facades;
}

module.exports = {
    consumeArchiveFacade,
    consumeGroupFacade,
    createArchiveFacade,
    createGroupFacade
};
