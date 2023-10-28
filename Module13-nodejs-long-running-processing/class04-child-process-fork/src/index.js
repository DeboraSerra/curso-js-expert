import { fork } from "child_process";
import csvtojson from "csvtojson";
import { createReadStream } from "fs";
import { Writable } from "stream";
import { pipeline } from "stream/promises";

const database = "./data/All_Pokemon.csv";
const PROCESS_COUNT = 100;
const replications = []

const backgroundTaskFile = "./src/backgroundTask.js";

const processes = new Map();

for (let index = 0; index < PROCESS_COUNT; index += 1) {
  const child = fork(backgroundTaskFile, [database]);
  child
    .on("exit", () => {
      console.log(`child ${child.pid} exited`);
      processes.delete(child.pid);
    })
    .on("error", () => {
      console.log(`child process ${child.pid} has an error`);
      process.exit(1);
    })
    .on("message", (message) => {
      //workaround for multiprocessing
      if (replications.includes(message)) return;
      console.log(`${message} is replicated`);
      replications.push(message);
    });
  processes.set(child.pid, child);
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.length) index = 0;
    return array[index++];
  };
}

// connection pool or load balancer
const getProcess = roundRobin([...processes.values()]);
// for (let index = 0; index < 100; index += 1) {
//   console.count(getProcess().pid);
// }
console.log(`starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, enc, cb) {
      const chosenProcess = getProcess();
      chosenProcess.send(JSON.parse(chunk));
      cb();
    },
  })
);
