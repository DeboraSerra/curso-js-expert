import csvtojson from "csvtojson";
import { createReadStream } from "fs";
import { Transform, Writable } from "stream";
import { pipeline } from "stream/promises";
import { setTimeout } from "timers/promises";

const database = process.argv[2];

async function onMessage(msg) {
  const firstTimeRun = [];
  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, enc, cb) {
        const data = JSON.parse(chunk);
        if (data.Name !== msg.Name) return cb();
        if (firstTimeRun.includes(msg.Name)) return cb(null, data.Name);
        firstTimeRun.push(data.Name);
        cb();
      },
    }),
    Writable({
      write(chunk, enc, cb) {
        if (!chunk) return cb();
        process.send(chunk.toString());
        cb();
      },
    })
  );
}

process.on("message", onMessage);

// console.log(`I am ready! ${process.pid} ${database}`);

// to finish the process after inactivity
await setTimeout(15000);
process.channel.unref();
