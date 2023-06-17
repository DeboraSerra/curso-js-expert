import chalk from "chalk";
import chalkTable from "chalk-table";
import DraftLog from "draftlog";
import readline from "readline";

import database from "../database.json";
import Person from "./person.js";

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.green("Km Traveled") },
    { field: "from", name: chalk.green("From") },
    { field: "to", name: chalk.green("To") },
  ],
};

const table = chalkTable(options, database.map(item => new Person(item).formatted()));
console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question("Qual é o seu nome? ", (msg) => {
  console.log({ msg });
});
