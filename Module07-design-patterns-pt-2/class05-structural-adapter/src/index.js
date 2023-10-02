import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map(
  async (adapter) => adapter.getCharacters()
);

const all = await Promise.allSettled(data);

const success = all
  .filter((item) => item.status === "fulfilled")
  .map(({ value }) => value)
  .reduce((acc, curr) => acc.concat(curr), []);

console.table(success);

const errors = all
  .filter((item) => item.status === "rejected")
  .map(({ reason }) => reason);

console.table(errors);
