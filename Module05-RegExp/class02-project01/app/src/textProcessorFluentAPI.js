// o objetivo do fluent API é executar tarefas
// como um pipeline, step by step e no fim, chama o build
// MUITO similar ao padrão de projeto Builder
// a diferença é que aqui é sobre processos e não sobre objetos
class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    console.log({ content })
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
}

module.exports = TextProcessorFluentAPI;
