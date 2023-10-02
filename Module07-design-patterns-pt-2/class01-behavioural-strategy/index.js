import ContextStrategy from "./src/base/contextStrategy.js";
import MongoStrategy from "./src/strategies/mongoStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStartegy.js";

const mongoConnectionString = "mongodb://admin:admin@localhost:27017/heroes";
const mongoContext = new ContextStrategy(
  new MongoStrategy(mongoConnectionString)
);
const result = await mongoContext.connect();

const postgresConnectionString =
  "postgres://postgres:postgres@localhost:5432/heroes";
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

// o transaction vai no postgres e o activityLog vai no mongoDB

const data = [
  {
    name: "John",
    type: "transaction",
  },
  {
    name: "Jane",
    type: "activityLog",
  },
];

// await postgresContext.create({ name: data[0].name });
// console.log(await postgresContext.read());

// await mongoContext.create({ name: data[1].name });
// console.log(await mongoContext.read());

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });
  console.log(await context.read());
}
