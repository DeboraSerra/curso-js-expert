import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import templates from "../../src/templates/index.js";
const { repositoryTemplate, serviceTemplate, factoryTemplate } = templates;

import {
  factoryTemplateMock,
  repositoryTemplateMock,
  serviceTemplateMock,
} from "./mocks/index.js";

describe("codegen 3-layers architecture templates", () => {
  const componentName = "product";
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const factoryName = `${componentName}Factory`;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("#should generate repository template", () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock,
    };
    const result = repositoryTemplate(componentName);
    expect(result).toStrictEqual(expected);
  });
  it("#should generate service template", () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock,
    };
    const result = serviceTemplate(componentName, repositoryName);
    expect(result).toStrictEqual(expected);
  });
  it("#should generate factory template", () => {
    const expected = {
      fileName: factoryName,
      template: factoryTemplateMock,
    };
    const result = factoryTemplate(componentName, repositoryName, serviceName);
    expect(result).toStrictEqual(expected);
  });
});
