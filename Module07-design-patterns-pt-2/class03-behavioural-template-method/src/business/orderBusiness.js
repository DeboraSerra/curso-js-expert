import BaseBusiness from "./base/baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
  #order = new Set();

  _validateRequiredFields(order) {
    return !!order.amount && !!order.products.length;
  }

  _create(order) {
    this.#order.add(order);
    return this.#order
  }
}
