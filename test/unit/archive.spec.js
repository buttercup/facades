const { Archive } = require("buttercup");
const { createArchiveFacade, createGroupFacade } = require("../../source/archive.js");

describe("archive", function() {
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
        this.group = topGroup;
        topGroup.setAttribute("test_attr", "1234");
        topGroup.setAttribute("test_attr_2", "5678");
    });

    describe("createArchiveFacade", function() {
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

        it("outputs a tag", function() {
            const { _tag } = createArchiveFacade(this.archive);
            expect(_tag)
                .to.be.a("string")
                .that.has.length.above(0);
        });
    });

    describe("createGroupFacade", function() {
        it("outputs the ID", function() {
            const facade = createGroupFacade(this.group);
            expect(facade).to.have.property("id", this.group.id);
        });

        it("outputs the title", function() {
            const facade = createGroupFacade(this.group);
            expect(facade).to.have.property("title", this.group.getTitle());
        });

        it("sets the type", function() {
            const facade = createGroupFacade(this.group);
            expect(facade).to.have.property("type", "group");
        });

        it("outputs the group attributes", function() {
            const facade = createGroupFacade(this.group);
            expect(facade)
                .to.have.property("attributes")
                .that.deep.equals({
                    test_attr: "1234",
                    test_attr_2: "5678"
                });
        });
    });
});
