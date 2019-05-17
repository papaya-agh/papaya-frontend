const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs-extra');
const path = require('path');

const genPath = path.join('./', 'node_modules', '.bin', 'ng-openapi-gen');
const cfgPath = path.join('./', 'generator', 'config', 'ng-openapi-gen.json');

async function generateDeclarations() {
  const {stdout, stderr} = await exec(genPath + ' --config ' + cfgPath);
  if (stderr) {
    console.log('ERR:', stderr);
  }
  console.log(stdout);
}

async function cleanUp() {
  fs.copySync('generator/out/models', 'src/app/declarations/models');
  fs.removeSync('generator/out');
}

generateDeclarations().then(() => cleanUp());
