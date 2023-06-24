const assert = require("assert");

// * * * * * keys * * * * *
const uniqueKey = Symbol("userName");
const user = {};

user["userName"] = "value for normal Objects";
user[uniqueKey] = "value for Symbol";

// console.log('normal Object', user.userName)
// // sempre único em nível de endereço de memória
// // para funcionar tem que usar a variável (que usa o mesmo endereço de memória da chave criada)
// console.log('Symbol', user[Symbol('userName')])
// console.log('Symbol', user[uniqueKey])

assert.deepStrictEqual(user.userName, "value for normal Objects");
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], "value for Symbol");

// é difícil de pegar, mas não é secreto!
// console.log('symbols', Object.getOwnPropertySymbols(user))
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (não tem no codebase do node)
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

// * * * * * Well Known Symbols * * * * *
const obj = {
  [Symbol.iterator]: () => ({
    items: ["c", "b", "a"],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log({ item })
// }

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItems = Symbol("kItems");
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((it) => new Date(...it));
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();
    const itens = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );
    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(itens);
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}

const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);
const expectedDates = [new Date(2020, 3, 1), new Date(2018, 2, 2)];

// console.log(myDate[kItems])

assert.deepStrictEqual(myDate[kItems], expectedDates);
assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHAT?]"
);
assert.throws(() => myDate + 1, TypeError);
assert.deepStrictEqual(
  String(myDate),
  "01 de abril de 2020 e 02 de março de 2018"
);
assert.deepStrictEqual([...myDate], expectedDates);

// ;(async () => {
//   for await (const item of myDate) {
//     console.log(item)
//   }
// })()
(async () => {
  const dates = [];
  for await (const item of myDate) {
    dates.push(item);
  }
  const expectedDatesISO = expectedDates.map((date) => date.toISOString());
  assert.deepStrictEqual(dates, expectedDatesISO);
})();
