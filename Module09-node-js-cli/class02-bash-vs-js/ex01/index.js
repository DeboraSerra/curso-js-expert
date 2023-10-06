const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const createFolderName = (index) => index + 1 >= 3 ? `js0${index + 1}` : `mjs0${index + 1}`;

const rmFolder = (folderName) => rmSync(`./${folderName}`, { recursive: true });

const makeDirAndReturnName = (folderName) => {
  if (existsSync(folderName)) rmFolder(folderName);
  mkdirSync(folderName);
  return folderName;
};

const initializePackage = (folderName) => {
  execSync('npm init -y --scope @debserra --silent', { cwd: `./${folderName}` });
  return folderName
}

const printPackageName = (folderName) => {
  const { name, version } = require(`./${folderName}/package.json`);
  console.log({ name, version });
  return folderName;
}

const FOLDER_AMOUNT = 4;
Array.from(Array(FOLDER_AMOUNT).keys())
  .map(createFolderName)
  .map(makeDirAndReturnName)
  .map(initializePackage)
  .map(printPackageName)
  .map(rmFolder);
