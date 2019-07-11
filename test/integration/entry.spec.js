const { Archive, Entry } = require("buttercup");
const { consumeEntryFacade, createEntryFacade } = require("../../source/entry.js");

describe("entry", function() {
    describe("consumeEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            this.entry = archive.createGroup("test").createEntry("Bank");
            this.entry
                .setProperty("username", "u12345")
                .setProperty("password", "passw0rd")
                .setProperty("URL", "https://bank.com")
                .setAttribute("BC_TEST", "test");
            this.facade = createEntryFacade(this.entry);
        });

        it("updates properties", function() {
            this.facade.fields.find(f => f.property === "username").value = "newUsername";
            consumeEntryFacade(this.entry, this.facade);
            expect(this.entry.getProperty("username")).to.equal("newUsername");
        });

        it("updates attributes", function() {
            this.facade.fields.find(f => f.property === "BC_TEST").value = "test2";
            consumeEntryFacade(this.entry, this.facade);
            expect(this.entry.getAttribute("BC_TEST")).to.equal("test2");
        });
    });

    describe("createEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            this.entry = archive.createGroup("test").createEntry("test");
            this.entry
                .setProperty(
                    "otpuri",
                    "otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30"
                )
                .setProperty("username", "test")
                .setProperty("password", "test");
            this.facade = createEntryFacade(this.entry);
        });

        it("correctly marks special for OTP", function() {
            const otpField = this.facade.fields.find(f => f.property === "otpuri");
            expect(otpField).to.have.property("special", "otp");
        });
    });
});
