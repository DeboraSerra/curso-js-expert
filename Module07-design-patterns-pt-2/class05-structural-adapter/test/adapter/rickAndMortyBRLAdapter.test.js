import { describe, expect, it, jest } from "@jest/globals";

import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";

describe("#BRLRickAndMortyAdapter", () => {
  it("#getCharacters should be an adapter for RickAndMorty.getCharactersJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, "getCharactersFromJSON")
      .mockResolvedValue([]);
    await RickAndMortyBRLAdapter.getCharacters();
    expect(brlIntegration).toHaveBeenCalled();
  });
});
