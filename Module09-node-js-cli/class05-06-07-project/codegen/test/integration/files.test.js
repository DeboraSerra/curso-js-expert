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
import { createFiles } from "../../src/createFiles.js";
import { createLayersIfNotExists } from "../../src/createLayers.js";
import Util from "../../src/util.js";

const getAllFunctionsFromInstance = (instance) =>
  Reflect.ownKeys(Object.getPrototypeOf(instance)).filter(
    (method) => method !== "constructor"
  );

const generateFilePath = ({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) =>
  layers.map((layer) => {
    const filename = `${Util.lowerCaseFirstLetter(
      componentName
    )}${Util.upperCaseFirstLetter(layer)}.js`;
    const path = join(mainPath, defaultMainFolder, layer, filename);
    return path;
  });

describe("Integration - Layers - Files Structure", () => {
  const defaultLayers = ["service", "factory", "repository"].sort();
  const config = {
    mainPath: "",
    defaultMainFolder: "src",
    layers: defaultLayers,
    componentName: "heroes",
  };
  const packageJSON = "package.json";
  const packageJSONLocation = join("./test/integration/mocks", packageJSON);
  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON)
    );
    await createLayersIfNotExists(config);
  });
  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("Repository class should have create, read, update and delete methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };
    await createFiles(myConfig);
    const [file] = generateFilePath(myConfig);
    const { default: Repository } = await import(file);
    const repository = new Repository();
    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual("method not implemented");
    expectNotImplemented(repository.create);
    expectNotImplemented(repository.read);
    expectNotImplemented(repository.update);
    expectNotImplemented(repository.delete);
  });
  it("Service class should have same signature as repository class and call all its methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };
    await createFiles(myConfig);
    const [repositoryFile, serviceFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const repository = new Repository();
    const service = new Service({ repository });
    const allRepositoryMethods = getAllFunctionsFromInstance(repository);
    allRepositoryMethods.forEach((method) => {
      jest.spyOn(repository, method).mockResolvedValue();
    });
    getAllFunctionsFromInstance(service).forEach((method) => {
      service[method].call(service, [])
    });
    allRepositoryMethods.forEach((method) => {
      expect(repository[method]).toHaveBeenCalled();
    })
  });
  it("Factory instance should match layers", async () => {
    const myConfig = {
      ...config,
    };
    await createFiles(myConfig);
    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(
      myConfig
    );
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);
    const service = new Service({ repository: new Repository() });
    const factory = Factory.getInstance();
    expect(factory).toMatchObject(service);
    expect(factory).toBeInstanceOf(Service)
  });
});
