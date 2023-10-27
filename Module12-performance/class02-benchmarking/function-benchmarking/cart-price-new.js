export default class Cart {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice();
  }

  getCartPrice() {
    return this.products
      .reduce((acc, { price }) => acc + price, 0);
    // const total = 0
    // for (const product of this.products) {
    //   total += product.price
    // }
    // return total
  }
}
