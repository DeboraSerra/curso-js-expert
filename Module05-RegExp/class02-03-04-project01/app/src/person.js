const { evaluateRegex } = require("./util");

class Person {
  constructor([
    name,
    nacionalidade,
    estadoCivil,
    cpf,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    const firstLetter = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/);
    const removeNonNumbers = evaluateRegex(/\D/g);

    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetter,
        (_, first, rest) => `${first.toUpperCase()}${rest.toLowerCase()}`
      );
    };

    const findWordsStartingInUpperCase = (prop) => {
      const findUpperCase = evaluateRegex(/(?<=\s)[A-Z].*$/g);
      return prop.match(findUpperCase)[0];
    };

    this.name = name;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.cpf = cpf.replace(removeNonNumbers, "");
    this.rua = findWordsStartingInUpperCase(rua);
    this.numero = numero;
    this.bairro = findWordsStartingInUpperCase(bairro);
    this.estado = estado.replace(/\./, "");
  }
}

module.exports = Person;
