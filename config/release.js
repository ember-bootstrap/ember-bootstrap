/* jshint node:true */
var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  manifest: [ 'package.json', 'bower.json', 'yuidoc.json' ],
  beforeCommit: function(project, versions) {
    var gulp = require('gulp');
    require('../gulpfile.js');
    var start = RSVP.denodeify(gulp.start.bind(gulp));
    return start('changelog');
  }
};
