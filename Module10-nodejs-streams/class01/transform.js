import { createWriteStream } from "fs";
import { Readable, Transform, Writable } from "stream";

// fonte de dados
const readableStream = new Readable({
  read() {
    for (let i = 0; i < 1e5; i += 1) {
      const person = {
        id: Date.now() + i,
        name: `Xuxa da Silva-${i}`,
      };
      const data = JSON.stringify(person);
      this.push(data);
    }

    // informa que os dados acabaram
    this.push(null);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) return cb(null, chunk);
    this.counter += 1;
    cb(null, "id,name\n".concat(chunk));
  },
});

const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const { id, name } = data;
    const result = `${id},${name.toUpperCase()}\n`;
    cb(null, result);
  },
});

// saída de dados

const writableStream = new Writable({
  // writable é sempre a saída -> imprimir, salvar, ignorar
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  },
});

const pipeline = readableStream
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => console.log("finished"));
