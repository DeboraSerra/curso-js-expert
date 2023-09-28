const { describe, it } = require("mocha");
const { expect } = require("chai");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util test suite", () => {
  it('#evaluateRegex should throw an InvalidRegexError if the regex is unsafe', () => {
    const unsafeRegex = /([a-zA-Z]+)*$/;
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, "This /([a-zA-Z]+)*$/ is unsafe dude!");
  })
  it('#evaluateRegex should return the regex if it is safe', () => {
    const safeRegex = /([a-z])$/;
    expect(evaluateRegex(safeRegex)).to.be.eql(safeRegex);
  })
})