/**
 * Facade type flag for an entry (specifies what type of entry it is)
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_FACADE_TYPE_ATTRIBUTE = "BC_ENTRY_FACADE_TYPE";

/**
 * Credit-card entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_CREDITCARD = "credit_card";
/**
 * Login (default) entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_LOGIN = "login";
/**
 * Note entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_NOTE = "note";
/**
 * SSH public/private key-pair entry type
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_SSHKEY = "ssh_key";
/**
 * Website entry type (includes URL)
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPE_WEBSITE = "website";

/**
 * Entry types collection (all available)
 * @type {Array.<String>}
 * @memberof module:ButtercupFacades
 */
const ENTRY_TYPES = [
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE
];

/**
 * Note type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_NOTE = "note";
/**
 * OTP (One Time Password) type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_OTP = "otp";
/**
 * Password type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_PASSWORD = "password";
/**
 * Text (default) type entry field value
 * @type {String}
 * @memberof module:ButtercupFacades
 */
const FIELD_VALUE_TYPE_TEXT = "text";

module.exports = {
    ENTRY_FACADE_TYPE_ATTRIBUTE,
    ENTRY_TYPE_CREDITCARD,
    ENTRY_TYPE_LOGIN,
    ENTRY_TYPE_NOTE,
    ENTRY_TYPE_SSHKEY,
    ENTRY_TYPE_WEBSITE,
    ENTRY_TYPES,
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
};
