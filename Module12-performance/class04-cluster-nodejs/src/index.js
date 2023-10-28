import cluster from "cluster";
import os from "os";
import { initializeServer } from "./server.js";
import { appendFile } from "fs/promises";

(async () => {
  // if the process isn't the main, the orchestration can create new copies of the process
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }
  const cpusNumber = os.cpus().length;

  console.log(`Primary ${process.pid} is running\n`);
  console.log(`Forking server for ${cpusNumber} CPUs\n`);

  for (let index = 0; index < cpusNumber; index += 1) {
    cluster.fork();
  }

  // better used to server on premise, not managed by container managers such as Kubernetes
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed. ` +
                  'Starting a new worker...');
      cluster.fork();
    }
  })
})();
