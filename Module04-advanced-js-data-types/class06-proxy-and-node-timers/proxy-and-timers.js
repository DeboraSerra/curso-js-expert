"use strict";
const Event = require("events");

const event = new Event();
const eventName = "counter";
event.on(eventName, (msg) => console.log("counter updated", msg));

const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (obj, prop) => {
    // console.log("Chamou", { obj, prop });
    return obj[prop];
  },
});

setInterval(function () {
  proxy.counter += 1;
  if (proxy.counter === 10) clearInterval(this);
  console.log('4º - setInterval')
}, 200);

// executa agora, mas acaba com o ciclo de vida do node (má prática)
// é sempre o primeiro a ser executado
process.nextTick(() => {
  proxy.counter = 2
  console.log('1º - nextTick')
})

// se quer que execute agora, usar setImmediate, e não setTimeout com 0ms
setTimeout(() => {
  proxy.counter = 4
  console.log('3º - setTimeout')
}, 100)

setImmediate(() => {
  console.log('2º - setImmediate')
})