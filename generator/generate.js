const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs-extra');
const path = require('path');

const genPath = path.join('./', 'node_modules', '.bin', 'ng-swagger-gen');
const cfgPath = path.join('./', 'generator', 'config', 'ng-swagger-gen.json');

async function generateDeclarations() {
  const {stdout, stderr} = await exec(genPath + ' --config ' + cfgPath);
  if (stderr) {
    console.log('ERR:', stderr);
  }
  console.log(stdout);
}

async function cleanUp() {
  fs.copySync('generator/out/models', 'src/app/declarations/models');
  fs.copySync('generator/out/services.ts', 'generator/server/server.js');
  fs.removeSync('generator/out');
}

generateDeclarations().then(() => cleanUp());
