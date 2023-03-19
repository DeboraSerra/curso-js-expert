const Fibonacci = require("./fibonacci");
const { createSandbox } = require('sinon')
const sinon = createSandbox();
const assert = require('assert');

;(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    for (const sequency of fibonacci.execute(3)) {}
    assert.strictEqual(spy.callCount, 4)
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const results = [...fibonacci.execute(5)]
    assert.strictEqual(spy.callCount, 6)
    const { args } = spy.getCall(2)
    const expectedArgs = [3, 1, 2]
    assert.deepStrictEqual(args, expectedArgs, "The arrays are different!")
    const expectedResult = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResult)
  }
})()