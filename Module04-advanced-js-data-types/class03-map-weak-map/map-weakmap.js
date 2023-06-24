const assert = require("assert");

const myMap = new Map();

myMap
  .set(1, "one")
  .set("Erick", { text: "two" })
  .set(true, () => "Hello");

const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "boolean"],
]);

// console.log(myMap);
// console.log(myMapWithConstructor);
// console.log(myMapWithConstructor.get(true));
// console.log(myMap.get(true));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Erick").text, "two");
assert.deepStrictEqual(myMap.get(true)(), "Hello");

assert.deepStrictEqual(myMapWithConstructor.get(1), "num1");
assert.deepStrictEqual(myMapWithConstructor.get("1"), "str1");
assert.deepStrictEqual(myMapWithConstructor.get(true), "boolean");

const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: "ErickWendel" });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "ErickWendel" });

// * * * * * utilitários * * * * *

// No Object seria Object.keys().length
// No map tem .size()

assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe
// Object: item.key !== undefined ou object.hasOwnProperty(key)
// Map: .has()

assert.deepStrictEqual(myMap.has(onlyReferenceWorks), true);

// para remover um item
// Object: delete item.key
// Map: .delete()

assert.ok(myMap.delete(onlyReferenceWorks));

// Não dá pra iterar Object diretamente (só usando Object.values(), Object.keys() ou Object.entries())
// o Map implementa o padrão do generator

assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  '[[1,"one"],["Erick",{"text":"two"}],[true,null]]'
);

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }

// o Object é inseguro, pois dependendo do nome da chave, o usuário pode substituir algum comportamento padrão
// ({}).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir com propriedades herdadas do objeto, como constructor, toString, valueOf...

const actor = {
  name: 'Xuxa da Silva',
  toString: () => 'Queen: Xuxa da Silva'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não da pra limpar um Object sem reassiná-lo
myMap.clear()

// console.log(myMap)
assert.deepStrictEqual([...myMap.keys()], [])

// * * * * * WeakMap * * * * *
// Pode ser coletado após perderem a referência
// usado em casos bem específicos

// tem a maioria dos benefícios do map, mas não é iterável e só pode possuir chaves de referência e que você já conheça
// mais leve e prevê leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.has(hero)
weakMap.get(hero)
weakMap.delete(hero)
