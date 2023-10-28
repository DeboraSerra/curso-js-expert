import { createServer } from "http";
import { dirname } from "path";
import { fileURLToPath, parse } from "url";
import { Worker } from "worker_threads";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );
      }
      console.log(`The thread ${worker.threadId} exited`);
    });
  });
}

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const handler = async (req, res) => {
  if (req.url.includes("joinImages")) {
    const {
      query: { img, background },
    } = parse(req.url, true);
    const response = await joinImages({ img, background });
    res.writeHead(200, { "content-type": "text/html" });

    res.end(
      `<img style="max-width: 100%; aspect-ratio: 3/1," src="data:image/jpeg;base64,${response}" />`
    );
    return;
  }

  return res.end("ok");
};

createServer(handler).listen(3000, () => {
  console.log("Server listening on port 3000");
});
