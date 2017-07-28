/* eslint-env node */
var RSVP = require('rsvp');

function promptForCompletion(project) {
  return project.ui.prompt({
    type: 'confirm',
    name: 'answer',
    message: '[Changelog] Enter "y" when you have finished making any desired modifications to CHANGELOG.md',
    choices: [
      { key: 'y', name: 'Yes, update', value: 'yes' },
      { key: 'n', name: 'No, cancel', value: 'no' }
    ]
  }).then(function(response) {
    if (!response.answer) {
      return promptForCompletion(project);
    }
  });
}

// For details on each option run `ember help release`
module.exports = {
  manifest: [ 'package.json', 'bower.json', 'yuidoc.json' ],
  beforeCommit: function(project, versions) {
    var gulp = require('gulp');
    require('../gulpfile.js');
    var start = RSVP.denodeify(gulp.start.bind(gulp));

    project.ui.startProgress('Collecting changes for CHANGELOG.md...');
    return start('changelog')
      .then(function() {
        project.ui.stopProgress();
        return promptForCompletion(project);
      });
  },
  afterPush: function(project, versions) {
    var gulp = require('gulp');
    require('../gulpfile.js');
    var start = RSVP.denodeify(gulp.start.bind(gulp));

    project.ui.startProgress('Updating docs...');
    return start('docs')
      .then(function() {
        project.ui.stopProgress();
      });
  }
};


