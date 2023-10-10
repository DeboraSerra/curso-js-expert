import Util from "../util.js";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";
const serviceDepNameAnchor = "$$serviceDepName";
const repositoryDepNameAnchor = "$$repositoryDepName";
const componentNameAnchor = "$$componentName";

const template = `import $$serviceName from '../services/$$serviceDepName.js'
import $$repositoryName from '../repositories/$$repositoryDepName.js'

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName()
    const service = new $$serviceName({ repository })
    return service
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(serviceDepNameAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryDepNameAnchor,
      Util.lowerCaseFirstLetter(repositoryName)
    )
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  };
}
