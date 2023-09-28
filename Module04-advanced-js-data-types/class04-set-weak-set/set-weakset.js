const assert = require("assert");

// usado na maioria das vezes para listas de itens únicos
const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((it) => set.add(it));
arr2.map((it) => set.add(it));

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

// console.log(set.keys())
// console.log(set.values()) -> só existem por conta do Map

// no Array comum para saber se um item existe
// [].indexOf('1') !== -1 ou [].includes('1')
assert.ok(set.has("3"));

// mesma teoria do Map, mas você sempre trabalha com a lista completa
// não tem get, então você pode saber se o item está ou não no array
// na documentação tem exemplos sobre como fazer uma interseção, sobre
// o que tem em uma lista e n]ao tem na outra e assim por diante

// tem nos dois arrays
const user01 = new Set(["erick", "maria", "xuxa"]);
const user02 = new Set(["joão", "erick", "julio"]);

const intersection = new Set([...user01].filter((user) => user02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ["erick"]);

const difference = new Set([...user01].filter((user) => !user02.has(user)));
assert.deepStrictEqual(Array.from(difference), ["maria", "xuxa"]);

// weakSet
// mesma ideia do weakMap
// não é iterável
// só trabalha com chaves como referência
// só tem métodos simples
const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
// console.log('weakSet.has(user)', weakSet.has(user))
// console.log('weakSet.has(user2)', weakSet.has(user2))
// weakSet.add(user2)
// console.log('weakSet.has(user2)', weakSet.has(user2))
// weakSet.delete(user)
// console.log('weakSet.has(user)', weakSet.has(user))
