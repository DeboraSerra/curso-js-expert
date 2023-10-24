import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import fs from "fs";
import fsPromises from "fs/promises";
import { createLayersIfNotExists } from "../../src/createLayers.js";

describe("Layers - Folder Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should create folders if it doesn't exist", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);
    await createLayersIfNotExists({
      mainPath: "",
      defaultMainFolder: "",
      layers: defaultLayers,
    });
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });
  it("should not create folders if it exists", async  () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name)
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);
    await createLayersIfNotExists({
      mainPath: "",
      defaultMainFolder: "",
      layers: defaultLayers,
    });
    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
