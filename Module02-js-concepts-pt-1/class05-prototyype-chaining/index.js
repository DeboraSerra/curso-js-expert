const assert = require('assert')

const obj = {}
const arr = []
const fn = () => {}

// internally, literal objects convert to explicit functions
// console.log('new Object', new Object().__proto__ === obj.__proto__)
// __proto__ is the reference of the object that has its properties
assert.deepStrictEqual(new Object().__proto__, obj.__proto__)
assert.deepStrictEqual(obj.__proto__, Object.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

function Employee() {}

Employee.prototype.salary = () => "salary**"

console.log(Employee.prototype.salary())

function Supervisor () {}

Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

console.log(Supervisor.prototype.salary())

function Manager() {}

Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonus = () => "monthlyBonus**"

console.log(Manager.prototype.monthlyBonus())