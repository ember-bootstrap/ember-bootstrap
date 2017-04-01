'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function bowerVersion(projectRoot, packageName) {
  let bowerJsonPath = path.join(projectRoot, 'bower.json');
  if (!fs.existsSync(bowerJsonPath)) {
    return;
  }

  let bowerJson = require(bowerJsonPath);
  return bowerJson.dependencies[packageName];
};
