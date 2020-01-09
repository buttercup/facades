const ButtercupFacades = require("../../source/index.js");

describe("index", function() {
    describe("symbols", function() {
        [
            "DEFAULT_ENTRY_TYPE",
            "DEFAULT_FIELD_TYPE",
            "ENTRY_FACADE_TYPE_ATTRIBUTE",
            "ENTRY_TYPE_CREDITCARD",
            "ENTRY_TYPE_LOGIN",
            "ENTRY_TYPE_NOTE",
            "ENTRY_TYPE_SSHKEY",
            "ENTRY_TYPE_WEBSITE",
            "ENTRY_TYPES",
            "FIELD_VALUE_TYPE_NOTE",
            "FIELD_VALUE_TYPE_OTP",
            "FIELD_VALUE_TYPE_PASSWORD",
            "FIELD_VALUE_TYPE_TEXT",
            "FIELD_VALUE_TYPES"
        ].forEach(symbolName => {
            it(`defines '${symbolName}'`, function() {
                expect(ButtercupFacades).to.have.property(symbolName);
            });
        });
    });
});
