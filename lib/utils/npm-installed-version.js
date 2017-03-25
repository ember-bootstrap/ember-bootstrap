'use strict';

const findup = require('findup-sync');

module.exports = function npmInstalledVersion(packageName) {
  let requirePath = require.resolve(packageName);
  if (!requirePath) {
    return;
  }
  let pkgPath = findup('package.json', { cwd: requirePath });
  if (!pkgPath) {
    return;
  }
  let pkgJson = require(pkgPath);
  return pkgJson.version;
};
