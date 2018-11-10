
const fsPath = require('fs-path');
const fs = require('fs');
const utils = require('../../utils');

async function updateGitignore(cwd) {
  const gitIgnorePath = `${cwd}/.gitignore`;
  const nodeModulesIgnoreStr = '\n#node_modules\nnode_modules\n';
  const functionsIgnoreStr = '\n#sm main functions\nsm.functions.yml\n';
  const slsIgnoreStr = '\n#serverless file generated by build\nsrc/**/serverless.yml\n';
  const slsDirectoryIgnoreStr = '\n#serverless directories file generated sls deploy\nsrc/**/.serverless\n';
  const mainSlsDirectoryIgnoreStr = '\n#main serverless directories file generated sls deploy\n.serverless\n';
  const smLogsIgnoreStr = '\n#serverless logs file generated for feature sls deploy\nsrc/**/.sm.log\n';
  const mainSmLogsIgnoreStr = '\n#serverless logs file generated for main sls deploy\n.sm.log\n';
  const fullGitIgnoreStr = `${nodeModulesIgnoreStr}${functionsIgnoreStr}${slsIgnoreStr}${mainSlsDirectoryIgnoreStr}${slsDirectoryIgnoreStr}`;
  if (!utils.fileExits(gitIgnorePath)) {
    fsPath.writeFileSync(gitIgnorePath, fullGitIgnoreStr);
  } else {
    if (!utils.existsInFile('node_modules', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, nodeModulesIgnoreStr);
    }
    if (!utils.existsInFile('sm.functions.yml', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, functionsIgnoreStr);
    }
    if (!utils.existsInFile('src/**/serverless.yml', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, slsIgnoreStr);
    }
    if (!utils.existsInFile('src/**/.serverless', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, slsDirectoryIgnoreStr);
    }
    if (!utils.existsInFile('.serverless', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, mainSlsDirectoryIgnoreStr);
    }
    if (!utils.existsInFile('.sm.log', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, mainSmLogsIgnoreStr);
    }
    if (!utils.existsInFile('src/**/.sm.log', gitIgnorePath)) {
      fs.appendFileSync(gitIgnorePath, smLogsIgnoreStr);
    }
  }
}

module.exports = {
  updateGitignore
};
