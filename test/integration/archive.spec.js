const { Archive, Entry, Group } = require("buttercup");
const { consumeArchiveFacade, createArchiveFacade } = require("../../source/archive.js");
const { createEntryFacade } = require("../../source/entry.js");

describe("archive", function() {
    beforeEach(function() {
        this.archive = new Archive();
        this.archive.setAttribute("ATTR_1", "one").setAttribute("ATTR_2", "two");
        const topGroup = (this.topGroup = this.archive.createGroup("top"));
        const bottomGroup = (this.bottomGroup = topGroup.createGroup("one").createGroup("two"));
        topGroup.createGroup("three");
        this.entryA = topGroup
            .createEntry("Entry A")
            .setProperty("username", "user@example.com")
            .setProperty("password", "passw0rd")
            .setAttribute("test_attr", "1234")
            .setAttribute("test_attr_2", "5678");
        this.entryB = bottomGroup
            .createEntry("Entry B")
            .setProperty("username", "user2@example.com")
            .setProperty("password", "pa55w0rd");
    });

    describe("consumeArchiveFacade", function() {
        it("supports deleting entries", function() {
            const facade = createArchiveFacade(this.archive);
            const targetEntryIndex = facade.entries.findIndex(
                entryFacade => entryFacade.id === this.entryA.id
            );
            expect(this.archive.findEntryByID(this.entryA.id)).to.be.an.instanceOf(Entry);
            facade.entries.splice(targetEntryIndex, 1);
            consumeArchiveFacade(this.archive, facade);
            expect(this.archive.findEntryByID(this.entryA.id)).to.be.null;
        });

        it("supports moving entries", function() {
            const facade = createArchiveFacade(this.archive);
            const targetEntryIndex = facade.entries.findIndex(
                entryFacade => entryFacade.id === this.entryA.id
            );
            facade.entries[targetEntryIndex].parentID = this.bottomGroup.id;
            expect(this.archive.findEntryByID(this.entryA.id).getGroup().id).to.equal(
                this.topGroup.id
            );
            consumeArchiveFacade(this.archive, facade);
            expect(this.archive.findEntryByID(this.entryA.id).getGroup().id).to.equal(
                this.bottomGroup.id
            );
        });

        it("supports adding entries", function() {
            const facade = createArchiveFacade(this.archive);
            const entryFacade = createEntryFacade();
            entryFacade.fields.find(field => field.property === "title").value = "Test Entry";
            entryFacade.parentID = this.topGroup.id;
            facade.entries.push(entryFacade);
            consumeArchiveFacade(this.archive, facade);
            expect(
                this.archive.findEntriesByProperty("title", "Test Entry")[0]
            ).to.be.an.instanceOf(Entry);
        });

        it("supports deleting groups", function() {
            const facade = createArchiveFacade(this.archive);
            const topGroupID = this.topGroup.id;
            const bottomGroupID = this.bottomGroup.id;
            const groupIndex = facade.groups.findIndex(
                groupFacade => groupFacade.id === topGroupID
            );
            facade.groups.splice(groupIndex, 1);
            expect(this.archive.findGroupByID(topGroupID)).to.be.an.instanceOf(Group);
            consumeArchiveFacade(this.archive, facade);
            expect(this.archive.findGroupByID(topGroupID)).to.be.null;
            expect(this.archive.findGroupByID(bottomGroupID)).to.be.null;
        });
    });
});
