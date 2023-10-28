import { readFile } from "fs/promises";

(async () => {
  const processes = (await readFile("processes.txt", "utf-8")).split("\n");
  const logs = (await readFile("log.txt", "utf-8")).split("\n");
  const newObj = {}
  processes.forEach((process) => {
    const processLogs = logs.filter((log) => log.includes(process));
    newObj[process] = processLogs.length;
  });
  newObj["total"] = logs.length;
  console.log(newObj);
})();
