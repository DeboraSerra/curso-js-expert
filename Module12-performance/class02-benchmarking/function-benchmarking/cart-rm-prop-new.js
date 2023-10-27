import Product from "../src/entities/product.js";

export default class Cart {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products);
  }

  removeUndefinedProps(products) {
    const result = [];
    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (!keys.length) continue;
      // 2a
      // keys.forEach((key) => product[key] || Reflect.deleteProperty(product, key));
      // keys.forEach((key) => product[key] || delete product[key]);
      // result.push(new Product(product));

      // 1a
      // result.push(JSON.parse(JSON.stringify(new Product(product))));

      // 3a
      let newObj = {}
      keys.forEach((key) => {
        if (!product[key]) return;
        newObj[key] = product[key]
      });
      result.push(new Product(newObj));
    }
    return result;
  }
}
