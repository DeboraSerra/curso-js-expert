export default class Product {
  constructor({ description, name, price, activePromoId }) {
    this.description = description;
    this.name = name;
    this.price = price;
    this.activePromoId = activePromoId ?? 0;
  }
}
