'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.readFile(filename)
  }

  async readFile(filename) {
    return await readFile(filename)
  }
}

const file = new File()
// dessa forma ele ignora o 'this' da classe File e herda o this do watch
// watch(__filename, file.watch)

// alternativas para não herdar o this do watch
// 1º passar como callback (mas é feio)
// watch(__filename, (event, filename) => file.watch(event, filename))

// 2º usar o bind para deixar explícito qual o contexto que a função deve seguir
// o bind retorna uma função o this que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

file.watch.call({ readFile: () => 'Hello world' }, null, __filename)
file.watch.apply({ readFile: () => 'Hello world' }, [null, __filename])
