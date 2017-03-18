'use strict';

const path = require('path');

module.exports = function npmVersion(packageName) {
  let pkgJson = require(path.join(process.cwd(), 'package.json'));

  if (pkgJson.devDependencies && pkgJson.devDependencies[packageName]) {
    return pkgJson.devDependencies[packageName];
  }

  if (pkgJson.dependencies && pkgJson.dependencies[packageName]) {
    return pkgJson.dependencies[packageName];
  }
};
