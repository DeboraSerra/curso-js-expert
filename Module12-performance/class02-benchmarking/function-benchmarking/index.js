import Benchmark from "benchmark";
// import CartRmNew from "./cart-rm-prop-new.js";
// import CartRmOld from "./cart-rm-prop-old.js";
// import CartIdNew from "./cart-id-new.js";
// import CartIdOld from "./cart-id-old.js";
import CartPriceNew from "./cart-price-new.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceFor from "./cart-price-for.js";

const suite = new Benchmark.Suite();

// suite
//   .add("Cart#cardIdUUID", function () {
//     new CartIdOld();
//   })
//   .add("Cart#cardIdCrypto", function () {
//     new CartIdNew();
//   })
//   .on("cycle", (e) => console.log(String(e.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run();

const products = [
  {
    description: "aliqua ipsum nostrud incididunt",
    name: "laborum",
    price: 726.36,
    tmpProperty: undefined,
    activePromoId: 41,
  },
  {
    description: "amet veniam ea reprehenderit",
    name: "ex",
    price: 208.07,
    tmpProperty: undefined,
    activePromoId: null,
  },
  {},
  {},
];

// suite
//   .add("Cart#removeUndefinedPropsMap", function () {
//     new CartRmOld({
//       products,
//     });
//   })
//   .add("Cart#removeUndefinedPropsForOf", function () {
//     new CartRmNew({
//       products,
//     });
//   })
//   .on("cycle", (e) => console.log(String(e.target)))
//   .on("complete", function () {
//     console.log(`Fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

suite
  .add("Cart#getCartPriceMapReduce", function () {
    new CartPriceOld({
      products,
    });
  })
  .add("Cart#getCartPriceReduce", function () {
    new CartPriceNew({
      products,
    });
  })
  .add("Cart#getCartPriceForOf", function () {
    new CartPriceFor({
      products,
    });
  })
  .on("cycle", (e) => console.log(String(e.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });