const util = require('util');
const exec = util.promisify(require('child_process').exec);
const rimraf = require('rimraf');

async function generateDeclarations() {
    const {stdout, stderr} = await exec('node_modules\\.bin\\ng-swagger-gen --config ' +
        '.\\generator\\ng-swagger-gen.json');
    if (stderr) {
        console.log('ERR:', stderr);
    }
    console.log(stdout);
}

async function cleanUp() {
    rimraf.sync('src/app/declarations/services');
    rimraf.sync('src/app/declarations/api-configuration.ts');
    rimraf.sync('src/app/declarations/base-service.ts');
    rimraf.sync('src/app/declarations/strict-http-response.ts');
}

generateDeclarations().then(() => cleanUp());
