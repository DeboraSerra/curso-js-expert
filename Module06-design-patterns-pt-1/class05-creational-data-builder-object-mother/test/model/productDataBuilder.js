const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // o default são os dados corretos
    // os casos de sucesso!
    this.productData = {
      id: "0001",
      name: "Computer",
      price: 1000,
      category: "electronic",
    };
  }

  static aProduct() {
    return new ProductDataBuilder();
  }

  withInvalidId() {
    this.productData.id = "1";
    return this;
  }

  withInvalidName() {
    this.productData.name = "1";
    return this;
  }

  withInvalidPrice() {
    this.productData.price = -1;
    return this;
  }

  withInvalidCategory() {
    this.productData.category = "invalid";
    return this;
  }

  build() {
    const product = new Product(this.productData);
    return product;
  }
}

module.exports = ProductDataBuilder;
