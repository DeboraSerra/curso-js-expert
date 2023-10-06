#!/usr/bin/env node
import yargs from "yargs";

import { hideBin } from "yargs/helpers";

const hero = ({ name, power, age }) => ({ name, power, age, id: Date.now() });
const { argv } = yargs(hideBin(process.argv)).command(
  "createHero",
  "Create a new hero",
  (builder) => {
    return builder
      .option("name", {
        alias: "n",
        describe: "Hero name",
        demandOption: true,
        type: 'string',
      })
      .option("power", {
        alias: "p",
        describe: "Hero power",
        demandOption: true,
        type: 'string',
      })
      .option("age", {
        alias: "a",
        describe: "Hero age",
        demandOption: true,
        type: 'number',
      })
      .example('createHero --name "Batman" --power "Money" --age 30', 'Create a new hero')
      .example('createHero -n "Batman" -p "Money" -a 30', 'Create a new hero');
  }
);

console.log(hero(argv));
