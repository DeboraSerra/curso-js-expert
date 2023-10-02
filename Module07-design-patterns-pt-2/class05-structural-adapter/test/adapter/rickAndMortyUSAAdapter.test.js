import { describe, expect, it, jest } from "@jest/globals";

import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapter.js";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";

describe("#USARickAndMortyAdapter", () => {
  it("#getCharacters should be an adapter for RickAndMorty.getCharactersXML", async () => {
    const USAIntegration = jest
      .spyOn(RickAndMortyUSA, "getCharactersFromXML")
      .mockResolvedValue([]);
    await RickAndMortyUSAAdapter.getCharacters();
    expect(USAIntegration).toHaveBeenCalled();
  });
});
