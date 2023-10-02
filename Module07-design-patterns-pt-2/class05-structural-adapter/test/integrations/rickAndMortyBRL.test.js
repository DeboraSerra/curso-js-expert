import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";

import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import Character from "../../src/entities/character.js";

describe("#BRLRickAndMorty", () => {
  it("#getCharactersJSON should return a list of characters", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json")
    );
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const expected = response.results.map(
      (character) => new Character(character)
    );
    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toEqual(expected);
  });
  it("#getCharactersJSON should return an empty list of characters if the API returns nothing", async () => {
    const expected = JSON.parse(
      await fs.readFile("./test/mocks/emptyCharacters.json")
    );
    jest.spyOn(axios, "get").mockResolvedValue({ data: expected });
    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toEqual([]);
  });
});
