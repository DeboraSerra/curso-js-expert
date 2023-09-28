"use strict";
const assert = require("assert");
// garantir semântica e segurança em objetos

// ----- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

//pode acontecer (raro)
// substituir o comportamento padrão da função
// Function.prototype.apply = () => throw new TypeError('Eita')

// esse pode acontecer de forma mais comum
myObj.add.apply = function () {
  throw new TypeError("Eita");
};
assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Eita",
});

// usando reflect

const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 230);

// ---------- defineProperty
function MyDate() {}

Object.defineProperty(MyDate, "withObject", { value: () => "Hey there!" });

Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude!" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there!");
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude!");

// ---------- deleteProperty
const widthDelete = { user: "ErickWendel" };
//imperformático, evitar ao máximo
delete widthDelete.user;

assert.deepStrictEqual(widthDelete.hasOwnProperty("user"), false);

const withReflect = { user: "DebsSerra" };
Reflect.deleteProperty(withReflect, "user");

assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false);

// ----------- get

// Deveríamos fazer um get somente em instâncias de referência
assert.deepStrictEqual((1)["username"], undefined);
//com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, "userName"), TypeError);

// ------------- has
assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// --------- ownKeys
const user = Symbol("user");
const databaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "debs",
};

// Com os métodos de object, temos que fazer 2 requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];

// console.log(objectKeys)

assert.deepEqual(objectKeys, ["id", Symbol.for("password"), user]);

// com reflect, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ["id", Symbol.for("password"), user])