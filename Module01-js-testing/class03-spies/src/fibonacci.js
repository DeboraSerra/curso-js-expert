class Fibonacci {
  * execute(input, curr = 0, next = 1) {
    if (input === 0) {
      return;
    }
    // retorna o valor
    yield curr
    // delega a execução, mas não retorna o valor
    yield * this.execute(input - 1, next, curr + next)
  }
}

module.exports = Fibonacci;
