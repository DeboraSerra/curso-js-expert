import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createLayersIfNotExists } from "../../src/createLayers.js";

const getFolders = async ({ mainPath, defaultMainFolder }) =>
  fsPromises.readdir(join(mainPath, defaultMainFolder));

describe("Integration - Layers - Folders Structure", () => {
  const defaultLayers = ["service", "factory", "repository"].sort();
  const config = {
    mainPath: "",
    defaultMainFolder: "src",
    layers: defaultLayers,
    componentName: "test",
  };
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
  });
  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should not create folders if it exists", async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);
    await createLayersIfNotExists(config);
    const afterRun = await getFolders(config);
    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });
  it("should create folders if it doesn't exist", async () => {
    const beforeRun = await getFolders(config);
    await createLayersIfNotExists(config);
    const afterRun = await getFolders(config);
    expect(afterRun).toStrictEqual(beforeRun);
  });
});
