'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function bowerVersion(packageName) {
  let bowerJsonPath = path.join(process.cwd(), 'bower.json');
  if (!fs.existsSync(bowerJsonPath)) {
    return;
  }

  let bowerJson = require(bowerJsonPath);
  return bowerJson.dependencies[packageName];
};
