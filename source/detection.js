const OTPURI_PATTERN = /^otpauth:\/\/[ht]otp\/[^\s]+$/i;

function isOTPURI(str) {
    return OTPURI_PATTERN.test(str);
}

module.exports = {
    isOTPURI
};
