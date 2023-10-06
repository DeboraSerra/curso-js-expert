$.verbose = false;

import isSafe from "safe-regex";
import { setTimeout } from "timers/promises";

await $`docker run -p "8080:80" -d nginx`;

await setTimeout(500);

const req = await $`curl -s localhost:8080`;

console.log({ req: req.stdout });

const containers = await $`docker ps`;

const containerIdExp = /(?<containerId>\w+)\W+(?=nginx)/;
if (!isSafe(containerIdExp)) throw new Error("Unsafe regex");

const { groups:{ containerId } } = containers.toString().match(containerIdExp);

const logs = await $`docker logs ${containerId}`;
console.log({ logs: logs.stdout });

const rm = await $`docker rm -f ${containerId}`;
console.log({ rm: rm.stdout });