import { describe, expect, it, jest } from "@jest/globals";
import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions";

describe("BaseBusiness", () => {
  it("should throw an error when trying to call _validateRequiredFields if not implemented in child class", () => {
    class concreteClass extends BaseBusiness {}
    const concreteClassInstance = new concreteClass();
    const validationError = new NotImplementedException(
      concreteClassInstance._validateRequiredFields.name
    );
    expect(() => concreteClassInstance._validateRequiredFields()).toThrow(
      validationError
    );
  });
  it("should throw an error when trying to call _create if not implemented in child class", () => {
    class concreteClass extends BaseBusiness {}
    const concreteClassInstance = new concreteClass();
    const validationError = new NotImplementedException(
      concreteClassInstance._create.name
    );
    expect(() => concreteClassInstance._create()).toThrow(validationError);
  });
  it("should throw an error when calling create with invalid data", () => {
    const VALIDATION_SUCCESS = false;
    class concreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn(() => VALIDATION_SUCCESS);
    }
    const concreteClassInstance = new concreteClass();
    expect(() => concreteClassInstance.create()).toThrow();
  });
  it("should call _validateRequiredFields and _create when calling create", () => {
    const VALIDATION_SUCCESS = true;
    class concreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn(() => VALIDATION_SUCCESS);
      _create = jest.fn();
    }
    const concreteClassInstance = new concreteClass();
    concreteClassInstance.create({});
    expect(concreteClassInstance._validateRequiredFields).toHaveBeenCalled();
    expect(concreteClassInstance._create).toHaveBeenCalled();
  });
});
