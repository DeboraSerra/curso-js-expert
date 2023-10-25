import http from "http";
import HeroEntity from "./heroEntity.js";
import { statusCodes } from "./util/httpStatusCodes.js";

async function handler(req, res) {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data);
      if (Reflect.has(parsedData, "connectionError")) {
        throw new Error("DB Connection error");
      }
      const hero = new HeroEntity(parsedData);
      if (!hero.isValid()) {
        res.writeHead(statusCodes.BAD_REQUEST);
        res.write(JSON.stringify(hero.notifications.join("\n")));
        continue;
      }
      console.log({ hero });
      res.writeHead(statusCodes.OK);
    } catch (e) {
      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
    } finally {
      res.end();
    }
  }
}

const server = http.createServer(handler);
server.listen(3000, () =>
  console.log("Server is running on port 3000", process.pid)
);
