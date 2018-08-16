const { Archive, Entry } = require("buttercup");
const { consumeEntryFacade, createEntryFacade } = require("../../source/entry.js");

describe("entry", function() {
    describe("createEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            this.entry = archive.createGroup("test").createEntry("Bank");
            this.entry
                .setProperty("username", "u12345")
                .setProperty("password", "passw0rd")
                .setProperty("URL", "https://bank.com");
        });

        it("outputs the correct facade type", function() {
            const { type: type1 } = createEntryFacade(this.entry);
            expect(type1).to.equal("login");
            this.entry.setAttribute(Entry.Attributes.FacadeType, "website");
            const { type: type2 } = createEntryFacade(this.entry);
            expect(type2).to.equal("website");
        });

        it("throws if the parameter is not an Entry instance", function() {
            expect(() => {
                createEntryFacade(new Archive());
            }).to.throw(/not an Entry/i);
        });

        it("throws if entry facade type is not recognised", function() {
            this.entry.setAttribute(Entry.Attributes.FacadeType, "chicken");
            expect(() => {
                createEntryFacade(this.entry);
            }).to.throw(/No.+found for type/i);
        });
    });
});