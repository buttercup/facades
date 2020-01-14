const { Archive, Entry } = require("buttercup");
const { consumeEntryFacade, createEntryFacade } = require("../../source/entry.js");
const {
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_TEXT
} = require("../../source/symbols.js");

describe("entry", function() {
    describe("consumeEntryFacade", function() {
        beforeEach(function() {
            const archive = new Archive();
            this.entry = archive.createGroup("test").createEntry("Bank");
            this.entry
                .setProperty("username", "u12345")
                .setProperty("password", "original")
                .setProperty("password", "passw0rd")
                .setProperty("URL", "https://bank.com")
                .setProperty("Note", "test\nnote")
                .setAttribute(`${Entry.Attributes.FieldTypePrefix}note`, FIELD_VALUE_TYPE_TEXT)
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

        it("does not set valueType if set to default 'text'", function() {
            this.facade.fields.find(
                f => f.property === "username"
            ).valueType = FIELD_VALUE_TYPE_TEXT;
            consumeEntryFacade(this.entry, this.facade);
            expect(this.entry.getAttribute(`${Entry.Attributes.FieldTypePrefix}username`)).to.be
                .undefined;
        });

        it("sets a valueType if set for first time", function() {
            this.facade.fields.find(
                f => f.property === "username"
            ).valueType = FIELD_VALUE_TYPE_OTP;
            consumeEntryFacade(this.entry, this.facade);
            expect(this.entry.getAttribute(`${Entry.Attributes.FieldTypePrefix}username`)).to.equal(
                FIELD_VALUE_TYPE_OTP
            );
        });

        it("sets valueType if changed", function() {
            this.facade.fields.find(f => f.property === "Note").valueType = FIELD_VALUE_TYPE_NOTE;
            consumeEntryFacade(this.entry, this.facade);
            expect(this.entry.getAttribute(`${Entry.Attributes.FieldTypePrefix}Note`)).to.equal(
                FIELD_VALUE_TYPE_NOTE
            );
        });

        it("outputs property history", function() {
            this.entry.deleteProperty("password");
            this.facade = createEntryFacade(this.entry);
            const passwordChanges = this.facade._history.filter(
                hist => hist.property === "password" && hist.propertyType === "property"
            );
            expect(passwordChanges).to.deep.equal([
                {
                    property: "password",
                    propertyType: "property",
                    originalValue: null,
                    newValue: "original"
                },
                {
                    property: "password",
                    propertyType: "property",
                    originalValue: "original",
                    newValue: "passw0rd"
                },
                {
                    property: "password",
                    propertyType: "property",
                    originalValue: "passw0rd",
                    newValue: null
                }
            ]);
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
                .setAttribute(`${Entry.Attributes.FieldTypePrefix}otpuri`, FIELD_VALUE_TYPE_OTP)
                .setProperty("username", "test")
                .setProperty("password", "test");
            this.facade = createEntryFacade(this.entry);
        });

        it("correctly sets valueType for OTP", function() {
            const otpField = this.facade.fields.find(f => f.property === "otpuri");
            expect(otpField).to.have.property("valueType", FIELD_VALUE_TYPE_OTP);
        });
    });
});
