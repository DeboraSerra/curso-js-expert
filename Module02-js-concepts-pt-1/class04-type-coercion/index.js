console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');

console.assert(('hello' || 123) === 'hello', 'returns the first if both are true')
console.assert(('hello' && 123) === 123, 'returns the last if both are true')

const item = {
  name: 'Debs Serra',
  age: 30,
}

console.log('item', item + 0)

const item2 = {
  name: 'Debs Serra',
  age: 30,
  toString() {
    return `name: ${this.name}, age: ${this.age}`
  }
}

console.log('item2', item2 + 0)

const item3 = {
  name: 'Debs Serra',
  age: 30,
  toString() {
    return `name: ${this.name}, age: ${this.age}`
  },
  valueOf() {
    return 2
  }
}

console.log('item3', item3 + 0)

const item4 = {
  name: 'Debs Serra',
  age: 30,
  toString() {
    return `name: ${this.name}, age: ${this.age}`
  },
  valueOf() {
    return 2
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to converto to ', coercionType)
    if (coercionType === 'string') return this.toString()
    if (coercionType === 'number') return this.valueOf()
  }
}

console.log('item4', Number(item4))
console.log('item4', String(item4)) 