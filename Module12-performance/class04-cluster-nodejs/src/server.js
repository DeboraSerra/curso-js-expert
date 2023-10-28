import { appendFile, readFile, readdir } from "fs/promises";
import { createServer } from "http";

export function initializeServer() {
  async function handler(req, res) {
    await appendFile("log.txt", `processed by ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, (_) =>
      Math.floor(Math.random() * 40)
    ).reduce((acc, curr) => acc + curr, 0);

    res.end(result.toString());
  }

  createServer(handler).listen(3000, async () => {
    const files = await readdir(".");
    if (!files.includes("processes.txt")) {
      await appendFile("processes.txt", "");
    }
    const data = await readFile("processes.txt", "utf-8");
    if (!data.split("\n").includes(process.pid)) {
      await appendFile("processes.txt", process.pid + "\n");
    }
    console.log(
      "Server running at http://localhost:3000/ and process: ",
      process.pid
    );
  });
  setTimeout(() => process.exit(1), Math.random() * 1e4)
}
