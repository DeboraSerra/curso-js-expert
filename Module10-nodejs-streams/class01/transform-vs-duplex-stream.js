import { Duplex, Transform } from "stream";
let count = 0;

const server = new Duplex({
  objectMode: true, // make your stream accept objects instead of buffers, but uses more memory
  encoding: "utf-8",
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`Hello World ${count}\n`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(() => everySecond(this));
  },

  write(chunk, encoding, cb) {
    console.log(`[writable] saving`, chunk);
    cb();
  },
});

// just writable
// server.write('hi')

// just readable
// server.on("data", (chunk) => {
//   console.log('data', chunk)
// })

// add a new readable
// server.push("[duplex] hey this is a duplex stream\n");

// readable stream redirect to console
// server.pipe(process.stdout);

const transformToUppercase = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
})

//transform is also a duplex, but does not have independent comunications
transformToUppercase.write('[transform] Hello from write!')

// the push ignores what you have in the transform function
transformToUppercase.push('[transform] Hello from push!\n')

// readable stream redirect to writable stream
server.pipe(transformToUppercase).pipe(server)