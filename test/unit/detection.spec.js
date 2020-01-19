const { isVaultFacade } = require("../../source/detection.js");

describe("detection", function() {
    describe("isVaultFacade", function() {
        it("recognises facade-like objects", function() {
            expect(
                isVaultFacade({
                    type: "archive",
                    id: "1",
                    groups: [],
                    entries: []
                })
            ).to.be.true;
        });

        it("recognises non-facade-like objects", function() {
            expect(
                isVaultFacade({
                    type: "archive",
                    groups: [],
                    entries: []
                })
            ).to.be.false;
            expect(isVaultFacade({})).to.be.false;
            expect(isVaultFacade()).to.be.false;
            expect(isVaultFacade(null)).to.be.false;
        });
    });
});
