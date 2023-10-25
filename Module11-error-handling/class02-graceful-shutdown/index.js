import { createServer } from "http";
import { MongoClient } from "mongodb";
import { promisify } from "util";

const defaultHeroes = [
  {
    name: "Superman",
    power: "flight",
  },
  {
    name: "Batman",
    power: "rich",
  },
  {
    name: "Wonder Woman",
    power: "lasso of truth",
  },
  {
    name: "Flash",
    power: "speed",
  },
  {
    name: 'Super girl',
    power: 'fly',
  },
  {
    name: 'Green Lantern',
    power: 'ring',
  },
  {
    name: 'Aquaman',
    power: 'water',
  },
  {
    name: 'Wolverine',
    power: 'claws',
  }
];

async function dbConnect() {
  const client = new MongoClient("mongodb://admin:admin@localhost:27017");
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db("comics");
  return {
    collections: {
      heroes: db.collection("heroes"),
    },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });
      const heroes = await collections.heroes.find().toArray();
      res.writeHead(200);
      res.write(JSON.stringify(heroes));
    } catch (e) {
      console.log("A request error has happened".error);
      res.writeHead(500);
      res.write(JSON.stringify({ message: "Internal Server Error" }));
    } finally {
      res.end();
    }
  }
}

// await client.close();

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Wonder Woman", "power": "Lasso of truth"}' -H "Content-Type: application/json"
 */
const server = createServer(handler).listen(3000, () =>
  console.log("Server is running at http://localhost:3000", process.pid)
);

// SIGINT -> manipulate ctrl + C
// SIGTERM -> manipulate kill command
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async (signal) => {
    console.info(`\n${signal} signal received!`);
    console.log("Closing http server.");
    await promisify(server.close(server))();
    console.log("Http server closed.");
    console.log("Closing mongodb connection.");
    await client.close();
    console.log("Mongodb connection closed.");
    process.exit(0);
  });
})
