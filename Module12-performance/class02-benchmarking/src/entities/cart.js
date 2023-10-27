import { v4 as uuid } from "uuid";
import Product from "./product.js";

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid();
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice();
  }

  removeUndefinedProps(products) {
    const result = [];
    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;
      let newObj = {};
      keys.forEach((key) => {
        if (!keys[key]) return;
        newObj[key] = keys[key];
      });
      result.push(new Product(product));
    }
    return result;
  }

  getCartPrice() {
    return this.products.reduce((acc, { price }) => acc + price, 0);
  }
}
