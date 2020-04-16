/* eslint-env node */
'use strict';

const RSVP = require('rsvp');
const execa = require('execa');

function promptForCompletion(project) {
  return project.ui
    .prompt({
      type: 'confirm',
      name: 'answer',
      message:
        '[Changelog] Enter "y" when you have finished making any desired modifications to CHANGELOG.md',
      choices: [
        { key: 'y', name: 'Yes, update', value: 'yes' },
        { key: 'n', name: 'No, cancel', value: 'no' },
      ],
    })
    .then(function (response) {
      if (!response.answer) {
        return promptForCompletion(project);
      }
    });
}

// For details on each option run `ember help release`
module.exports = {
  manifest: ['package.json', 'bower.json', 'yuidoc.json'],
  beforeCommit(project, tags) {
    project.ui.startProgress('Collecting changes for CHANGELOG.md...');
    return execa('gulp', ['changelog', '--tag', tags.next]).then(function () {
      project.ui.stopProgress();
      return promptForCompletion(project);
    });
  },
  afterPush(project) {
    const gulp = require('gulp');
    require('../gulpfile.js');
    let updateDocs = RSVP.denodeify(gulp.task('docs'));

    project.ui.startProgress('Updating docs...');
    return updateDocs().then(function () {
      project.ui.stopProgress();
    });
  },
};
