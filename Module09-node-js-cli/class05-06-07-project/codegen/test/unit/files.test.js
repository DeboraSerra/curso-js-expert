import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import fsPromises from "fs/promises";
import { createFiles } from "../../src/createFiles.js";
import templates from "../../src/templates/index.js";

describe("Layers - Files Structure", () => {
  const defaultLayers = ["service", "factory", "repository"];
  const config = {
    mainPath: "./",
    defaultMainFolder: "src",
    layers: defaultLayers,
    componentName: "test",
  };
  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should not create file structure on inexistent templates", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };
    const expected = { error: "The chosen layer doesn't have a template" };
    const result = await createFiles(myConfig);
    expect(result).toEqual(expected);
  });
  it("repository should not add any additional dependencies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: "test", template: "" });
    const myConfig = {
      ...config,
      layers: ["repository"],
    };
    const expected = { success: true };
    const result = await createFiles(myConfig);
    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName
    );
  });
  it("service should have repository as dependency", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: "test", template: "" });
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };
    const expected = { success: true };
    const result = await createFiles(myConfig);
    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer
    );
  });
  it("factory should have service and repository as dependency", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: "test", template: "" });
    const expected = { success: true };
    const result = await createFiles(config);
    expect(result).toEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      config.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
