import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import Util from "../../src/util.js";

describe("Util strings", () => {
  const componentName = "product";
  const repositoryName = `${componentName}Repository`;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("#upperCaseFirstLetter should return string with first letter in upper case", () => {
    const data = "hello";
    const expected = "Hello";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toBe(expected);
  });
  it("#lowerCaseFirstLetter should return string with first letter in lower case", () => {
    const data = "Hello";
    const expected = "hello";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toBe(expected);
  });
  it("#lowerCaseFirstLetter given an empty string should return empty string", () => {
    const data = "";
    const expected = "";
    const result = Util.lowerCaseFirstLetter(data);
    expect(result).toBe(expected);
  });
  it("#upperCaseFirstLetter given an empty string should return empty string", () => {
    const data = "";
    const expected = "";
    const result = Util.upperCaseFirstLetter(data);
    expect(result).toBe(expected);
  });
});
