import chai from "chai";
import mocha from "mocha";
import Person from "../src/person.js";
const { describe, it } = mocha;
const { expect } = chai;

describe("Test the person class", () => {
  it("should return a person instance from a string", () => {
    const text = "2 Bike,Carro 10000 2020-10-22 2023-08-02";
    const expected = {
      id: "2",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "10000",
      from: "2020-10-22",
      to: "2023-08-02",
    };
    const response = Person.generateInstanceFromString(text);
    expect(response).to.be.deep.equal(expected);
  });
  it('should format values', () => {
    const person = new Person({
      id: "2",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "10000",
      from: "2020-10-22",
      to: "2023-08-02",
    });
    const expected = {
      id: 2,
      vehicles: "Bike e Carro",
      kmTraveled: "10.000 km",
      from: "22 de outubro de 2020",
      to: "02 de agosto de 2023",
    };
    expect(person.formatted('pt-BR')).to.be.deep.equal(expected)
  })
});
