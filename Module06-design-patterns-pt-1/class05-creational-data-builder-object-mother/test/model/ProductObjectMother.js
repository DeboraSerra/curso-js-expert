const ProductDataBuilder = require("./productDataBuilder");

class ProductObjectMother {
  static valid() {
    return ProductDataBuilder.aProduct().build();
  }

  static invalidId() {
    return ProductDataBuilder.aProduct().withInvalidId().build();
  }

  static invalidName() {
    return ProductDataBuilder.aProduct().withInvalidName().build();
  }

  static invalidPrice() {
    return ProductDataBuilder.aProduct().withInvalidPrice().build();
  }

  static invalidCategory() {
    return ProductDataBuilder.aProduct().withInvalidCategory().build();
  }

  static allInvalid() {
    return ProductDataBuilder.aProduct()
      .withInvalidId()
      .withInvalidName()
      .withInvalidPrice()
      .withInvalidCategory()
      .build();
  }
}

module.exports = ProductObjectMother;
