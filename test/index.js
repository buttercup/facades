const chai = require("chai");
const sinon = require("sinon");
require("@buttercup/app-env/native");

const { expect } = chai;

Object.assign(global, {
    expect,
    sinon
});
