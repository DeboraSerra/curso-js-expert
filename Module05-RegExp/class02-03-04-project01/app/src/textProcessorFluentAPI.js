// o objetivo do fluent API é executar tarefas
// como um pipeline, step by step e no fim, chama o build
// MUITO similar ao padrão de projeto Builder

const Person = require("./person");
const { evaluateRegex } = require("./util");

// a diferença é que aqui é sobre processos e não sobre objetos
class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= -> lookbehind (busca tudo o que vem depois dessa expressão)
    // ?= -> lookahead (busca tudo o que vem antes dessa expressão)
    // (?!\s{1}) -> negative lookahead (não pode ter um espaço em branco)
    // .* -> qualquer coisa
    // \n -> quebra de linha
    // ? -> opcional
    // gmi -> flags: global, multiline, case insensitive
    // .*? -> lazy mode (pega o mínimo possível de caracteres)
    const regex = /(?<=[contratante|contratada]:\s)(?!\s{1})(.*\n.*?)$/gmi;
    this.#content = this.#content.match(regex);
    return this;
  }

  build() {
    return this.#content;
  }

  divideTextInColumns() {
    const regex = evaluateRegex(/,/gmi);
    this.#content = this.#content.map(line => line.split(regex));
    return this;
  }

  removeEmptyCharacters() {
    const regex = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map(line => line.map(item => item.replace(regex, "")));
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line));
    return this
  }
}

module.exports = TextProcessorFluentAPI;
