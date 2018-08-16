const { createFieldDescriptor } = require("../../source/tools.js");

describe("tools", function() {
    describe("createFieldDescriptor", function() {
        it("supports outputting empty structures", function() {
            const obj = createFieldDescriptor(null, "Test", "property", "test");
            expect(obj).to.be.an("object");
            expect(obj).to.have.property("title", "Test");
            expect(obj).to.have.property("field", "property");
            expect(obj).to.have.property("property", "test");
            expect(obj).to.have.property("value", "");
        });
    });
});
