const { expect } = require("chai");
const { describe, it } = require("mocha");
const { productValidator } = require("../src");
const ProductObjectMother = require("./model/ProductObjectMother");

describe("Test Data Builder", () => {
  it("shouldn't return errors when product is valid", () => {
    const product = ProductObjectMother.valid();
    const result = productValidator(product);
    const expected = {
      result: true,
      errors: [],
    };
    expect(result).to.be.deep.equal(expected);
  });
  describe("Product Validation With Object Mother", () => {
    it("should return an object error when creating a product with an invalid id", () => {
      const product = ProductObjectMother.invalidId();
      const result = productValidator(product);
      const expected = {
        result: false,
        errors: ["Id should be between 2 and 20 characters"],
      };
      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with an invalid name", () => {
      const product = ProductObjectMother.invalidName();
      const result = productValidator(product);
      const expected = {
        result: false,
        errors: ["Name should be only letters"],
      };
      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with an invalid price", () => {
      const product = ProductObjectMother.invalidPrice();
      const result = productValidator(product);
      const expected = {
        result: false,
        errors: ["Price should be between 0 and 10000"],
      };
      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with an invalid category", () => {
      const product = ProductObjectMother.invalidCategory();
      const result = productValidator(product);
      const expected = {
        result: false,
        errors: ["Category should be electronic or organic"],
      };
      expect(result).to.be.deep.equal(expected);
    });
    it("should return an object error when creating a product with all invalid fields", () => {
      const product = ProductObjectMother.allInvalid();
      const result = productValidator(product);
      const expected = {
        result: false,
        errors: [
          "Id should be between 2 and 20 characters",
          "Name should be only letters",
          "Price should be between 0 and 10000",
          "Category should be electronic or organic",
        ],
      };
      expect(result).to.be.deep.equal(expected);
    });
  });
});
