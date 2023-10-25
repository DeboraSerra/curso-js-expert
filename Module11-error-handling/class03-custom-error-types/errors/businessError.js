import BaseError from "./baseError.js";

export default class BusinessError extends BaseError {
  constructor(message) {
    super({ name: "BusinessError", message })
  }
}