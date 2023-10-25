import http from "http";
import BusinessError from "./errors/businessError.js";
import { statusCodes } from "./util/httpStatusCodes.js";

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError('Hero must be older than 20 years old')
  }
  if (hero.name?.length < 4) {
    throw new BusinessError('Hero name must be longer than 4 characters')
  }
  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('Connection error')
  }
}

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      console.log({ hero });
      res.writeHead(statusCodes.OK);
    } catch (e) {
      if (e instanceof BusinessError) {
        res.writeHead(statusCodes.BAD_REQUEST)
        res.write(e.message)
        continue;
      }
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
