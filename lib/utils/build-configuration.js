'use strict';

const path = require('path');
const fs = require('fs');
const EmberBuildConfigEditor = require('ember-cli-build-config-editor');

module.exports = function buildConfiguration(projectRoot) {
  let emberCLIBuildPath = path.join(projectRoot, 'ember-cli-build.js');
  if (!fs.existsSync(emberCLIBuildPath)) {
    return;
  }

  let source = fs.readFileSync(emberCLIBuildPath, 'utf-8');

  let build = new EmberBuildConfigEditor(source);

  return build.retrieve('ember-bootstrap');
};
