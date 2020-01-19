const { Archive } = require("buttercup");
const { hashVaultFacade } = require("../../source/hash.js");
const { createArchiveFacade } = require("../../source/archive.js");
const { createFieldDescriptor } = require("../../source/tools.js");

describe("hash", function() {
    describe("hashVaultFacade", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive
                .createGroup("General")
                .createEntry("Test")
                .setProperty("username", "bob");
            this.facade = createArchiveFacade(this.archive);
        });

        it("returns a valid hash", function() {
            expect(hashVaultFacade(this.facade)).to.match(/^[0-9a-f]{8}$/);
        });

        it("returns the same hash for a single facade", function() {
            const hash1 = hashVaultFacade(this.facade);
            const hash2 = hashVaultFacade(this.facade);
            expect(hash1).to.equal(hash2);
        });

        it("returns different hashes after an entry change", function() {
            const hash1 = hashVaultFacade(this.facade);
            const field = createFieldDescriptor(null, null, "password", "password");
            field.value = "test!";
            this.facade.entries[0].fields.push(field);
            const hash2 = hashVaultFacade(this.facade);
            expect(hash1).to.not.equal(hash2);
        });

        it("ignores entry history", function() {
            const hash1 = hashVaultFacade(this.facade);
            this.facade.entries[0]._history.push(
                Object.assign({}, this.facade.entries[0]._history[0])
            );
            const hash2 = hashVaultFacade(this.facade);
            expect(hash1).to.equal(hash2);
        });
    });
});
