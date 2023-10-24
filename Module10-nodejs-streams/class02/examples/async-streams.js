import { pipeline } from "stream/promises";
import { setTimeout } from "timers/promises";

async function* myCustomReadable() {
  yield Buffer.from("This is my");
  await setTimeout(100);
  yield Buffer.from(" custom readable");
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log("[writable]", chunk);
  }
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_");
  }
}

async function* myCustomDuplex(stream) {
  let bytes = 0;
  const wholeString = [];
  for await (const chunk of stream) {
    console.log("[duplex writable]", chunk);
    bytes += chunk.length;
    wholeString.push(chunk);
  }
  yield `wholeString: ${wholeString.join("")}`;
  yield `bytes: ${bytes}`;
}

try {
  const controller = new AbortController();

  // case it is needed to cancel the pipeline
  // you can call controller.abort()
  setImmediate(() => controller.abort());

  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    {
      signal: controller.signal,
    }
  );

  console.log("done");
} catch (e) {
  console.error(e.name, e.message);
}
