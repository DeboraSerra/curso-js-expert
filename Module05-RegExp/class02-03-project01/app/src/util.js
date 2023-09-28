const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(message) {
    super(`This ${message} is unsafe dude!`);
    this.name = "InvalidRegexError";
  }
}

const evaluateRegex = (regex) => {
  const isSafe = safeRegex(regex);
  if (!isSafe) {
    throw new InvalidRegexError(regex);
  }
  return regex;
};

module.exports = { InvalidRegexError, evaluateRegex };
