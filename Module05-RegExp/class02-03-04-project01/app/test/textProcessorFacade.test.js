const { describe, it } = require("mocha");
const { expect } = require("chai");
const mock = require("./mock/valid");
const TextProcessorFacade = require("../src/textProcessorFacade");

describe("TextProcessorFacade test suite", () => {
  it('should return a list of people from a valid pdf content', () => {
    const result = new TextProcessorFacade(mock).getPeopleFromPDF()
    const expected = [
      {
        name: 'Xuxa da Silva',
        nacionalidade: 'Brasileira',
        estadoCivil: 'Casada',
        cpf: '23574342012',
        rua: 'Rua dos bobos',
        numero: 'zero',
        bairro: 'Alphaville',
        estado: 'São Paulo'
      },
      {
        name: 'Arya Robbin',
        nacionalidade: 'Belga',
        estadoCivil: 'Casado',
        cpf: '88411220052',
        rua: 'Av. paulista',
        numero: '1400',
        bairro: 'Consolação',
        estado: 'São Paulo'
      },
      {
        name: 'Júlia Menezes',
        nacionalidade: 'Brasileira',
        estadoCivil: 'Solteira',
        cpf: '29794780081',
        rua: 'Av. dos Estados',
        numero: '99',
        bairro: 'Jardins',
        estado: 'São Paulo'
      }
    ]
    expect(result).to.be.deep.equal(expected)
  })
})