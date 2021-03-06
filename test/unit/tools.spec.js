const { Archive, Entry } = require("buttercup");
const { createFieldDescriptor, getEntryValue } = require("../../source/tools.js");
const { FIELD_VALUE_TYPE_NOTE, FIELD_VALUE_TYPE_TEXT } = require("../../source/symbols.js");

describe("tools", function() {
    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("test").createEntry("Email");
        this.entry.setProperty("username", "user@email.com");
        this.entry.setAttribute("testAttribute", "testValue");
    });

    describe("createFieldDescriptor", function() {
        it("supports outputting empty structures", function() {
            const obj = createFieldDescriptor(null, "Test", "property", "test");
            expect(obj).to.be.an("object");
            expect(obj).to.have.property("title", "Test");
            expect(obj).to.have.property("propertyType", "property");
            expect(obj).to.have.property("property", "test");
            expect(obj).to.have.property("value", "");
            expect(obj).to.have.property("valueType", FIELD_VALUE_TYPE_TEXT);
        });

        it("supports taking the value from an Entry", function() {
            const obj = createFieldDescriptor(this.entry, "Username", "property", "username");
            expect(obj).to.have.property("title", "Username");
            expect(obj).to.have.property("propertyType", "property");
            expect(obj).to.have.property("property", "username");
            expect(obj).to.have.property("value", "user@email.com");
        });

        it("outputs valueType when set", function() {
            this.entry.setAttribute(
                `${Entry.Attributes.FieldTypePrefix}username`,
                FIELD_VALUE_TYPE_NOTE
            );
            const obj = createFieldDescriptor(this.entry, "Username", "property", "username");
            expect(obj).to.have.property("valueType", FIELD_VALUE_TYPE_NOTE);
        });
    });

    describe("getEntryValue", function() {
        it("can return property values", function() {
            expect(getEntryValue(this.entry, "property", "username")).to.equal("user@email.com");
        });

        it("can return attribute values", function() {
            expect(getEntryValue(this.entry, "attribute", "testAttribute")).to.equal("testValue");
        });

        it("throws if the field name is not valid", function() {
            expect(() => {
                getEntryValue(this.entry, "what", "username");
            }).to.throw(/Unknown property type/i);
        });
    });
});
