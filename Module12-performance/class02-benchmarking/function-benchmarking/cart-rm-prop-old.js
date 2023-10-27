import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));
    // remove undefined props, but isn't the best practice
    return JSON.parse(JSON.stringify(productsEntities));
  }

}
