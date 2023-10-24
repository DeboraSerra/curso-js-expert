#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createLayersIfNotExists } from './createLayers.js'
import { createFiles } from './createFiles.js';

const {
  argv: { componentName },
} = yargs(hideBin(process.argv)).command(
  "skeleton",
  "Create a skeleton for a new project",
  (builder) => {
    return builder
      .option("component-name", {
        alias: "c",
        demandOption: true,
        describe: "Name of the components",
        type: "array",
      })
      .example(
        "skeleton --component-name product",
        "create a project with a single domain called product"
      )
      .example(
        "skeleton -c product -c user",
        "create a project with a list of domains"
      )
      .epilog(`copyright ${new Date().getFullYear()} - Débora Serra`);
  }
);

const env = process.env.NODE_ENV
const defaultFolder = env === 'dev' ? 'dist' : 'src'

const layers = ['repository', 'service', 'factory'].sort()
const config = {
  layers,
  defaultMainFolder: defaultFolder,
  mainPath: '.',
}

await createLayersIfNotExists(config)

componentName.forEach((component) => {
  config.componentName = component
  createFiles(config)
})

/**
 * add this to package.json
 * "bin": {
    "codegen": "./src/index.js"
  },

  and run npm link to create a symlink and make it available globally
  so you can run codegen and generate the files
 */