import { describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";

import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";

describe("#USARickAndMorty", () => {
  it("#getCharactersXML should return a list of characters", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const expected = [
      {
        gender: "Male",
        id: 10,
        location: "Worldender's lair",
        name: "Alan Rails",
        origin: "unknown",
        species: "Human",
        status: "Dead",
        type: "Superhuman (Ghost trains summoner)",
      },
    ];
    const result = await RickAndMortyUSA.getCharactersFromXML();
    expect(result).toMatchObject(expected);
  });
  it("#getCharactersXML should return an empty list of characters if the API returns nothing", async () => {
    const expected = await fs.readFile("./test/mocks/emptyCharacters.xml");
    jest.spyOn(axios, "get").mockResolvedValue({ data: expected });
    const result = await RickAndMortyUSA.getCharactersFromXML();
    expect(result).toEqual([]);
  });
});
