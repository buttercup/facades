const hashSum = require("hash-sum");

/**
 * Generate a hash of a vault facade (useful for detecting
 *  if the vault differs from another copy)
 * @param {ArchiveFacade} vaultFacade A facade instance
 * @returns {String} Hash string
 * @memberof module:ButtercupFacades
 * @deprecated Poor performance - rely on `ArchiveFacade#_tag` instead
 */
function hashVaultFacade(vaultFacade) {
    const preparedObj = Object.assign({}, vaultFacade, {
        entries: vaultFacade.entries.map(entry => {
            const entryClone = Object.assign({}, entry);
            delete entryClone._history;
            return entryClone;
        })
    });
    return hashSum(preparedObj);
}

module.exports = {
    hashVaultFacade
};
