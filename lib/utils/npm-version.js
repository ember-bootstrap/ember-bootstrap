'use strict';

const path = require('path');

module.exports = function npmVersion(projectRoot, packageName) {
  let pkgJson = require(path.join(projectRoot, 'package.json'));

  if (pkgJson.devDependencies && pkgJson.devDependencies[packageName]) {
    return pkgJson.devDependencies[packageName];
  }

  if (pkgJson.dependencies && pkgJson.dependencies[packageName]) {
    return pkgJson.dependencies[packageName];
  }
};
