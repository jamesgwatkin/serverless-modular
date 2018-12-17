const _ = require('lodash');
const fs = require('fs');
const deployHelper = require('./deploy.helper');
const buildHelper = require('./../build/build.helper');
const utils = require('../../utils');
const messages = require('../../messages');

class deployClass {
  deployHandler() {
    const savedOpts = _.get(this.serverless, 'variables.service.custom.smConfig.deploy.options', '');
    const scope = this.options['sm-scope'] || 'global';
    const parallel = this.options['sm-parallel'] ? this.options['sm-parallel'] === 'true' : true;
    const ignoreBuild = this.options['sm-ignore-build'] ? this.options['sm-ignore-build'] === 'true' : false;
    let features = this.options['sm-features'];
    const srcPath = `${this.cwd}/src`;
    let featureFunctions;
    if (fs.existsSync(srcPath)) {
      featureFunctions = utils.getFeaturePath(srcPath);
    }
    features = features ? features.split(',') : null;
    const cwd = this.cwd;
    // const scopeErrMsg = 'Invalid use of scope flag\n\n only set to "--scope local or --scope global" while using this flag';
    return new Promise(async (resolve, reject) => {
      try {
        switch (scope) {
          case 'local':
            if (!ignoreBuild) {
              await buildHelper.localBuild(featureFunctions, null, cwd);
              utils.log.info('Local build successful');
            }
            await deployHelper.localDeploy(cwd, savedOpts, parallel, features);
            break;
          case 'global':
            if (!ignoreBuild) {
              await buildHelper.globalBuild(featureFunctions, null, cwd);
              utils.log.info('Global build successful');
            }
            await deployHelper.globalDeploy(cwd, savedOpts);
            break;
          default:
            utils.log.errorMessage(messages.INVALID_SCOPE);
            throw new Error(messages.INVALID_SCOPE);
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = deployClass;
