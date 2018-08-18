const { Archive } = require("buttercup");
const { createArchiveFacade } = require("../../source/archive.js");

describe("archive", function() {
    describe("createArchiveFacade", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.setAttribute("ATTR_1", "one").setAttribute("ATTR_2", "two");
            const topGroup = this.archive.createGroup("top");
            const bottomGroup = topGroup.createGroup("one").createGroup("two");
            topGroup.createGroup("three");
            topGroup
                .createEntry("Entry A")
                .setProperty("username", "user@example.com")
                .setProperty("password", "passw0rd");
            bottomGroup
                .createEntry("Entry B")
                .setProperty("username", "user2@example.com")
                .setProperty("password", "pa55w0rd");
        });

        it("outputs the correct facade type", function() {
            const { type } = createArchiveFacade(this.archive);
            expect(type).to.equal("archive");
        });

        it("sets the archive ID", function() {
            const { id } = createArchiveFacade(this.archive);
            expect(id).to.equal(this.archive.id);
        });

        it("outputs attributes", function() {
            const { attributes } = createArchiveFacade(this.archive);
            expect(attributes).to.deep.equal({
                ATTR_1: "one",
                ATTR_2: "two"
            });
        });

        it("outputs all groups", function() {
            const { groups } = createArchiveFacade(this.archive);
            const groupNames = groups.map(group => group.title);
            expect(groupNames).to.include.members(["top", "one", "two", "three"]);
        });

        it("outputs all entries", function() {
            const { entries } = createArchiveFacade(this.archive);
            expect(entries).to.have.lengthOf(2);
        });
    });
});
