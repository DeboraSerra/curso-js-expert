import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 1,
  amount: 150,
  products: [
    { description: "Produto 1", price: 100 },
    { description: "Produto 2", price: 50 },
  ],
});

const orderBusiness = new OrderBusiness();
const result = orderBusiness.create(order);
console.log(result);
