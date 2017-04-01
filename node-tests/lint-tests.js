'use strict';

const glob = require('glob').sync;
const lint = require('mocha-eslint');

let paths = glob('fastboot-tests/*')
  .filter((path) => !(/fixtures/).test(path))
  .concat([
    'lib',
    'node-tests',
    'blueprints'
  ]);

lint(paths);