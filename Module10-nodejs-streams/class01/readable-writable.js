import { Readable, Writable } from 'stream';

// fonte de dados
const readableStream = new Readable({
  read() {
    this.push('Hello World 1!')
    this.push('Hello World 2!')
    this.push('Hello World 3!')

    // informa que os dados acabaram
    this.push(null)
  }
})

// saída de dados

const writableStream = new Writable({
  // writable é sempre a saída -> imprimir, salvar, ignorar
  write(chunk, encoding, cb) {
    console.log(chunk.toString())
    cb();
  }
})

readableStream.pipe(writableStream)