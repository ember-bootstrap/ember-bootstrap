'use strict';

const path = require('path');
const fs = require('fs');
const ConfigBuilder = require('ember-cli-config-builder');

module.exports = function buildConfiguration(projectRoot) {
  let emberCLIBuildPath = path.join(projectRoot, 'ember-cli-build.js');
  if (!fs.existsSync(emberCLIBuildPath)) {
    return;
  }

  let config = ConfigBuilder.createSync(emberCLIBuildPath)
  return ConfigBuilder.parse(config.get('ember-bootstrap'));
};
